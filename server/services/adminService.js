import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Category from "../models/Category.js";
import Application from "../models/Application.js";
import Employee from "../models/Employee.js";
import Service from "../models/Service.js";

export const createAdmin = async ({ name, email, password }) => {
  try {
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);
    let admin = new Admin({ name, email, password: hashedPassword });
    await admin.save();
    return admin;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create admin");
  }
};

export const getAdminByEmail = async (email) => {
  try {
    let admin = await Admin.findOne({ email });
    return admin;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to find admin by email");
  }
};

export const checkPassword = async (admin, password) => {
  try {
    let isMatch = await bcrypt.compare(password, admin.password);
    return isMatch;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to check password");
  }
};

export const getUsers = async () => {
  try {
    let users = await User.find();
    return users;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get users");
  }
};

export const userChangeStatus = async (userId, status) => {
  try {
    let user = await User.findByIdAndUpdate(userId);
    user.status = status;
    user.save();
    return user;
  } catch (error) {
    throw new Error("Failed to change user status");
  }
};

export const addCategoryService = async (data, fileName) => {
  try {
    const existingCategory = await Category.findOne({ name: data.name });
    if (existingCategory) {
      throw "Already existing Category";
    } else {
      const category = new Category({
        name: data.name,
        image: fileName,
      });
      await category.save();
      return category;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllCategoriesService = async () => {
  try {
    return await Category.aggregate([{$match:{}},{$sort:{'updatedAt':-1}}]);
  } catch (error) {
    throw new Error(error);
  }
};

export const getCategory = async (id) => {
  try {
    const category = await Category.findById(id);
    return category;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteCategoryService = async (id) => {
  try {
    const category = await Category.deleteOne({ _id: id });
    return category;
  } catch (error) {
    throw new Error(error);
  }
};

export const getApplicationService = async () => {
  try {
    let applications = await Application.find().populate({
      path: "designation",
      select: "name -_id",
    }).sort({updatedAt:-1});
    return applications;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get applications");
  }
};

export const getApplicationByIdAndDelete = async (id) => {
  try {
    let applications = await Application.findByIdAndDelete(id);
    return applications;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const setEmployee = async (data, code) => {
  try {
    let employee = new Employee({
      name: data.name,
      email: data.email,
      phone: data.phone,
      designation: data.designation,
      experience: data.experience,
      code: code,
      proof: data.proof,
    });
    await employee.save();
    return employee;
  } catch (error) {
    throw error;
  }
};

export const getEmployeeService = async () => {
  try {
    let employees = await Employee.find({},{
        name:1,
        email:1,
        phone:1,
        designation:1,
        experience:1,
        status:1,
        createdAt:1,
    }).populate({
        path:"designation",
        select: "name -_id",
    });
    return employees;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get employees");
  }
};

export const changeEmployeeStatusService = async(id,status)=>{
    try {
        let employee = await Employee.findById(id);
        employee.status = status;
        await employee.save();
        return "Employee status changed successfully";
    } catch (error) {
        throw new Error("Failed to change employee status");
    }
}


export const addServiceHelper = async(data)=>{
  try{
    let service = new Service(data);
    await service.save();
    return service;
  }catch(error){
    throw new Error("Failed to add service");
  }
}

export const getServicesData = async()=>{
  try{
    let services = await Service.find().populate({
      path:'category',
      select:'name -_id',
    }).sort({updatedAt:-1});
    return services;
  }catch(error){
    console.log(error)
    throw new Error("Failed to get services");
  }
}

export const deleteServiceHelper = async(id)=>{
  try{
    let service = await Service.findByIdAndDelete(id);
    return service;
  }catch(error){
    throw new Error("Failed to delete service");
  }
}

export const serviceData = async(id)=>{
  try{
    let service = await Service.findById(id);
    return service;
  }catch(error){
    throw new Error("Failed to get service data");
  }
}

export const updateServiceHelper = async(id,data)=>{
  try {
    let service = await Service.findByIdAndUpdate(id,{
      $set: data,
    });
    return service;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update service");
  }
}