import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { login_action, switch_forms } from "../../../Actions";

/////////////////////////////////////////////////////
import InputField from "./InputField"
import Form_btn from "./Form_btn";
import PostData from "../../PostData";



const Sign_in = () => {
    const switch_form = useSelector(state => state.Form_switcher),
    dispatch = useDispatch();

    //////////////////////////////////////////////////
    const [firstname, setFirstname] = useState(''),
    [reg_no, setRegNo] = useState(''),
    [server_msg, setServerMsg] = useState(''),

    userInfo = {
        firstname,
        reg_no
    };

    //////////////////////////////////////////////////
    const handle_login = async () => { //LOGIN FUNCTION
       const response = await PostData('http://localhost:5000/student/login', userInfo)
       if (!response.data.res) {
           setServerMsg(response.data)
           
        }else{
            dispatch(login_action(response.data.user))
            dispatch(switch_forms('LEVEL'))
        }
    }


  return (
    <form className={switch_form != 'login' ? 'scale_out' : "sign_in scale_in form-group px-5 py-5 my-5"}>
        <div className="display-6 font-weight-bold text-center my-5"><span className="text-warning">Log</span>in</div>
        <div className="mx-lg-5">
            <InputField type={'text'} placeholder={'Firstname'} onchange={(e) => {
                setServerMsg('')
                setFirstname(e.target.value)
            }}/>
        </div>
        <div className="my-4 px-lg-5">
            <InputField type={'text'} placeholder={'MOUAU/20/ADM/1059'} onchange={(e) => {
                setServerMsg('')
                setRegNo(e.target.value)
            }}/>
        </div>

        <div className="px-lg-4">
            <Form_btn btnText={'Login'} onclick={(e) => {
                e.preventDefault()
                handle_login()
            }}/>
        </div>

        <div className={server_msg != '' ? 'text-center text-warning my-3 scale_in' : null}>
            <b>{server_msg}</b>
        </div>
    </form>
  )
}

export default Sign_in