import { createUser, expireOtp, getUserByEmail,getUserById } from "../services/userServices.js";
import bcrypt from 'bcryptjs';
import {  generateAccessToken, generateOtp, generateRefreshToken, sendOtp } from "../utils/utils.js";
import jwt from 'jsonwebtoken';

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
        res.status(200).json({user:{id:user._id,name:user.name,email:user.email,phone:user.phone,otpSent:true}});
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
            const accessToken = generateAccessToken({id:user._id});
            const refreshToken = generateRefreshToken({id:user._id});
            res.cookie('refreshToken', refreshToken, { httpOnly: true,secure:true,sameSite:'None', maxAge: 7 * 24 * 60 * 60 * 1000 });
            res.status(200).json({user:{id:user._id,name:user.name,email:user.email,phone:user.phone},token:accessToken});
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
        const accessToken = generateAccessToken({id:user._id});
        const refreshToken = generateRefreshToken({id:user._id});
        res.cookie('refreshToken', refreshToken, { httpOnly: true,secure:true,sameSite:'None', maxAge: 7 * 24 * 60 * 60 * 1000 });
        res.status(200).json({user:{id:user._id,name:user.name,email:user.email,phone:user.phone,status:user.status,isVerified:user.isVerified},token:accessToken});
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

 const refreshAccessToken = async(req,res)=>{
    try {
        const {refreshToken} = req.cookies;
        if(!refreshToken){
            return res.status(403).json({message:"Authorization failed"});
        }
        jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET,(err,user)=>{
            if(err){
                return res.status(403).json({message:"Invalid refresh token"});
            }
            const newAccessToken = generateAccessToken({id:user.id});
            res.status(200).json({accessToken:newAccessToken});
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({message:error.message});
    }
}

const userLogout = async(req,res)=>{
    try {
        const {refreshToken}=req.cookies;
        if(!refreshToken){
            return res.status(403).json({message:"Authorization failed"});
        }
        res.clearCookie("refreshToken",{httpOnly: true,secure:true,sameSite:'None',path:'/'});
        res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        res.status(500).json({ message: 'Logout failed', error });
    }
}

export {userRegister,userLogin,verifyOtp,resendOtp,userLogout,refreshAccessToken};