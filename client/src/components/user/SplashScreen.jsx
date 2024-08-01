import splashIcon from '../../assets/splashScreen.json'; 
import Lottie from 'lottie-react';

const SplashScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full bg-gray-100">
      <div className="text-center">
        <Lottie animationData={splashIcon} className='w-1/2 mx-auto mb-4'/>
        <h1 className="text-4xl font-bold text-indigo-600 mb-2">Speed Service</h1>
        <p className="text-lg font-medium text-blue-800">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default SplashScreen;
