import { useState } from "react";
import { useLocation } from "react-router-dom"


const Read_assessment_file = () => {
    const location = useLocation()
    // console.log(location.state.student_details)
    
    const [fullName, setFullName] = useState(`${location.state.student_details.firstname} ${location.state.student_details.lastname}`),
    [regNo, setRegNo] = useState(location.state.student_details.reg_no),
    [department, setDepartment] = useState(location.state.student_details.reg_no);



    
    // const fetch_student_assessment_doc = async () => {
    //     const response = await PostData('http://localhost:5000/fetch_student_assessment_doc')
    //     console.log(response.data)

    // }


  return (
    <section>
        <div className="container">
            <div className="bg-white p-5">
                <div className="course-title">
                    <p>csc 422</p>
                </div>
                <div className="student_details text-capitalize">
                    <div className="name my-4"><span className="font-weight-bold">Name:  </span>{fullName}</div>
                    <div className="reg_no my-4"><span className="font-weight-bold">Registration number:</span> {regNo}</div>
                    <div className="dept my-4"><span className="font-weight-bold">Department:</span> {department}</div>
                </div>

                <div className="assessment_body my-5" style={AssessmentBody}>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo beatae reprehenderit tempora, unde optio delectus praesentium enim voluptate non vitae esse iste magnam dolor maiores maxime impedit corrupti fuga cum! Corporis suscipit dolorem ad ipsum, quo sit nisi repudiandae harum molestiae. Quaerat adipisci quas veniam, optio exercitationem ex nostrum eveniet velit corrupti earum porro quidem praesentium ipsa totam pariatur iure sint nihil ipsam veritatis. Velit excepturi ab tenetur cupiditate temporibus animi laudantium aliquam iste dignissimos in commodi, repudiandae unde voluptatem fugit dolorem provident sequi explicabo dicta culpa fugiat enim. Error vel maiores alias. Corrupti sint doloremque velit tempora mollitia sit animi ut laboriosam? Vero ipsum atque illo cupiditate quam, unde ex ad facere in sed sit! Nobis, doloribus consectetur ab culpa voluptatibus velit, harum dolorem earum neque distinctio tempore sint totam iure praesentium suscipit unde, facere natus. Qui aspernatur quis culpa eos, dolorem nulla ipsum repellat ullam vero laboriosam, tenetur quae mollitia, illum dolores recusandae corporis iste vitae? Beatae dolorem, atque ducimus porro ipsa quibusdam deleniti aperiam ipsam aliquam deserunt dolor repudiandae voluptatem eveniet facilis modi dolores a assumenda autem impedit ex odit rem itaque? Non officiis pariatur vel repellendus delectus id ullam, cum porro error dignissimos earum quae autem quisquam perspiciatis unde culpa sint aperiam sequi odit aliquid, quos assumenda optio. Id molestiae, nobis neque incidunt nam ad repellendus facere tempore pariatur? Quos necessitatibus sed saepe rem laborum dolor, laudantium odit delectus ipsa natus recusandae quidem repudiandae nisi optio amet dolore labore alias. Veniam perspiciatis a vel pariatur distinctio quibusdam, consectetur itaque laborum! Sequi corporis quidem ullam, maiores assumenda blanditiis! Eaque iure suscipit natus dicta nemo vitae numquam harum porro, nisi facilis nihil, facere sit omnis architecto, maiores voluptas laboriosam esse neque perferendis repudiandae temporibus molestiae! Similique, aut odit, sequi in delectus blanditiis dolor reprehenderit iure tempore vero architecto.</p>
                </div>
            </div>
        </div>
    </section>
  )
}


const AssessmentBody = {
    textAlign: 'justify',
    fontSize: '17px',
    lineHeight: '35px'
}

export default Read_assessment_file