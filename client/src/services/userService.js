import axios from "axios";

const Api_Url = "http://localhost:5000/api/user";

const axiosInstance = axios.create({
  baseURL: Api_Url,
  withCredentials:true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
    (response)=>response,
    async(error)=>{
        const originalRequest = error.config;
        if(error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            try{
                const response = await axios.post(Api_Url+"/refreshToken",{},{withCredentials:true});
                const {accessToken}=response.data;
                localStorage.setItem("access_token",accessToken);
                axiosInstance.defaults.headers.common['Authorization']=`Bearer ${accessToken}`;
                return axiosInstance(originalRequest);
            }catch(error){
                console.log(error);
                window.location.href='/login';
            }
        }
        return Promise.reject(error);
    }
)
const register = async (user) => {
  try {
    const response = await axiosInstance.post("/signup", user);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const login = async (user) => {
  try {
    const response = await axiosInstance.post("/login", user);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const verifyOtp = async (data) => {
  try {
    const response = await axiosInstance.post("/verifyOtp", data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const resendOtp = async (user) => {
  try {
    const response = await axiosInstance.post("/resendOtp", user);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const logout = async()=>{
    try {
       const response = await axiosInstance.post('/logout',{});
       return response.data; 
    } catch (error) {
        throw error.response.data;
    }
}


const fetchServices = async()=>{
  try{
    const response = await axiosInstance.get('/services');
    return response.data;
  }catch(error){
    throw error.response.data;
  }
}

const getServiceDetails = async(id)=>{
  try{
    const response = await axiosInstance.get(`/service/${id}`);
    return response.data;
  }catch(error){
    throw error.response.data;
  }
}
const userService = {
  register,
  login,
  verifyOtp,
  resendOtp,
  logout,
  fetchServices,
  getServiceDetails,
};
export default userService;
