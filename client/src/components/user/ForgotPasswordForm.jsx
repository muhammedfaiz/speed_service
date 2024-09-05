import { useState } from "react";
import userService from "../../services/userService";
import { toast } from "react-toastify";


const ForgotPasswordForm = () => {

    const [email,setEmail]=useState('');
    const [errors,setErrors]=useState({});

    const handleSubmit = async() => {
        if (!email) {
            setErrors({ email: "Email is required" });
            return;
        }
        else if(email && !/^\S+@\S+\.\S+$/i.test(email)){
            setErrors({ email: "Invalid email format" });
            return;
        }else{
            setErrors({});
            let response = await userService.forgotPasswordService({email});
            if(response.status == 200){
                toast.success("Password reset link is successfully sent to mail");
            }
        }
    };
  return (
    <div className="flex flex-col w-full mb-7 overflow-y-hidden max-w-md px-4 py-8 rounded-lg shadow bg-gray-800 sm:px-6 md:px-8 lg:px-10">
      <div className="self-center mb-6 text-xl font-light sm:text-2xl text-white">
        Forgot Password
      </div>
      <div className="mt-8 space-y-8">
       
        <div className="flex flex-col mb-2">
          {errors.email && (
            <p className="text-red-500 text-xs mb-1">{errors.email}</p>
          )}
          <div className="flex relative ">
            <input
              type="text"
              id="sign-in-email"
              className={`rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 ${
                errors.email
                  ? "focus:ring-red-600 ring-2 ring-red-600"
                  : "focus:ring-blue-600"
              } focus:border-transparent`}
              placeholder="Your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex w-full">
          <button
            type="submit"
            onClick={() => handleSubmit()}
            className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
export default ForgotPasswordForm;
