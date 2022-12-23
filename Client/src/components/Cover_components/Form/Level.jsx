import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import InputField from '../Form/InputField'
import { useSelector, useDispatch } from 'react-redux'
import PostData from "../../PostData"



const Level = () => {
    const swich_form = useSelector(state => state.Form_switcher),
    logged_in_user = useSelector(state => state.logged_in_user),
    navigation = useNavigate(),
    dispatch = useDispatch();


    const [course, setCourse] = useState(''),
    [level, setLevel] = useState(''),
    [dept, setDept] = useState('');


    const assignmentInfo = {
        level: level.toLowerCase(),
        dept: dept.toLocaleLowerCase(),
        course: course.toLocaleLowerCase()
    };

    
    //Checking if the student have already participated in the assesment
    const [check_avaliable_assesment, setCheck_avaliable_assesment] = useState('');
    const confirm_participant = async () => {
        const response = await PostData(
            'http://localhost:5000/confirm_participant', 
            {user_assesment: logged_in_user.assesments, assignmentInfo}
        )

        if (!response.data.error) {
            navigation('/assignment', {state: response.data})

        }else{
           setCheck_avaliable_assesment(response.data.error)
        }
    };
   


  return (
    <form className={swich_form == 'LEVEL' ? 
        "scale_in form-group level mx-auto my-4 py-lg-5 text-center" : 
        'scale_out d-none'
    }>

        <div className="display-6 font-weight-bold text-center mb-3 mt-3">
            <span className="text-warning">Lev</span><span className="text-light">el</span>
        </div>
        <p className="text-center text-white">
            Select level and departmant to see their assignment
        </p>

        <div className="mt-4">
            <InputField 
                type={'text'} 
                placeholder={'Course title'} 
                onchange={(e) => {
                setCheck_avaliable_assesment('')
                setCourse(e.target.value)
            }}/>

            <InputField 
                type={'text'} placeholder={'Department'} 
                onchange={(e) => {
                setCheck_avaliable_assesment('')
                setDept(e.target.value)
            }}/>

            <select className='select py-3 my-3 px-4 form-control'
            style={{background: 'transparent'}} 
                onChange={(e) => {
                setLevel(e.target.value)
            }}>
            <option value="0" defaultValue={true} disabled={false}>Select Level</option>
            <option value={"100L"}>100L</option>
            <option value={"200L"}>200L</option>
            <option value={"300L"}>300L</option>
            <option value={"400L"}>400L</option>
            <option value={"500L"}>500L</option>
            <option value={"600L"}>600L</option>
            </select>

            <button className="btn py-3 px-4 text-white text-capitalize font-weight-bold" 
                onClick={(e) => {
                e.preventDefault()
                confirm_participant()
            }}>next</button>

            <div className={check_avaliable_assesment != '' ? 
                'alart text-center text-warning text-capitalize scale_in mx-auto' : 
            null}>
                <b>{check_avaliable_assesment}</b>
            </div>
        </div>
    </form>
  )
}

export default Level