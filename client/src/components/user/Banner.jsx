import { useNavigate } from 'react-router-dom';
import BannerImage from '../../assets/Banner.png';

const Banner = () => {
    const navigate = useNavigate();
  return (
    <div
      className="bg-cover bg-center h-[30rem] w-full flex justify-center items-center"
      style={{ backgroundImage: `url(${BannerImage})` }}
    >
      <div className="text-center mt-12">
        <h3 className="font-bold text-3xl text-gray-50">Welcome To Speed Service</h3>
        <p className="mt-2 text-gray-200 text-lg">Choose what you prefer?</p>
        <div className="mt-11 flex justify-center space-x-8">
          <button onClick={()=>navigate('/employee/application')} className="text-slate-800 font-medium bg-white p-3 rounded-lg hover:bg-slate-200 ease-in-out ">Provide Service</button>
          <button onClick={()=>navigate("/services")} className="text-white font-medium bg-blue-700 p-3 rounded-lg hover:bg-blue-600">Get Service</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
