import Application from "../models/Application.js";
import Category from "../models/Category.js";
import Employee from "../models/Employee.js";
import Service from "../models/Service.js";


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

export const getServiceHelper=async(id)=>{
    try {
        const services = await Service.find({employees:{$nin:id}});
        const acceptedServices = await Service.find({employees:{$in:id}});
        return {services,acceptedServices};
    } catch (error) {
        throw new Error("Failed to fetch services");
    }
}

export const addService = async(serviceId,employeeId)=>{
    try {
        const service = await Service.findByIdAndUpdate(serviceId,{$push:{'employees':employeeId}});
        return service;
    } catch (error) {
        throw new Error("Failed to add Service for employee");
    }
}

export const declineService = async(serviceId,employeeId)=>{
    try {
        const service = await Service.findByIdAndUpdate(serviceId,{$pull:{'employees':employeeId}});
        return service;
    } catch (error) {
        throw new Error("Failed to decline Service for employee");
    }
}