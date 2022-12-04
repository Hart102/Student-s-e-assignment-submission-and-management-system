const express = require('express');
const cors =  require('cors');
const session = require('express-session');
const UUID = require('uuid');
const bodyParser = require('body-parser');
const cookieParser =  require('cookie-parser');
const MongoClient  = require('mongodb').MongoClient;
const MULTER = require('multer');
const path = require('path');
const FS = require('fs');
const Buffer = require('buffer')

const { sign_up_auth, login_auth, lecturer_login, level_auth } = require('./Module');
const { resolve } = require('path');
const { ConnectionPoolReadyEvent } = require('mongodb');
const app = express();

// GLOBAL VARIABLES 
const expDate = 60 * 60 * 1000 * 24; // 1 hour 1 day
const token = UUID.v4()

app.use(cors({
    origin:  ['http://localhost:3000'],
    method: ["GET", "POST"],
    credentials: true,
}));

app.use(bodyParser.urlencoded({extends: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({ // Session
    name: "userId",
    secret: token,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secret: token,
        maxAge: expDate,
        secure: false,
        sameSite: true
    }
}))

let students_collection, question_collection, written_test_collection,
lecturers_collection,
uri = "mongodb://localhost:27017"; // Database connection uri

const dbConnection = () => { MongoClient.connect(uri, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        //************ Dbname ********************* 
        const db = client.db('e-campus')
        //********** COLLECTION NAME *************** 
        students_collection = db.collection('students')
        question_collection = db.collection('questions')
        written_test_collection = db.collection('assessmentReference')
        lecturers_collection = db.collection('lecturers')
        return students_collection, question_collection, written_test_collection,
        lecturers_collection;
    })
    .catch(error => console.error(error))
}
dbConnection()



//********* */ Handling Lecturer's login ****************
let active_lecturer;
app.post('/lecturer_login', (req, res) => {
    const { error, value } = lecturer_login.validate(req.body)
    if (error) {
        res.json(error.message)

    }else{
        lecturers_collection.findOne({ username: value.username, password: value.password }).then(result => {
            {result != null ? res.json('true') : res.json('user does not exist')}
            active_lecturer = req.session.lecturer = result.username
        }).catch(err => {err ? console.log('something went wrong') : null})
    }

})


//*********************LECTURER SESSION ROUTE ***************************
app.get('/lecturer_login', (req, res) => {
    {active_lecturer ? res.json(active_lecturer) : res.json('false')}
})


//*********************LECTURER LOGOUT ROUTE ***************************
app.get('/lecturer_logout', (req, res) => { 

    req.session.destroy((err) => {
        if(err){
            res.json('something went wrong')

        }else{
            active_lecturer = ''
            res.clearCookie("userId")
        }
    })
})




//************** Handling Student sign up **********************
app.post('/student_sign_up', (req, res) => { 
    let { error, value } = sign_up_auth.validate(req.body),

    assesments = []; // Assigning an assessment array to every student
    value = {...value, newId: UUID.v4(), assesments};

    if(error) {
        res.json(error.message)

    }else{
        students_collection.insertOne(value).then(result => {
            {result.acknowledged ? res.json('true') : res.json('sign up was not successful')}
        }).catch(err => console.log(err))
    }
})



//**************** Handling Student login ***********************
let online;
app.post('/student/login', (req, res) => { 
    let { error, value } = login_auth.validate(req.body);
    
    if(error) {
        res.json(error.message)

    }else{
        students_collection.findOne({ firstname: value.firstname, reg_no: value.reg_no }).then(result => {
            {result != null ? res.json({user: result, res:'true'}) : res.json('user does not exist')}
            online = req.session.user  = result
        }).catch(err => console.log(err))
    }
    
})

//*********************STUDENT SESSION ROUTE ***************************
app.get('/student/login', (req, res) => {
    if (online) {
        res.json(online.newId)
        
    }else{
        res.json({loggedIn: 'false'})
    }
})



//************ Set question route ***************************
app.post('/set_question', (req, res) => {
    question = {...req.body, newId: UUID.v4()};

    question_collection.insertOne(question).then(result => {
        {result.acknowledged ? res.json('Question successfully uploaded') : res.json('an error occured try again !')}
    }).catch(err => console.log(err))
})



// Sending assesment reference to the databse. Which is used in fetching students who participated in the assesments
app.post('/written_test', (req, res) => { 
    written_test_collection.insertOne(req.body).then(result => {
        console.log(result)
        
    }).catch(err => console.log(err))
    //Removing duplicates in database
    written_test_collection.createIndex( { date: 1 }, {unique:true} )
    // written_test_collection.createIndex( { date: 1, level: 1, courseTitle: 1 }, {unique:true} )
})



//*** Confirm if student have participated in a particuler assesment before, 
//to make sure he or she do not write any asseement multiple times ***
app.post('/confirm_participant', (req, res) => { 
    const { error, value } = level_auth.validate(req.body.assignmentInfo);

    if (error) {
        res.json(error.message)

    }else{
        written_test_collection.find({ courseTitle: value.course, 
            department: value.dept, level: value.level }).toArray().then(result => {
            //Checking if the student assesment array is empty. If it is, then the student is a new student
            if (req.body.user_assesment.length == 0) { 
                {result.length == 0 ? res.json({error: 'Course not avaliable'}) : res.json(result)}
                
            }else{ 
                //Validation for existing students
                let counter = 0;
                if (result.length == 0 || result == null || result == []){
                    res.json({error: 'no avaliable assesment'})
        
                }else{
                    result.map((assesment, indx) => 
                        req.body.user_assesment.map(studentsAssesment => {
                            // Returns the avaliable assesment that the student have not written before. 
                            //Therefore student still have an assesment to write.
                            if (studentsAssesment.date != assesment.date && value.level == assesment.level 
                                && studentsAssesment.question_type != assesment.question_type) { 

                                    console.log(result.length)

                                // if (counter < indx) {
                                //     counter ++
                                //     if (counter === indx) {
                                //         console.log(counter)
                                //     }
                                    
                                // }

                                
                            }else{
                                response = {error: 'no avaliable assesment.'}
                            }
                        })
                    )
                    // res.json(response)
                    // console.log(response)
                }
            }
        })
    }
})



