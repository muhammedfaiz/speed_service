import { useState } from 'react';
import logo from '../../assets/logo-transparent.png';
import Register from '../../components/user/Register';
import Otp from '../../components/user/Otp';

const RegisterationPage = () => {
  const [showOtpInput,setShowOtpInput]=useState(false);
  return (
    <>
        <div className="bg-gradient-to-r from-sky-900 to-indigo-950 p-10">
          <div>
            <img src={logo} alt="Logo" className="nav-logo"/>
          </div>
          {!showOtpInput?(
            <div className='m-16 flex items-center justify-center'>     
              <Register setToggle={setShowOtpInput}/>
            </div>
            ):(
              <div className='m-24 flex items-center justify-center'>       
                <Otp/>
            </div>
            )}
            
        </div>
    </>
  )
}
export default RegisterationPage