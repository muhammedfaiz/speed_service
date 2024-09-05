import logo from "../../assets/logo-transparent.png";
import Login from "../../components/user/Login";

const LoginPage = () => {
    
  return (
    <>
    <div className="bg-gradient-to-r from-sky-900 to-indigo-950 h-screen p-10">
        <div>
            <img src={logo} alt="Logo" className="nav-logo" />
        </div>
        <div className="m-16 flex items-center justify-center">
            <Login/>
        </div>
    </div>
    </>
  )
}
export default LoginPage