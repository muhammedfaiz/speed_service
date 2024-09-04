import { useParams } from 'react-router-dom';
import logo from '../../assets/logo-transparent.png';
import ResetPasswordForm from '../../components/user/ResetPasswordForm';


const ResetPasswordPage = () => {
    const {id,token}=useParams();
  return (
    <>
    <div className="bg-gradient-to-r from-sky-900 to-indigo-950 p-10">
        <div>
            <img src={logo} alt="Logo" className="nav-logo" />
        </div>
        <div className="m-16 flex items-center justify-center">
            <ResetPasswordForm id={id} token={token}/>
        </div>
    </div>
    </>
  )
}
export default ResetPasswordPage


