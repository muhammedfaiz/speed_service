import Application from "../../components/employee/Applicatoin";
import logo from '../../assets/logo-transparent.png';

const ApplicationPage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-950 p-10 h-screen">
      <div>
            <img src={logo} alt="Logo" className="nav-logo" />
        </div>
      <div className="pt-8">
      <Application />
      </div>
    </div>
  )
}
export default ApplicationPage