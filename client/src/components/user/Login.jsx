import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../features/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {error,isSuccess}=useSelector(store=>store.user);
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

  const handleSubmit = () => {
      const validationError=validation();
      if(Object.keys(validationError).length>0){
        setErrors(validationError);
        return;
      }else{
        setErrors({});
        dispatch(login({email,password}));
      }
  };

  useEffect(()=>{
    if(isSuccess){
        navigate("/");
    }
  },[isSuccess,navigate]);
  return (
    <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
      <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
        Login To Your Account
      </div>
      <div className="mt-8">
      {error && <p className="text-red-500 text-base mb-2">{error.message}</p>}
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
        <div className="flex items-center mb-6 -mt-4">
          <div className="flex ml-auto">
            <Link
              to="/forget-password"
              className="inline-flex text-xs font-thin text-gray-500 sm:text-sm dark:text-gray-100 hover:text-gray-700 dark:hover:text-white"
            >
              Forgot Your Password?
            </Link>
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
      <div className="flex items-center justify-center mt-6">
        <Link
          to="/signup"
          className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white"
        >
          <span className="ml-2">You don&#x27;t have an account?</span>
        </Link>
      </div>
    </div>
  );
};
export default Login;
