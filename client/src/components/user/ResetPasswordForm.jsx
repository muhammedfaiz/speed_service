import { useState } from "react"
import { toast } from "react-toastify";
import userService from "../../services/userService";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ResetPasswordForm = ({id,token}) => {
    const [password,setPassword]=useState("");
    const [errors,setErrors]=useState({});
    const navigate = useNavigate();
    const handleSubmit = async () => {
        if(!password){
            setErrors({password:"Password is required"});
            return;
        }
        if(password.length<6){
            setErrors({password:"Password must be at least 6 characters long"});
            return;
        }
        setErrors({});

        try {
            const response = await userService.ResetPassword({id,token,password});
            if(response.status === 200){
                toast.success("Password has been reset successfully");
                navigate("/login");
            }else{
                toast.error(response.data.message);
            }   
        } catch (error) {
            if (error) {
                toast.error(error);
              } else {
                toast.error("An error occurred. Please try again later.");
              }
        }
    }
  return (
    <div className="flex flex-col w-full mb-7 overflow-y-hidden max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
      <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
        Reset Password
      </div>
      <div className="mt-8 space-y-8">
       
        <div className="flex flex-col mb-2">
          {errors.password && (
            <p className="text-red-500 text-xs mb-1">{errors.password}</p>
          )}
          <div className="flex relative ">
            <input
              type="password"
              id="sign-in-email"
              className={`rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 ${
                errors.password
                  ? "focus:ring-red-600 ring-2 ring-red-600"
                  : "focus:ring-blue-600"
              } focus:border-transparent`}
              placeholder="Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex w-full">
          <button
            type="submit"
            onClick={() => handleSubmit()}
            className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  )
}
export default ResetPasswordForm