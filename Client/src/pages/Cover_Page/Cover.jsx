import '../../components/Cover_components/Cover.css'
import SignUp from '../../components/Cover_components/Form/Sign_up'
import SignIn from '../../components/Cover_components/Form/Sign_in'
import Level from '../../components/Cover_components/Form/Level'


import { Link } from 'react-router-dom'
import { switch_forms } from "../../Actions"
import { useDispatch } from 'react-redux'
import { useState } from 'react'



const Cover = () => {
  const dispatch = useDispatch();

  // header scroll Effect 
  const [indicator, setIndicator] = useState('')
  window.addEventListener('scroll', () => {
    if (window.scrollY > 8) {
      setIndicator('true')
      
    }else{
      setIndicator('false')
    }
  })



  return (
    <>
    <div className="cover">

      <nav className='bg-white1 fixed-top py-3 border-bottom'>
        <div className="container d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center p-2 border rounded-circle">
            <div className="h6 text-dark"><span className='text-warning'>A</span>SS</div>
          </div>
          <div className='d-flex'>
            <span 
              className="nav-link text-warning pointer"  
              onClick={() => dispatch(switch_forms('SIGN_IN'))}>Sign up
            </span>
            <span 
              className="nav-link text-warning pointer" 
              onClick={() => dispatch(switch_forms('login'))}>Sign in
            </span>
          </div>
        </div>
      </nav>

      <section className='index pt-5'>

        <div className="container d-lg-flex p-0 mt-4">
          <div className="row align-items-baseline">
            <div className="form-container d-flex flex-column justify-content-center col-md-5 px-lg-5">
              <SignUp />
              <SignIn />
              <Level />
            </div>

            <div className="col-md-7">
              <div className="img-container d-flex align-items-center text-light">
                <div className="text mx-5">
                  <h2 className='display-6 text-warning' style={{fontWeight: '700'}}>Assignment Submission System.</h2>
                  <p style={{fontSize: '1.3em'}}>Design and implementation of student's E-assignment submission and management system.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>

    </>
  )
}

export default Cover