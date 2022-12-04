import '../Assignment/Assignment.css'
import QuestionComp from '../../components/AssignmentComp/QuestionComp'
import TheoryComp from '../../components/AssignmentComp/TheoryComp'

import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import PostData from '../../components/PostData'

// import date_function from '../../components/Module/date_function'



const Assignment_page = () => {
  const location = useLocation(),
  navigation = useNavigate();

  const [theory_questions, setTheory_questions] = useState('')
  const [objective_questions, setObjective_questions] = useState('')
  const [switch_questions, setSwitch_questions] = useState('')

//************* Choose assesment functionality *********************
  const select_assesment = (id) => {
    location.state.map(questions => {
      if (questions._id == id) {
        fetch_selected_questions(questions)
        setSwitch_questions(questions.question_type)
      }
    })
  }

  //*********** Fetch selected questions functionality **********************
  const fetch_selected_questions = async (question) => { 
    const response = await PostData('http://localhost:5000/fetch_selected_question', question)

    console.log(response)
    if (response.data[0].question_type == 'thoery'){
      setTheory_questions(response.data)
    }else{
      setObjective_questions(response.data)
    }

  } 


  //*********** Theory question properties ******************  
  const [file, setFile] = useState('');
  const student = useSelector(state => state.logged_in_user);
  const [studentId, setStudentId] = useState(student.newId);

  const post_file = async () => {// Sending result to the server
    
    const data = new FormData();
    data.append('studentId', studentId)
    data.append('course', theory_questions[0].courseTitle)
    data.append('level', theory_questions[0].level)
    data.append('dept', theory_questions[0].department)
    data.append('date', theory_questions[0].date)
    data.append('file', file)
    data.append('score', '')
    data.append('question_type', 'theory')

    const response = await PostData('http://localhost:5000/post_theory_result', data) 
    alert(response.data)
  }




//**************** Cancel function ***************
  const cancel = (e) => {
    if (e.target.textContent == 'Cancel') {
      alert('Click ok to cancel')
      navigation('/')

      e = ''
    }
  }

  //************* Verify student session **********
  useEffect(() => {
    if (location.state == null) {
      navigation('/')
    }
  },[])

  return (
    <div className='Assignment_page'>
      <header className='fixed-top py-2'>
        <div className="d-flex px-2">
          <div className="logo display-6 text-white font-weight-bold">
            <span className="text-warning">e-</span>campus
          </div>
        </div>
      </header>


    <div className="col-md-12 d-flex px-4">
      <ul className='list-unstyled text-capitaliz py-5 my-5 col-md-2 border-right'>
        <h5>Avaliable assessments: </h5>
        {location.state !== null && location.state.map((questions, indx) => 

          //********* Assessment List ******************
          <div className="my-3 pointer text-capitalize" key={indx} onClick={() => select_assesment(questions._id )}>
            <span className="d-flex">
              <li>{indx + 1}</li>
              <li className='ml-3'>{questions.courseTitle}</li>
            </span>
            <li className='ml-3'>{questions.date}</li> 
          </div>
        )}
      </ul>



        <div className="d-flex">

          {/*************** Theory questions section ****************/}
          <div className={theory_questions !== '' && theory_questions[0].question_type == 'thoery' && switch_questions == 'thoery' ? "mt-5 py-5 pl-5 col-md-9" : 'd-none'}>
            <div className="pr-lg-5 col-md-8">
              <div className="h4 font-weight-bold">Questions: </div>
              <span>
                <p className="course text-uppercase ml-1">{theory_questions !== '' ? theory_questions[0].courseTitle : null}</p>
              </span>
              {theory_questions !== '' && theory_questions[0].question_type == 'thoery' && theory_questions.map((quest, index) => 
                <div className='d-flex my-5' key={index}>
                  <div className="question_number">{index + 1}</div>
                  <p className="text-capitalize ml-3">{quest.question}</p>
                </div>
              )}
            </div>

            <form className='form-group' encType="multipart/form-data">
              <div>
                <p>Only <span className="text-danger">.txt</span> files accepted</p>
                <input type="file" onChange={(e) => {
                    const file = e.target.files[0]; setFile(file)
                }}/>
              </div>
              <button className='btn btn-dark py-2 px-5 mt-3 text-white shadow-sm' onClick={(e) => {
                post_file()
                e.preventDefault()
              }}>Submit</button>
            </form>
            </div>
          </div>




          {/* **************************** Obejective question section ****************************
          <div className={objective_questions !== '' && objective_questions[0].question_type == 'objective' && switch_questions == 'objective' ? 'col-md-8 mt-5 py-5 pl-5' : 'd-none'}>
              <div className="h4 font-weight-bold">Questions: </div>
                <span>
                  <p className="course text-uppercase ml-1">{theory_questions !== '' ? theory_questions[0].courseTitle : null}</p>
                </span>
              {objective_questions != '' && objective_questions.map((qust, index) => 
              <div key={index} className='col-md-6'>
                <div className="d-flex">
                  <div>{index + 1}</div>
                  <p className='text-capitalize text-dark ml-3'>{qust.question}</p>
                </div>

                <div className="answers d-flex flex-column text-capitalize mb-5 py-4 border-bottom">
                  <span>
                    <input type="radio" className='my-2' name={index} id={index}/>

                    <label htmlFor={index} className='ml-3' onClick={(e) => {
                      handleAns(e.target.textContent, qust.newId)
                    }}>{qust.a}</label>

                  </span>
                  <span>
                    <input type="radio" className='my-2' name={qust.b} id={qust.b}/>

                    <label htmlFor={qust.b} className='ml-3' onClick={(e) => {
                      handleAns(e.target.textContent, qust.newId)
                    }}>{qust.b}</label>

                  </span>
                  
                  <span>
                    <input type="radio" className='my-2' name={qust.c} id={qust.c}/>

                    <label htmlFor={qust.c} className='ml-3' onClick={(e) => {
                      handleAns(e.target.textContent, qust.newId)
                    }}>{qust.c}</label>

                  </span>
                </div>
              </div>
            )}

            <div className="d-flex justify-content-between">
              <button className='btn btn-warning py-3 px-5 text-dark shadow-sm' onClick={(e) => {
                e.preventDefault()
                cancel(e)
              }}>Cancel</button>

              <button className='btn btn-dark py-3 px-5 text-white shadow-sm' onClick={(e) => {
                student_result()
                e.preventDefault()
              }}>Submit</button>
            </div>
          </div> */}


        </div>







  </div>
  )
}

export default Assignment_page