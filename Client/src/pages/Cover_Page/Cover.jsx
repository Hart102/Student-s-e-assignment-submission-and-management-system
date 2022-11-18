import '../../components/Cover_components/Cover.css'
import Cover_header from '../../components/Cover_components/Cover_header'
import Sign_up from '../../components/Cover_components/Form/Sign_up'
import Sign_in from '../../components/Cover_components/Form/Sign_in'
import Level from '../../components/Cover_components/Form/Level'

import img from '../../asserts/Images/dash.PNG'


const Cover = () => {
  return (
    <div className='Cover_page'>
      <Cover_header />
      <div className="form-container mx-auto">

        {/* <img src={img} alt="" /> */}
        <Sign_in />
        <Sign_up />
        <Level />
      </div>
    </div>
  )
}

export default Cover