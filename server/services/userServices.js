import Service from "../models/Service.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const createUser = async ({ name, email, password, phone ,otp}) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password: hashedPassword, phone ,otp});
    await user.save();
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create user");
  }
};

export const getUserByEmail = async(email)=>{
    try{
        const user = await User.findOne({email});
        return user;
    }catch(error){
        throw new Error("Failed to find user by email");
    }
}

export const getUserById = async (id)=>{
  try{
    const user = await User.findById(id);
    return user;
  }catch(error){
    throw new Error("Failed to find user by id");
  }
}

export const expireOtp=async(userId)=>{
  try{
    await User.findByIdAndUpdate(userId, {otp: null});
    return true;
  }catch(error){
    throw new Error("Failed to expire OTP");
  }
}

export const getUserServicesData = async()=>{
  try {
    const services = await Service.find({employees:{$ne:[]}}).populate({
      path: 'category',
      select: 'name -_id',
    });
    return services;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get Services");
  }
}

export const serviceDataHelper = async(id)=>{
  try {
    const service = await Service.findById(id).populate({
      path: 'category',
      select: 'name -_id',
    });
    return service;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get Service data");
  }
}


