import { switch_forms } from "../../Actions"
import { useDispatch } from 'react-redux'

const Cover_Title = () => {
    const dispatch = useDispatch();

  return (
    <div className="fixed-top">
        <header className="py-2 navbar">
            <div className="container  d-flex justify-content-between align-items-baseline">
                <div className="logo display-6 text-white font-weight-bold px-lg-2 py-lg-0 p-2">
                    <span className="text-warning">e-</span>campus
                </div>
                <ul className="list-unstyled d-flex text-warning mt-lg-0 mt-4">
                    <li className="mx-lg-2 mx-0 pointer h6" onClick={() => dispatch(switch_forms('SIGN_IN'))}>Sign up</li>
                    {/* <div className="border ml-lg-0 ml-2"></div> */}
                    <li className="mx-2 text-white pointer h6" onClick={() => dispatch(switch_forms('login'))}>Login</li>
                </ul>
            </div>
        </header>
    </div>
  )
}

export default Cover_Title