import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import PostData from "../components/PostData";


const Obj_results = () => {
    const location = useLocation(),
    navigation = useNavigate();

    const [sort_participated_students, setSort_participated_students] = useState(location.state)
    const [participated_students, setParticipated_students] = useState('')

    const fetch_participated_students = async () => { // Fetch student who participated in the assignment
        const response = await PostData('http://localhost:5000/fetch_participated_students', location.state)
        setParticipated_students(response.data)
    }

    const capture_assessment_file_tracking_id = (student_details, tracking_id) => { 
        // Capture and transfer student's details and assessment file tracking id to the page it will be used
        const info = {
            student_details,
            tracking_id
        }
        navigation('/admin/read_assessment', {state: info})
    }

    const print_func = () => { // Print function
        window.print()
    }
    
    useEffect(() => {
        fetch_participated_students()
    }, [])
    
  return (
    <>
    <div className="student_display_container py-5">
        <div className="col-md-10 mx-auto border-bottom mt-3 px-3 d-flex justify-content-between align-items-center bg-white">
            <p className="mt-3">Assessment Result</p>
            <div className="pointer" onClick={() => print_func()}>print result</div>
        </div>

        <section className="display_box col-md-10 mx-auto bg-white py-4 my-2">
            <section className='col-md-12 mx-auto'>
                <div className="box d-flex justify-content-between py-3 px-3 border-bottom">
                    <b>S/n</b>
                    <b>Name</b>
                    <b>Reg No</b>
                    <b>Course</b>
                    <b>Score</b>
                    <b>Departmant</b>
                    <b>Type</b>
                </div>

                {participated_students != '' && participated_students.map((student, index) => student.assesments.map((assesment, indx) => 

                assesment.course == sort_participated_students.courseTitle && assesment.date == sort_participated_students.date &&
                assesment.level == sort_participated_students.level && // Filtering Result

                    <div className="box d-flex justify-content-between py-3 px-3 text-capitalize" key={indx}>
                        <p>{index + 1}</p>
                        <p className="text-left">{student.firstname}</p>
                        <p className="text-left">{student.reg_no}</p>
                        <p className="text-left">{assesment.course}</p>
                        <p className="text-left">{assesment.score}</p>
                        <p className="text-left">{student.dept}</p>

                        <p className="text-left pointer" onClick={() => { //Capturing assessment file tracking id
                            capture_assessment_file_tracking_id(student, assesment.assesment_file_tracking_id
                        )}}>{location.state.question_type}</p>
                    </div>
                ))} 


            </section>  
        </section>
    </div>

    </>
  )
}

export default Obj_results