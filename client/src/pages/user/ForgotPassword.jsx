import logo from '../../assets/logo-transparent.png';
import ForgotPasswordForm from '../../components/user/ForgotPasswordForm';

const ForgotPassword = () => {
  return (
    <>
    <div className="bg-gradient-to-r from-sky-900 to-indigo-950 p-10">
        <div>
            <img src={logo} alt="Logo" className="nav-logo" />
        </div>
        <div className="m-16 flex items-center justify-center">
            <ForgotPasswordForm/>
        </div>
    </div>
    </>
  )
}
export default ForgotPassword