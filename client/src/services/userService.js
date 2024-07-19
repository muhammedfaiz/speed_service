import axios from 'axios';

const Api_Url = 'http://localhost:5000/api/user';
const register = async (user)=>{
    try{
        const response = await axios.post(Api_Url+'/signup',user);
        return response.data;
    }catch(error){
        throw error.response.data;
    }
}

const login = async(user)=>{
    try{
        const response = await axios.post(Api_Url+'/login',user);
        return response.data;
    }catch(error){
        throw error.response.data;
    }
}

const verifyOtp = async(data)=>{
    try{
        const response = await axios.post(Api_Url+'/verifyOtp',data);
        return response.data;
    }catch(error){
        throw error.response.data;
    }
}

const resendOtp=async(user)=>{
    try{
        const response = await axios.post(Api_Url+'/resendOtp',user);
        return response.data;
    }catch(error){
        throw error.response.data;
    }
}
const userService = {
    register,
    login,
    verifyOtp,
    resendOtp
}
export default userService;