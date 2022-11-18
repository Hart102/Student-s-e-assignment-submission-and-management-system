import Axios from 'axios'
import { useState, useEffect } from 'react'
import { total_assesments } from '../Actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const Question_display_box = () => {
    const dispatch = useDispatch(),
    navigation = useNavigate();


    const [question, setSetQuestion] = useState(''),
    fetch_assessments = async() => { // Fetch Assignments
        const response = await Axios.get('http://localhost:5000/fetch/assessments')
        setSetQuestion(response.data)
        dispatch(total_assesments(response.data.length))
    };


    const captured_clicked_question = async (id) => { 
        let exact_question;
        question.map(quest => quest._id == id ? exact_question = quest : null)// Capturing the right assesment that was clicked to get the students that participated in it.
        navigation('/admin/results', {state: exact_question})
    };
    

    useEffect(() => {
        fetch_assessments()
    }, [])



  return (
      <div className="question_display_box mb-5">

        <section className="display_box bg-white d-flex flex-wrap">
            <div className="h5 my-4 font-weight-bold ml-5">Assignments</div>
            <section className='col-md-11 mx-auto'>
                <div className="box d-flex justify-content-between py-3 px-3 border-bottom">
                    <b>Course</b>
                    <b>Department</b>
                    <b>Level</b>
                    <b>Date</b>
                    <b>Participants</b>
                </div>
                {question != '' && question.map(quest => 
                    <div className="box d-flex justify-content-between py-3 px-3 text-capitalize" key={quest._id}>
                        <p>{quest.courseTitle}</p>
                        <p>{quest.department}</p>
                        <p>{quest.level}</p>
                        <p>{quest.date}</p>

                        <p>
                            <p className='btn btn-success px-lg-5' onClick={() => captured_clicked_question(quest._id)}>
                                View
                            </p>
                        </p>
                    </div>
                )}      
            </section>
        </section>
    </div>
  )
}

export default Question_display_box