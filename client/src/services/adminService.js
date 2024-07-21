import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin';

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials:true,
});

axiosInstance.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem("access_token");
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response)=>response,
    async(error)=>{
        const originalRequest = error.config;
        if(error.response.status === 401 &&!originalRequest._retry){
            originalRequest._retry = true;
                try {
                    const response = await axiosInstance.post('/refreshToken',{},{withCredentials:true});
                    const {accessToken}=response.data;
                    localStorage.setItem("access_token",accessToken);
                    axiosInstance.defaults.headers.common['Authorization']=`Bearer ${accessToken}`;
                    return axiosInstance(originalRequest);
                } catch (error) {
                    window.location.href='/admin/login';
                }
            
        }
        return Promise.reject(error);
    }
 );


export const login = async(data)=>{
    try {
        const response = await axiosInstance.post('/login',data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const logout = async()=>{
    try {
        const response = await axiosInstance.post('/logout',{},{withCredentials:true});
        return response.data;
    } catch (error) {
        throw error.response.data
    }
}