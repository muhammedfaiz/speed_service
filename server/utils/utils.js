import nodemailer from 'nodemailer';

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