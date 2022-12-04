import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom"
import Options from "../../components/Options";
import PostData from '../../components/PostData'


const Read_assessment_file = () => {
    const location = useLocation()
    
    const [fullName, setFullName] = useState(`${location.state.student_details.firstname} ${location.state.student_details.lastname}`),
    [regNo, setRegNo] = useState(location.state.student_details.reg_no),
    [department, setDepartment] = useState(location.state.student_details.reg_no),
    [docs, setDocs] = useState(''),
    [mark, setMark] = useState('');



    const fetch_student_assessment_doc = async () => { // Fetching the assessment document
        const response = await PostData('http://localhost:5000/fetch_student_assessment_doc', {trackingId: location.state.tracking_id})
        setDocs(response.data)
    }

    const info = {
        trackingId: location.state.tracking_id,
        score: mark
    }

    const award_mark = async () => { // Award mark function
        const response = await PostData('http://localhost:5000/award_mark', info)
        alert(response.data)
    }

    useEffect(() => {
        fetch_student_assessment_doc()
    },[])


  return (
    <section>
        <div className="container p-sm-0 my-lg-5">
            <div className="px-lg-5 p-3 py-3 border-bottom bg-white col-md-9 mx-auto d-lg-flex justify-content-between">
                <div className="student_details text-capitalize">
                    <b className="h6 font-weight-bold">Course: csc 422</b>
                    <div className="name my-4"><span className="h6">Name:  </span>{fullName}</div>
                    <div className="dept my-4"><span className="h6">Department:</span> {department}</div>
                    <div className="reg_no my-4"><span className="h6">Registration number:</span> {regNo}</div>
                </div>

                <div>
                    <div className="h6 font-weight-bold m-0">Award marks</div>
                    <div className="d-flex align-items-center">
                        <div className="col-md-7">
                            <Options type={'number'} placeholder={'Marks'} value={(e) => setMark(e.target.value)}/>
                        </div>
                        <div className="btn btn-dark py-2 ml-2" onClick={award_mark}>Award</div>
                    </div>
                </div>
            </div>
            <div className="bg-white px-lg-5 p-3 col-md-9 mx-auto">
                <div className="assessment_body my-lg-3" style={AssessmentBody}>
                    <p>{docs}</p>
                </div>
            </div>
        </div>
    </section>
  )
}


const AssessmentBody = {
    textAlign: 'justify',
    fontSize: '17px',
    lineHeight: '35px',
    letterSpacing: '1px'
}

export default Read_assessment_file