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

const { sign_up_auth, login_auth } = require('./Module')
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

let students_collection, question_collection, written_test_collection
uri = "mongodb://localhost:27017"; // Database collection

const dbConnection = () => { MongoClient.connect(uri, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        // DBNAME 
        const db = client.db('e-campus')
        // COLLECTION NAME 
        students_collection = db.collection('students')
        question_collection = db.collection('questions')
        written_test_collection = db.collection('written_test')
        return students_collection, question_collection, written_test_collection;
    })
    .catch(error => console.error(error))
}
dbConnection()




app.post('/admin/signUp', (req, res) => { // ADMIN SIGN UP
    let { error, value } = sign_up_auth.validate(req.body),
    assesments = [];
    
    value = {...value, newId: UUID.v4(), assesments};

    if(error) {
        res.json(error.message)

    }else{
        students_collection.insertOne(value).then(result => {
            {result.acknowledged ? res.json('true') : res.json('sign up was not successful')}
        }).catch(err => console.log(err))
    }
})




let online;
app.post('/student/login', (req, res) => { // Student login
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




app.post('/set_question', (req, res) => { // Set questions
    question = {...req.body, newId: UUID.v4()};

    question_collection.insertOne(question).then(result => {
        {result.acknowledged ? res.json('Question successfully uploaded') : res.json('an error occured try again !')}
    }).catch(err => console.log(err))
    
})



app.post('/written_test', (req, res) => { 
    // Sending assesment reference to the databse. It is used in fetching students who participated in the assesments
    written_test_collection.insertOne(req.body).then(result => {
        
    }).catch(err => console.log(err))
    //Removing duplicates in database
    written_test_collection.createIndex( { date: 1, level: 1, courseTitle: 1, department: 1 }, {unique:true} )
})




app.post('/confirm_participant', (req, res) => { //Confirm if student have participated in the assesment before
    const { level, dept, course } = req.body.assignmentInfo;

    if (req.body.user_assesment.length == 0) { // for new students with no assesments
        res.json("true")

    }else{ // For existing students
        if (req.body.user_assesment.length == 0) { // for new students with no assesments
            res.json("true")

        }else{ // For existing students
            let response = ''
            written_test_collection.find({ courseTitle: course, department: dept }).toArray().then(result => {
                if (result.length == 0 || result == null || result == []){
                    res.json('no avaliable assesment')
        
                }else{
                    
                    result.map(assesment => 
                        req.body.user_assesment.map(studentsAssesment => {
                            if (studentsAssesment.date != assesment.date && level == assesment.level) { // Returns the avaliable assesment that the student have not written before. Therefore student still have an assesment to write.
                                response = "true"
            
                            }else{
                                response = 'no avaliable assesment.'
                            }
                        })
                    )
                    res.json(response)
                }
            })
        }
    }
})




app.post('/fetch/user/question', (req, res) => { // Getting the assesment specified by the students
    const { course, level, dept } = req.body

    question_collection.find({ courseTitle: course, level: level, department: dept }).toArray().then(response => {
        {response != null ? res.json(response) : null}

    }).catch(err => {
        {err ? console.log('an error occured') : null}
    })

})




app.post('/post_objective_result', (req, res) => { //Store student objective assessment Score

    students_collection.findOne({ newId: req.body.studentId }).then(result => {
        if (result != null) {
            let assesments = result.assesments
            assesments.push(req.body)

            // Updating the students assesments array with the current assesment
            students_collection.updateOne({newId: req.body.studentId}, { $set: {assesments: assesments} }) 
            .then(response => {response ? res.json('true') : null})
            .catch(err => console.log(err))
        }
    })
})


let doc_type2 = 'application/pdf'
let doc_type1 = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
app.post('/post_theory_result', (req, res) => {
    const generateId = UUID.v4() //Generating a tracking id for file, to relate it to the owner

    const Storage = MULTER.diskStorage({ // File upload module
        destination: path.join(__dirname, '../Client/public/Storage'),
        filename: (req, file, callback) => {

            if (file.mimetype == doc_type1 || file.mimetype == doc_type2) {
                callback(null, generateId + "_" + file.originalname)

            }else{
                return res.json('cannot accept file')
            }
        }
    })
    const file_upload = MULTER({storage: Storage}).single("file")


    // ///////////////////////////////////////////////////////
    file_upload(req, res, (err) => {
        // Attaching the file tracking id to the student's assessment for recognition purposes
        const value = {...req.body, assesment_file_tracking_id: `${generateId}_${req.file.originalname}`}

        students_collection.findOne({ newId: req.body.studentId }).then(result => {
            if (result != null) {
                let assesments = result.assesments
                assesments.push(value)

                // Updating the students assesments array with the current assesment
                students_collection.updateOne({newId: req.body.studentId}, { $set: {assesments: assesments} }) 
                .then(response => {response ? res.json('Submission successful') : null})
                .catch(err => console.log(err))
            }

        }).catch(err => console.log(err))
    })
})









app.get('/fetch/assessments', (req, res) => { //Fetch assignments
    written_test_collection.find().toArray().then(result => {
        res.json(result)
        
    }).catch(err => console.log(err))
})


app.post('/fetch_participated_students', (req, res) => { //Fetch student who participated in the assignment
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






app.get('/student/login', (req, res) => { // SESSION ROUTE
    if (online) {
        res.json(online.newId)
        
    }else{
        console.log('not online')
        res.json({loggedIn: false})
    }
})


app.listen(5000, () => console.log('App running on port 5000'))