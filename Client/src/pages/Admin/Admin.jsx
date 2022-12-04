import '../Admin/Admin.css'
import { useSelector, useDispatch } from 'react-redux'
import { admin_menu } from '../../Actions'

import Sidemenu from '../../components/Sidemenu'
import Overviewbox from '../../components/Overviewbox'
import SetQuestion from '../../components/SetQuestion'

import Question_display_box from '../../components/Question_display_box'
import SetTheory_quest from '../../components/SetTheory_quest'

import Axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
    const dispatch = useDispatch(),
    navigation = useNavigate(),

    switch_menu = useSelector(state => state.Switch_admin_menu),
    total_assesments = useSelector(state => state.Capture_total_assesments),
    check_session = useSelector(state => state.Capure_lecturer_session);


    const lecturer_logout = () => { // Logout function
        window.location.reload()
        const response = Axios.get('http://localhost:5000/lecturer_logout')
        console.log(response)
    }
    

    useEffect(() => { // Verify lecturer session
        if (!check_session) {navigation('/lecturer_login')}
    },[])



  return (
    <>
    {/* #15242b */}

    <div className="admin">
        <nav className='header_container'>
            <div>
                <div className="logo px-5 d-flex justify-content-between align-items-baseline font-weight-bold text-white">
                    <div className='display-6'>
                        <span className="text-warning">e-</span>campus
                    </div>
                    <p className='btn text-white border pointer' onClick={lecturer_logout}>Logout</p>
                </div>
            </div>
            <menu>
                <ul className="list-unstyled d-flex text-dark text-capitalize">
                    <Sidemenu text={'overview'} onclick={(e) => {
                        dispatch(admin_menu(e.target.textContent))
                    }}/>
                    {/* <Sidemenu text={'create Obj'} onclick={(e) => {
                        dispatch(admin_menu(e.target.textContent))
                    }}/> */}
                    <Sidemenu text={'create theory'} onclick={(e) => {
                        dispatch(admin_menu(e.target.textContent))
                    }}/>
                    <Sidemenu text={'course'}/>
                    <Sidemenu text={'notice'}/>
                    <Sidemenu text={'department'}/>
                </ul>
            </menu>
        </nav>
    </div>

    <section className='d-flex justify-content-between'>
        
        <div className="main-container py-5">
            <div className="container pt-5 mb-5">
                <section className="box-container text-capitalize shadow-sm">
                    <Overviewbox text={'total assessments'} overview={total_assesments}/>
                    <Overviewbox text={'total professors'} overview={150}/>
                    <Overviewbox text={'total courses'} overview={150}/>
                    <Overviewbox text={'total departments'} overview={150}/>
                </section>



                {/* SET QUSETIONS  */}
                <div className={switch_menu == 'overview'  ? 'scale_in d-block' : 'scale_out d-none'}>
                    <Question_display_box />
                </div>


                {/* Set question */}
                <div className={switch_menu == 'create Obj' ? 'scale_in d-block' : 'scale_out d-none'}>
                    <SetQuestion/>
                </div>

                <div className={switch_menu == 'create theory' ? 'scale_in d-block' : 'scale_out d-none'}>
                    <SetTheory_quest />
                </div>
            </div>
        </div>
    </section>
















































    {/* <div className='Admin-home'>
        <div className="mt-50">
            <div className="heading">
                <div className="px-lg-0 px-4">
                    <div className="create-post shadow-sm pl-3">
                        <div className="container1 d-flex justify-content-between align-items-center py-2">
                            <div className='admin-name'><b>welcome Hart</b></div>
                            <button className="btn bg-dark py-3 px-4 text-white font-weight-bold" onClick={create_input}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="admin-content d-flex justify-content-between d-none1">
                APP DETAILS RENDERED HERE
                <div className="app-details border-top">
                    <div className="title px-3 py-1">
                        <p className='mt-3 golden-color'><b className='h6 text-uppercase font-weight-bold'>DASHBOARD</b></p>
                    </div>

                    <ul className='list-unstyled text-white font-weight-bold'>
                        <li className='pointer h4' onClick={''}><p className='p-3'>Overview</p></li>
                        <li className='pointer h4' onClick={''}><p className='p-3'>Students</p></li>
                        <li className='pointer h4' onClick={''}><p className='p-3'>Department</p></li>
                        <li className='pointer h4' onClick={''}><p className='p-3'>Add product</p></li>
                    </ul>

                </div>

                OVERIEW 
                <div className="scale_in posts mb-5 d-none1">
                    <div className="box-container">
                        <div className="display-box shadow-sm bg-white p-4 text-center font-weight-bold h3">Customers <br /> {10}</div>
                        <div className="display-box shadow-sm bg-white p-4 text-center font-weight-bold h3">Products <br /> {30}</div>
                        <div className="display-box shadow-sm bg-white p-4 text-center font-weight-bold h3">Sent Sms <br /> 75</div>
                    </div>
                </div>


                <div className="posts obj-question px-lg-5 py-5">
                </div> */}






                {/* PRODUCTS RENDERED HERE  */}
                {/* <div className="scale_in products posts border bg-white mb-5">
                    <TableHead tableTitle="products"/>
                    
                    <div className="blog-posts">
                        <TableTitle name={'Product Name'} text={'Price'}/>

                        <div>
                            <TableBody titleName={'product'} text={'product'} />
                        </div>
                    </div>
                </div> */}


                {/* CUSTOMERS RENDERED HERE  */}
                {/* <div className="scale_in customers posts border bg-white mb-5">
                    <TableHead tableTitle="Customers"/>
                    
                    <div className="blog-posts">
                        <TableTitle name={'Name'} text={'Phone'}/>
                    
                        <TableBody titleName={customer.name} text={customer.phone}/>
                    </div>
                </div> */}

                {/* ADD PRODUCT  */}
                {/* <div className="scale_in add-products posts border bg-white mb-5">
                    <div className="blog-posts">
                        <AddProducts />
                    </div>
                </div> */}
            {/* </div>
        </div>
    </div> */}
    </>
  )
}


// #2c3e50
export default Admin