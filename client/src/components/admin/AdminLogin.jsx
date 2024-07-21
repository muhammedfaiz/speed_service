import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { adminLogin } from "../../features/adminSlice";

const AdminLogin = () => {
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [errors,setErrors]=useState({});

    const dispatch = useDispatch();
    const {error,isSuccess,admin}=useSelector(store=>store.admin);
    const navigate = useNavigate();
    function validation() {
        let errors = {};
        if (!email) {
          errors.email = "Email is required";
        }
        if (!password) {
          errors.password = "Password is required";
        }
        if (email && !/^\S+@\S+\.\S+$/i.test(email)) {
          errors.email = "Invalid email format";
        }
        if (password && password.length < 6) {
          errors.password = "Password must be at least 6 characters long";
        }
        return errors;
      }

    const handleSubmit = ()=>{
        const validationErrors = validation();
        if(Object.keys(validationErrors).length>0){
            setErrors(validationErrors);
            return;
        }else{
            setErrors({});
            dispatch(adminLogin({email,password}));
        }
    }

    useEffect(()=>{
        if(isSuccess && admin){
            navigate("/admin/dashboard");
        }
    },[isSuccess,navigate,admin])

  return (
    <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
      <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
        Admin Login
      </div>
      <div className="mt-8">
      {error && <p className="text-red-500 text-base mb-2">{error}</p>}
        <div className="flex flex-col mb-2">
            {errors.email && <p className="text-red-500 text-xs mb-1">{errors.email}</p>}
          <div className="flex relative ">
            <input
              type="text"
              id="sign-in-email"
              className={`rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 ${errors.email ? "focus:ring-red-600 ring-2 ring-red-600":"focus:ring-blue-600"} focus:border-transparent`}
              placeholder="Your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col mb-6">
        {errors.password && <p className="text-red-500 text-xs mb-1">{errors.password}</p>}
          <div className="flex relative ">
            <input
              type="password"
              id="sign-in-password"
              className={`rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 ${errors.password ? "focus:ring-red-600 ring-2 ring-red-600":"focus:ring-blue-600"} focus:border-transparent`}
              placeholder="Your password"
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
            Login
          </button>
        </div>
      </div>
      
    </div>
  )
}
export default AdminLogin