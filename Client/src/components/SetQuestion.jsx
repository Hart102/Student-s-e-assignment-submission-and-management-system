import { useState } from "react"
import FirstInput from "./FirstInput"
import Options from "./Options"
import PostData from '../../src/components/PostData'

const SetQuestion = () => {
    // const switch_menu = useSelector(state => state.Switch_admin_menu)

    let today = new Date(); //Date function
    

    const [courseTitle, setCourseTitle] = useState(''),
    [department, setDepartment] = useState(''),
    [level, setLevel] = useState(''),
    [question, setQuestion] = useState(''),

    [option1, setOption1] = useState(''),
    [option2, setOption2] = useState(''),
    [option3, setOption3] = useState(''),
    [answer, setAnswer] = useState('');



    const Obj_question = {
        courseTitle,
        department,
        level,
        question,

        a: option1,
        b: option2,
        c: option3,

        ans: answer,
        date: today,
        question_type: 'objective'
    }

    let written = {
        date: today,
        courseTitle,
        department,
        level,
        question_type: 'objective'
    }
    
    const clearInput = (element) => document.getElementById(element).value = ''
    const set_question = async () => { 
        const response = await PostData('http://localhost:5000/set_question', Obj_question) // Sending assesments to the database
        
        alert(response.data)
        if (response.data == 'successful') {
            clearInput('optionA') // Clearing input fields
            clearInput('optionB')
            clearInput('optionC')
            clearInput('optionD')
            clearInput('textarea')
        }

        // Sending assesment reference to the databse. It is used in fetching students who participated in the assesments
        const response2 = await PostData('http://localhost:5000/written_test', written)
    }
    

    // NPC-CE-3179764581
  return (
    <section className='question mx-auto bg-white shadow-sm'>

        <section className='set_question col-md-9 mx-auto'>
            <form className="form-group py-4 mt-5">
                <div>
                    <FirstInput label={'department'} onchange={(e) => setDepartment(e.target.value)} id={'department'}/>
                    <FirstInput label={'course title'} onchange={(e) => setCourseTitle(e.target.value)} id={'course-title'}/>
                    <FirstInput label={'level'} onchange={(e) => setLevel(e.target.value)} id={'level'}/>
                </div>
            </form>
            <form className="form-group">
                <div className="line p-3 my-5 font-weight-bold">SET QUESTION</div>
                <textarea className='form-control p-3' placeholder='Question' onChange={(e) => setQuestion(e.target.value)} id={'textarea'}></textarea>


                <section className="options d-flex flex-column align-items-center1">
                    <div className="d-flex">
                        <div className="col-md-6">
                            <Options value={(e) => setOption1(e.target.value)} placeholder={'Option A'} id={'optionA'}/>
                            <Options value={(e) => setOption2(e.target.value)} placeholder={'Option B'} id={'optionB'}/>
                        </div>
                        <div className="col-md-6">
                            <Options value={(e) => setOption3(e.target.value)} placeholder={'Option C'} id={'optionC'}/>
                            <Options  value={(e) => setAnswer(e.target.value)} placeholder={'Specify answer here. Answer must match with one option.'} id={'optionD'}/>
                        </div>
                    </div>
                </section>

                <div className="d-flex justify-content-end mt-3 mb-5">
                    <button className="btn btn-dark font-weight-bold py-2 px-5" onClick={(e) => {
                        e.preventDefault()
                        set_question()
                    }}>SET</button>
                </div>
            </form>
        </section>

    </section>
  )
}

export default SetQuestion