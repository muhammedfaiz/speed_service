import Application from "../models/Application.js";
import Category from "../models/Category.js";
import Employee from "../models/Employee.js";


export const getCategoriesService = async()=>{
    try {
        return await Category.find();
    } catch (error) {
        throw error;
    }
}

export const applicationService = async(data)=>{
    try{
        const application = new Application(data);
        application.save();
    }catch(error){
        throw error;
    }
}

export const fetchEmployee = async(email)=>{
    try {
        const employee = await Employee.findOne({email});
        return employee;
    } catch (error) {
        throw error;
    }
}