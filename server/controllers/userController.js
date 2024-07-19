import { createUser, expireOtp, getUserByEmail,getUserById } from "../services/userServices.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { generateOtp, sendOtp } from "../utils/utils.js";

const userRegister = async(req,res)=>{
    try {
        const { name, email, password, phone } = req.body;
        if(!name || !email || !password|| !phone){
            throw new Error("All fields must be provided");
        }
        
        if(await getUserByEmail(email)){
            throw new Error("Email already exists");
        }
        const otp = generateOtp();
        const user = await createUser({ name, email, password, phone,otp });
        await sendOtp(email,otp);
        setTimeout(async()=>{
            await expireOtp(user._id);
        },60000)
        res.status(200).json({id:user._id,name:user.name,email:user.email,phone:user.phone,otpSent:true});
    } catch (error) {
        res.status(409).json({message:error.message});
    }
}

const userLogin = async (req, res) => {
    try {
        const {email,password}=req.body;
        if(!email||!password){
            throw new Error("All fields must be provided");
        }else{
            const user = await getUserByEmail(email);
            if(!user||!bcrypt.compareSync(password,user.password)){
                throw new Error("Invalid email or password");
            }
            if(!user.status){
                throw new Error("User is not active");
            }
            const token = jwt.sign({id:user._id,name:user.name},process.env.JWT_SECRET,{expiresIn:'20m'});
            res.cookie("token",token,{expiresIn:'20m'});
            res.status(200).json({id:user._id,name:user.name,email:user.email,phone:user.phone});
        }

    } catch (error) {
        res.status(401).json({message:error.message});
    }
}

const verifyOtp=async(req,res)=>{
    try{
        const {userId,otp}=req.body;
        const user = await getUserById(userId);
        if(!user||user.otp!=otp){
            res.status(400).json({message:"Invalid Otp"});
        }
        user.isVerified = true;
        user.otp = null;
        await user.save();
        res.status(200).json({id:user._id,name:user.name,email:user.email,phone:user.phone,status:user.status,isVerified:user.isVerified})
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

const resendOtp=async(req,res)=>{
    try{
        const {userId}=req.body;
        const user = await getUserById(userId);
        if(!user){
            throw new Error("User not found");
        }
        const otp = generateOtp();
        user.otp = otp;
        await user.save();
        await sendOtp(user.email,otp);
        setTimeout(async()=>{
            await expireOtp(user._id);
        },60000)
        res.status(200).json({id:user._id,name:user.name,email:user.email,phone:user.phone,otpSent:true});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

export {userRegister,userLogin,verifyOtp,resendOtp};