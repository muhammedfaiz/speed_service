import logo from '../../assets/logo-transparent.png'
import AdminLogin from '../../components/admin/AdminLogin';

const LoginPage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-800 to-indigo-950 h-screen">
        <div className='p-8'>
            <img src={logo} alt="" className='w-44' />
        </div>
        <div className='flex justify-center items-center py-20'>
            <AdminLogin/>
        </div>
    </div>
  )
}
export default LoginPage