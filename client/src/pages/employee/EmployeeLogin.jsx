import logo from '../../assets/logo-transparent.png';
import EmployeeLoginForm from '../../components/employee/EmployeeLoginForm';

const EmployeeLogin = () => {
  return (
    <div className="bg-gradient-to-r from-blue-800 to-indigo-950 h-screen">
        <div className='p-8'>
            <img src={logo} alt="" className='w-44' />
        </div>
        <div className='flex items-center justify-center py-5'>
            <EmployeeLoginForm/>
        </div>
    </div>
  )
}
export default EmployeeLogin