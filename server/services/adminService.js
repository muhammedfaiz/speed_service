import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';

export const createAdmin=async({name,email,password})=>{
    try{
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password,salt);
        let admin = new Admin({name,email,password:hashedPassword});
        await admin.save();
        return admin;
    }catch(error){
        console.log(error);
        throw new Error('Failed to create admin');
    }
}

export const getAdminByEmail = async (email)=>{
    try{
        let admin = await Admin.findOne({email});
        return admin;
    }catch(error){
        console.log(error);
        throw new Error('Failed to find admin by email');
    }
}

export const checkPassword = async(admin,password)=>{
    try{
        let isMatch = await bcrypt.compare(password,admin.password);
        return isMatch;
    }catch(error){
        console.log(error);
        throw new Error('Failed to check password');
    }
}