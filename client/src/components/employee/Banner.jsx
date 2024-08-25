import { useNavigate } from "react-router-dom";
import employeeBanner from "../../assets/employeebanner.jpg";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="relative bg-cover h-[31rem]" style={{ backgroundImage: `url(${employeeBanner})` }}>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>
      
      <div className="relative flex flex-col items-center justify-center h-full px-10 text-white space-y-5 text-center">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">Welcome Employee!</h1>
        <p className="text-base md:text-lg font-semibold text-zinc-200 drop-shadow-lg">Here you can manage your applications and tasks efficiently</p>
        
        <div className="flex space-x-6">
          <button
            onClick={() => navigate('/employee/requests')}
            className="px-6 py-3 font-medium text-slate-800 bg-white rounded-lg shadow-lg hover:bg-slate-200 transform hover:-translate-y-1 transition-all ease-in-out"
          >
            Show Requests
          </button>
          <button
            onClick={() => navigate("/employee/tasks")}
            className="px-6 py-3 font-medium text-white bg-blue-700 rounded-lg shadow-lg hover:bg-blue-600 transform hover:-translate-y-1 transition-all ease-in-out"
          >
            Show Tasks
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
