import Axios from "axios"
import PostData from "../PostData"

import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


const TheoryComp = () => {
  const location = useLocation(),
  [questions, setQuestions] = useState(''),
  [file, setFile] = useState(''),
  [studentId, setStudentId] = useState('');

  const student = useSelector(state => state.logged_in_user)
  let student_assesments = student.assesments
  let assesment_to_write = location.state

  // const data = {
  //   student_assesments,
  //   assesment_to_write
  // }

  // const fetch_theory_questions = async () => { // fetch theory questions
  //   const response = await PostData('http://localhost:5000/fetch/user/question', data)
  //   setQuestions(response.data)
  // }

  const post_file = async () => {// Sending result to the server
    
    const data = new FormData();
    data.append('studentId', studentId)
    data.append('course', questions[0].courseTitle)
    data.append('level', questions[0].level)
    data.append('dept', questions[0].department)
    data.append('date', questions[0].date)
    data.append('file', file)
    data.append('score', '')
    data.append('question_type', 'theory')

    const response = await PostData('http://localhost:5000/post_theory_result', data) 
    alert(response.data)
  }


  const verify_user_session = async () => { // Student session
    const response = await Axios.get('http://localhost:5000/student/login')
    setStudentId(response.data)
  };

  useEffect(() => {
    verify_user_session()
  },[])


  return (
    <div className={questions !== '' && questions[0].question_type == 'thoery' ? "theory" : "d-none"}>
      <div className="container d-lg-flex justify-content-between mt-2">
        <div className="pr-lg-5 col-md-10">
          <span>
            <p className="course text-uppercase ml-1">{questions !== '' ? questions[0].courseTitle : null}</p>
          </span>
          {questions !== '' && questions[0].question_type == 'thoery' && questions.map((quest, index) => 
            <div className='d-flex my-5' key={index}>
              <div className="question_number">{index + 1}</div>
              <p className="text-capitalize ml-3">{quest.question}</p>
            </div>
          )}
        </div>

        <form className='form-group my-5' encType="multipart/form-data">
          <p>Only <span className="text-danger">.txt</span> files accepted</p>
          <input type="file" className='form-control' onChange={(e) => {
            const file = e.target.files[0]; setFile(file)
          }}/>

          <button className='btn btn-block btn-dark py-2 px-5 mt-3 text-white shadow-sm' onClick={(e) => {
            post_file()
            e.preventDefault()
          }}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default TheoryComp