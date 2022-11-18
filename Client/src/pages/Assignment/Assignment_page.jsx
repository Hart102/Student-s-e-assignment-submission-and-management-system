import '../Assignment/Assignment.css'
import QuestionComp from '../../components/AssignmentComp/QuestionComp'
import TheoryComp from '../../components/AssignmentComp/TheoryComp'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


const Assignment_page = () => {
  const location = useLocation(),
  navigation = useNavigate();



  useEffect(() => {
    if (location.state == null) {
      navigation('/')
    }
  },[])

  return (
    <div className='Assignment_page'>
      <header className='fixed-top py-2'>
        <div className="container d-flex justify-content-between align-items-baseline px-2">
          <div className="logo display-6 text-white font-weight-bold">
            <span className="text-warning">e-</span>campus
          </div>
        </div>
      </header>

      <div className="container py-5 my-5">
        <div className="h4 font-weight-bold">Questions: </div>


        {/* OBJECTIVE QUESTIONS  */}
        <QuestionComp/>

        {/* THEORY QUESTIONS  */}
        <TheoryComp />
        
      </div>
    </div>
  )
}

export default Assignment_page