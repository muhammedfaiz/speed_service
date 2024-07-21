import {
  checkPassword,
  createAdmin,
  getAdminByEmail,
} from "../services/adminService.js";
import { generateAccessToken, generateRefreshToken } from "../utils/utils.js";
import jwt from 'jsonwebtoken';

export const adminRegistration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error("All fields must be provided");
    }

    const admin = await createAdmin({ name, email, password });
    res.status(201).json({ name: admin.name, email: admin.email });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create admin");
  }
};



export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    const admin = await getAdminByEmail(email);
    if (admin && (await checkPassword(admin, password))) {
      const accessToken = generateAccessToken({ id: admin._id });
      const refreshToken = generateRefreshToken({ id: admin._id });
      res.cookie("admin_refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res
        .status(200)
        .json({
          admin: { name: admin.name, email: admin.email },
          token: accessToken,
        });
    }else{
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: error.message });
  }
};

export const adminRefreshToken = async(req,res)=>{
  try {
    const {admin_refreshToken} = req.cookies;
    if(!admin_refreshToken){
        return res.status(403).json({message:"Authorization failed"});
    }
    jwt.verify(admin_refreshToken,process.env.JWT_REFRESH_SECRET,(err,user)=>{
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

export const adminLogout = async (req, res) => {
  try{
    const {admin_refreshToken}=req.cookies;
    if(!admin_refreshToken){
      return res.status(403).json({message:"Authorization failed"});
    }
    res.clearCookie("admin_refreshToken", {httpOnly: true,secure:true,sameSite:'None' });
    res.status(200).json({message:"Logged out successfully"});
  }catch(error){
    res.status(400).json({message:error});
  }
}
