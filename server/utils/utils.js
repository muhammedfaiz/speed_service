import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken'; 

export const generateOtp = ()=>{
    return Math.floor(100000+Math.random()*900000).toString();
}

export const sendOtp = async (email,otp)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD,
        },
    })
    const mailOptions = {
        from:process.env.GMAIL_USER,
        to:email,
        subject: 'Home Service OTP',
        text: `Your OTP is ${otp},it will be expired in 1 minutes`,
    }
    try{
        await transporter.sendMail(mailOptions);
        console.log('OTP sent successfully');
        return;
    }catch(error){
        console.log(error);
        throw new Error('Error sending otp ',error.message);
    }
}

export const generateAccessToken=(data)=>{
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '15m' });
}

export const generateRefreshToken=(data)=>{
    return jwt.sign(data, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

export const generateAlphanumericValue=(length=5)=>{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export const sendEmployeeCode=async(data)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD,
        },
    })
    const mailOptions = {
        from:process.env.GMAIL_USER,
        to:data.email,
        subject: 'Speed Service Employee Code',
        text: `You have been accepted to provide the service,Your employee code is ${data.code}.
        Do not loose the code, you will need to login to provide service with your employee code`,
    }
    try{
        await transporter.sendMail(mailOptions);
        console.log('Employee code sent successfully');
        return;
    }catch(error){
        console.log(error);
        throw new Error('Error sending employee code ',error.message);
    }
}