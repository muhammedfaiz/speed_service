import { useEffect, useState } from "react";
import {Link,useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { register } from "../../features/userSlice.js";

// eslint-disable-next-line react/prop-types
const Register = ({setToggle}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors,setErrors]=useState({});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user,isSuccess,error}=useSelector(store=>store.user);
  function validation(){
    let errors={};
    if(!name){
      errors.name="Name is required";
    }
    if(name && !/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(name)){
      errors.name="Invalid name format";
    }
    if(!email){
      errors.email="Email is required";
    }
    if(email && !/^\S+@\S+\.\S+$/i.test(email)){
      errors.email="Invalid email format";
    }
    if(!phone){
      errors.phone="Phone number is required";
    }
    if(phone && !/^\d{10}$/.test(Number(phone))){
      errors.phone="Invalid phone number format";
    }
    if(!password){
      errors.password="Password is required";
    }
    if(!confirmPassword){
      errors.confirmPassword="Confirm Password is required";
    }
    if(password && password.length<6){
      errors.password="Password must be at least 6 characters long";
    }
    if(password!==confirmPassword){
     errors.confirmPassword="Password and Confirm Password do not match"
    }
    return errors;
  }
  function handleSubmit(e){
    e.preventDefault();
    const validationErrors = validation();
    if(Object.keys(validationErrors).length>0){
      setErrors(validationErrors);
      return;
    }else{
      setErrors({});
      dispatch(register({name,email,phone,password}));
      setToggle(true);
    }
  }

  useEffect(()=>{
    if(isSuccess){
      navigate('/');
    }
  },[user,isSuccess,navigate,error]);

  return (
    <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
      <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
        Create Your Account
      </div>
      <div className="mt-8">
      {error && <p className="text-red-500 text-base mb-2">{error.message}</p>}
        <div className="flex flex-col mb-2">
          {errors.name && <p className="text-red-500 text-xs mb-1">{errors.name}</p>}
            <div className="flex relative ">
              <input
                type="text"
                id="sign-in-name"
                className={`rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 ${errors.name ? "focus:ring-red-600 ring-2 ring-red-600":"focus:ring-blue-600"}  focus:border-transparent`}
                placeholder="Name"
                onChange={(e)=>setName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col mb-2">
          {errors.email && <p className="text-red-500 text-xs mb-1">{errors.email}</p>}
            <div className="flex relative ">
              
              <input
                type="text"
                id="sign-in-email"
                className={`rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 ${errors.email ? "focus:ring-red-600 ring-2 ring-red-600":"focus:ring-blue-600"} focus:border-transparent`}
                placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col mb-2">
          {errors.phone && <p className="text-red-500 text-xs mb-1">{errors.phone}</p>}
            <div className="flex relative ">
              <input
                type="text"
                id="sign-in-mobile"
                className={`rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 ${errors.phone ? "focus:ring-red-600 ring-2 ring-red-600":"focus:ring-blue-600"} focus:border-transparent`}
                placeholder="Mobile"
                onChange={(e)=>setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col mb-2">
          {errors.password && <p className="text-red-500 text-xs mb-1">{errors.password}</p>}
            <div className="flex relative ">
              <input
                type="password"
                id="sign-in-password"
                className={`rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 ${errors.password ? "focus:ring-red-600 ring-2 ring-red-600":"focus:ring-blue-600"} focus:border-transparent`}
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col mb-6">
          {errors.confirmPassword && <p className="text-red-500 text-xs mb-1">{errors.confirmPassword}</p>}
            <div className="flex relative ">
              <input
                type="password"
                id="sign-in-cpassword"
                className={`rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 ${errors.confirmPassword ? "focus:ring-red-600 ring-2 ring-red-600":"focus:ring-blue-600"} focus:border-transparent`}
                placeholder="Confirm Password"
                onChange={(e)=>setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-full">
            <button
              type="submit"
              onClick={(e)=>handleSubmit(e)}
              className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Sign Up
            </button>
          </div>
      </div>
      <div className="flex items-center justify-center mt-6">
        <Link
          to="/login"
          className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white"
        >
          <span className="ml-2">You have an account?</span>
        </Link>
      </div>
    </div>
  );
};
export default Register;
