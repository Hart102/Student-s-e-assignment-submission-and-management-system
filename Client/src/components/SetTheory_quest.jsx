import { useState } from "react"
import FirstInput from "./FirstInput"
import PostData from "./PostData";
import { clearInput } from "./Module";
import { date_function } from "./Module";


const SetTheory_quest = () => {

    const [department, setDepartment] = useState(''),
    [courseTitle, setcourseTitle] = useState(''),
    [level, setLevel] = useState(''),
    [question, setQuestion] = useState('');

    let today = date_function();//Date function
    


    const theory_question = {
        department,
        courseTitle,
        level, 
        question,
        question_type: 'thoery',
        date: today
    }

    let written = {
        date: today,
        department,
        courseTitle,
        level,
        question_type: 'thoery'
    }

    
    const set_question = async () => { // Setting theory questions
        const response = await PostData('http://localhost:5000/set_question', theory_question)
        alert(response.data)

        if (response.data == 'Question successfully uploaded') {
            clearInput('questions')
        }
        // Sending assesment reference to the databse. It is used in fetching students who participated in the assesments
        await PostData('http://localhost:5000/written_test', written)
    }



  return (
    <div className="theory text-dark bg-white py-2">
        <form className="form-group py-4 mt-5 col-md-9 mx-auto">
            <div>
                <FirstInput 
                    label={'department'} 
                    onchange={(e) => setDepartment(e.target.value)}
                />
                <FirstInput 
                    label={'course title'} 
                    onchange={(e) => setcourseTitle(e.target.value)}
                />
                <FirstInput 
                    label={'level'} 
                    onchange={(e) => setLevel(e.target.value)}
                />
            </div>

            <textarea 
                className="form-control my-5" 
                placeholder="Set question" 
                onChange={(e) => setQuestion(e.target.value)} 
                id='questions'>
            </textarea>


            <div className="d-flex justify-content-end1 mt-3 mb-5">
                <button className="btn btn-dark font-weight-bold py-2 px-5" onClick={(e) => {
                    e.preventDefault()
                    set_question()
                }}>SET</button>
            </div>
        </form>
    </div>
  )
}

export default SetTheory_quest