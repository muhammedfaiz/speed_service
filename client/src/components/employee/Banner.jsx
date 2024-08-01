import { useNavigate } from "react-router-dom"
import employeeBanner from '../../assets/employeebanner.jpg';


const Banner = () => {
    const navigate = useNavigate();
  return (
    <div className="relative h-screen bg-cover" style={{backgroundImage:`url(${employeeBanner})`}}>
      <div className="flex flex-col items-center justify-center h-screen px-20 text-white space-y-3">
        <h1 className="text-5xl font-bold">Welcome Employee!</h1>
        <p className="text-lg font-semibold text-zinc-600">Here you can manage your applications and Tasks</p>
        <div className="flex space-x-8">
        <button onClick={()=>navigate('/employee/application')} className="text-slate-800 font-medium bg-white p-3 rounded-lg hover:bg-slate-200 ease-in-out ">Show Requests</button>
        <button onClick={()=>navigate("/services")} className="text-white font-medium bg-blue-700 p-3 rounded-lg hover:bg-blue-600">Show Tasks</button>
        </div>
    </div>
    </div>
  )
}
export default Banner