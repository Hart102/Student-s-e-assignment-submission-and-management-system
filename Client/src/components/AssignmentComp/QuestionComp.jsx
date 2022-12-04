import Axios from 'axios'
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from 'react-router-dom'
import PostData from '../PostData'
import { useSelector } from 'react-redux'


const QuestionComp = () => {
  const location = useLocation(),
  navigation = useNavigate(),
  [questions, setquestions] = useState(''),
  [studentId, setStudentId] = useState('');

  // const fetch_question = async (data) => { // Fetching questions
  //   const response = await PostData('http://localhost:5000/fetch/user/question', data)
  //   setquestions(response.data)
  // }

  const removeDuplicates = (arr) => [...new Set(arr)] // Remove duoble answers

  let answers_container = [];

  const handleAns = (studentAns, questionId) => { // Capturing the answer and the question id that was clicked by the student
   let qustId = questionId;
    
    questions.map(qust => { // capturing the particular question that the answer was clicked
      if (qust.newId == qustId) {

        if (qust.ans == studentAns) { // Checking if the student choosed the correct answer
          answers_container.push(studentAns)
          console.log(answers_container)
        } 
      }
    })
  }

    
  const student_result = async () => {// Calculating result
    let student_score = removeDuplicates(answers_container)
    const result = {
      studentId,
      course: questions[0].courseTitle,
      level: questions[0].level,
      dept: questions[0].department,
      score: student_score.length,
      date: questions[0].date,
      question_type: 'objective'
    }

    
    const response = await PostData('http://localhost:5000/post_objective_result', result) // Sending result to the server
    if (response.data == 'true') {
      alert('Submission successful')
      navigation('/')
    }
  }


  const cancel = (e) => {// Cancel function
    if (e.target.textContent == 'Cancel') {
      alert('Click ok to cancel')
      navigation('/')

      e = ''
    }
  }

  const verify_user_session = async () => { // Student session
    const response = await Axios.get('http://localhost:5000/student/login')
    setStudentId(response.data)
  };

  useEffect(() => {
    verify_user_session()
    // fetch_question(location.state)
  },[])


    

  return (
    <>
    <div className={questions !== '' && questions[0].question_type == 'objective' ? "question_container my-5 col-md-7" : "d-none"}>
      {questions != '' && questions.map((qust, index) => 
        <span key={index}>
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
        </span>
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
    </div>

    
    </>
  )
}

export default QuestionComp