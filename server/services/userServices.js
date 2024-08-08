import Service from "../models/Service.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Address from "../models/Address.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

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

export const addAddressService = async(id,data)=>{
  try {
    const address = new Address({
      house:data.house,
      city:data.city,
      state: data.state,
      country: data.country,
      pincode: data.pincode,
      user:id
    });
    await address.save();
    return address;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add address");
  }
}

export const getAllUserAddress = async(id)=>{
  try {
    const data = await Address.find({user:id});
    return data;
  } catch (error) {
    throw new Error("Failed to fetch address")
  }
}

export const getServiceHelper = async (id)=>{
  try {
    const data = await Service.findById(id);
    return data;
  } catch (error) {
    throw new Error("Failed to get service");
  }
}


export const getCartDetailsUser = async(id)=>{
  try {
    const data = await Cart.findOne({user:id}).populate('items.item');
    return data;
  } catch (error) {
    throw new Error("Failed to get Cart");
  }
}

export const addToCartHelper = async (data)=>{
  try {
    const cart = Cart({...data});
    await cart.save();
    return;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add to Cart");
  }
}

export const placeOrderHelper = async(data)=>{
  try {
    const order = new Order(data);
    await order.save();
    return order;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to place order");
  }
}

export const clearCart = async(id)=>{
  try {
    await Cart.findByIdAndDelete(id);
    return;
  } catch (error) {
    throw new Error("Failed to clear cart");
  }
}