//************ Getting the assesment the students wants to write **************
app.post('/fetch_selected_question', (req, res) => {
    const { courseTitle, department, level, date, question_type } = req.body

    question_collection.find({ 
        department: department, courseTitle: courseTitle, 
        level: level, date: date, question_type: question_type})
        .toArray().then(result => {
        res.json(result)

    }).catch(err => console.log(err))
})


// Storing student assesment answers in a text file, with a tracking id, that wil be stored in his assesment history,
// for recognition purposes
app.post('/store_student_assesment_file', (req, res) => {
    const generateId = UUID.v4() // Generating a file tracking id
    
    FS.writeFile(`./Storage/${generateId}.txt`, `${req.body.studentAnswer}`, (err) => {
        {err ? console.log(err) : console.log('file created successfully')}
    })
    
    //  ***** Attaching the file tracking id to the student's theory assessment history for recognition purposes ******
    const value = {...req.body, assesment_file_tracking_id: `${generateId}`}
    
    students_collection.findOne({ newId: req.body.studentId }).then(result => {
        if (result != null) {
            let assesments = result.assesments
            assesments.push(value)

            //*** Updating the students assesments array with the current assesment the student wrote ****
            students_collection.updateOne({newId: req.body.studentId}, { $set: {assesments: assesments} }) 
            .then(response => {response ? res.json('Submission successful') : null})
            .catch(err => console.log(err))
        }
    }).catch(err => console.log(err))

})





 //********** Store student objective assessment Score **********************
// app.post('/post_objective_result', (req, res) => {

//     students_collection.findOne({ newId: req.body.studentId }).then(result => {
//         if (result != null) {
//             let assesments = result.assesments
//             assesments.push(req.body)

//             //************ Updating the students assesments array with the current assesment **********
//             students_collection.updateOne({newId: req.body.studentId}, { $set: {assesments: assesments} }) 
//             .then(response => {response ? res.json('true') : null})
//             .catch(err => console.log(err))
//         }
//     })
// })


// ******************** Awarding score to students by the lecturer **********************
app.post('/award_mark', (req, res) => {
    const { trackingId, score } = req.body
   
    students_collection.updateOne({ assesments: {$elemMatch: {assesment_file_tracking_id: trackingId }}}, 
        {$set : {"assesments.$.score" : score}}).then(result => 
        { result.modifiedCount == 1 ? res.json('Mark awarded successfully.') : null})
    .catch(err => console.log(err))
})






// const plan_text ='text/plain'; //File formats to accept

// app.post('/post_theory_result', (req, res) => {
//     //********** Generating a tracking id for file, to relate it to the owner *************
//     const generateId = UUID.v4() 

//     //********************* File upload module **********************
//     const Storage = MULTER.diskStorage({
//         destination: path.join(__dirname, './Storage'),
//         filename: (req, file, callback) => {

//             if (file.mimetype == plan_text) {
//                 callback(null, generateId + "_" + file.originalname)

//             }else{
//                 return res.json('cannot accept file')
//             }
//         }
//     })
//     const file_upload = MULTER({storage: Storage}).single("file")


//     file_upload(req, res, (err) => {
//         //********* Attaching the file tracking id to the student's theory assessment history for recognition purposes ***********
//         const value = {...req.body, assesment_file_tracking_id: `${generateId}_${req.file.originalname}`}

//         students_collection.findOne({ newId: req.body.studentId }).then(result => {
//             if (result != null) {
//                 let assesments = result.assesments
//                 assesments.push(value)

//                 //*** Updating the students assesments array with the current assesment the student wrote ****
//                 students_collection.updateOne({newId: req.body.studentId}, { $set: {assesments: assesments} }) 
//                 .then(response => {response ? res.json('Submission successful') : null})
//                 .catch(err => console.log(err))
//             }
//         }).catch(err => console.log(err))
//     })
// })


//******************************* Fetch assignments *******************************
app.get('/fetch/assessments', (req, res) => {
    written_test_collection.find().toArray().then(result => {
        if (result != null) {
            res.json(result)
        }
        
    }).catch(err => console.log(err))
})


//*************** Fetch student who participated in the assignment ******************
app.post('/fetch_participated_students', (req, res) => { 
    const { courseTitle, level, date } = req.body

    students_collection.find({assesments: {$elemMatch: {course: courseTitle, level: level, date: date}}}).toArray()
    .then(result => {
        if(result != null) {
            res.json(result)
        }

    }).catch(err => {
        if(err) {
            console.log('an error occured')
        }
    })

})


//**************** Read student theory assessment file *******************
app.post('/fetch_student_assessment_doc', (req, res) => {

    FS.readFile(`./Storage/${req.body.trackingId}`, 'utf-8', (err, data) => {
        if (err) {
          return console.log('an err occured');

        }else{
            res.json(data);
        }
    });
   
})



app.listen(5000, () => console.log('App running on port 5000'))