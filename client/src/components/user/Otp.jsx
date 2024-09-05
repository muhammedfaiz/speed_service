import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { resendOtp, verifyOtp } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";

const Otp = () => {
    const [otp,setOtp] = useState('');
    const [errors,setErrors]=useState({});
    const [timeLeft,setTimeLeft]=useState(60);
    const [isExpired,setIsExpired]=useState(false);

    const navigate = useNavigate();
    const {user,error}=useSelector(store=>store.user);
    const dispatch=useDispatch();
    function handleSubmit(){
        if(!otp){
            setErrors({otp: "OTP is required"});
            return;
        }
        if(otp.length < 6){
            setErrors({otp: "OTP should be at least 6 digits"});
            return;
        }
        if(user.otpSent){
            setErrors({});
            dispatch(verifyOtp({userId:user.id,otp}));
        }
    }
    async function handleResend(){
        await dispatch(resendOtp({userId:user.id}));
        setTimeLeft(60);
        setIsExpired(false);
    }

    useEffect(()=>{
        if(user?.isVerified){
            navigate("/");
        }
    },[user,navigate]);

    useEffect(()=>{
        const interval = setInterval(()=>{
            setTimeLeft(prevTime=>{
                if(prevTime<=1){
                    clearInterval(interval);
                    setIsExpired(true);
                    return 0;
                }
                return prevTime-1;
            })
        },1000);
        return ()=>clearInterval(interval);
    },[timeLeft,isExpired]);

    const formatTime=(seconds)=>{
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
  return (
    <div className="flex flex-col w-full max-w-md px-4 py-8 rounded-lg shadow bg-gray-800 sm:px-6 md:px-8 lg:px-10">
    <div className="self-center mb-6 text-xl font-light sm:text-2xl text-white">
      Otp Verification
    </div>
    <div className="mt-8">
    {error && <p className="text-red-500 text-base mb-2">{error.message}</p>}
    {!isExpired && <div className="justify-center items-center mb-4 flex">
        <h3 className="text-lg text-blue-500">Time left:</h3>
        <p className="px-2 text-lg text-blue-500">{formatTime(timeLeft)}</p>
    </div>}
      <div className="flex flex-col mb-2">
          {errors.otp && <p className="text-red-500 text-xs mb-1">{errors.otp}</p>}
        <div className="flex relative ">
          <input
            type="text"
            id="sign-in-email"
            className={`rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 ${errors.otp ? "focus:ring-red-600 ring-2 ring-red-600":"focus:ring-blue-600"} focus:border-transparent`}
            placeholder="Your otp"
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
      </div>
      <div className="flex w-full">
        {!isExpired ?(
            <button
            type="submit"
            onClick={() => handleSubmit()}
            className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            Verify
          </button>
        ):(
            <button
          type="submit"
          onClick={() =>handleResend() }
          className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
        >
          Resend Otp
        </button>
        )}
      </div>
    </div>
  </div>
  )
}
export default Otp