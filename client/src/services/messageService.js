import axios from 'axios';

const API_URL = 'http://localhost:5000/api/message';

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

export const sendMessageService = async(data)=>{
    try {
        const response = await axiosInstance.post("/send",data);
        return response;
    } catch (error) {
        throw error.response.data;
    }
}

export const getMessagesService = async(id,token)=>{
    try {
        const response = await axiosInstance.get(`/${id}/${token}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}