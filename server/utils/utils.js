import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken'; 
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import paypal from '@paypal/checkout-server-sdk';
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

export const verifyToken = (token)=>{
    return jwt.verify(token, process.env.JWT_SECRET);
}

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;;
const accesKey = process.env.BUCKET_ACCESS_KEY;
const secretAccessKey = process.env.BUCKET_SECRET_ACCESS_KEY;

const s3 = new S3Client({
    credentials:{
        accessKeyId:accesKey,
        secretAccessKey:secretAccessKey
    },
    region: bucketRegion
});

export const addFileToS3 = async(file,fileName)=>{
    try {
        const params = {
            Bucket: bucketName,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
        }
        const command = new PutObjectCommand(params);
        return await s3.send(command);
    } catch (error) {
       throw new Error('Failed to add File: '+error.message); 
    }
}

export const randomName = (file)=>{
    const randomNumber = Math.floor(Math.random() * 10000000);
    return `${randomNumber}_${file.originalname}`;
}

export const getFile = async(image)=>{
    try {
        const getObjectParams = {
            Bucket: bucketName,
            Key: image,
        }
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3,command,{expiresIn:3600});
        return url;
    } catch (error) {
        throw new Error("Error while retrieving file: "+error.message);
    }
}

export const removeFile = async(image)=>{
    try {
        const params = {
            Bucket: bucketName,
            Key: image,
        }
        const command = new DeleteObjectCommand(params);
        return await s3.send(command);
    } catch (error) {
        throw new Error("Error while removing file: "+error.message);
    }
}

const environment = new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
);
export const paypalClient = new paypal.core.PayPalHttpClient(environment);

export const getPaypalRequest = (amount)=>{
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: 'USD',
                    value: amount
                }
            }
        ]
    });
    return request;
}

export const getPaypalCaptureRequest = (orderId)=>{
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    return request;
}

export const refundPayment = async (captureId)=>{
    let request = new paypal.payments.CapturesRefundRequest(captureId);
    request.requestBody({});
    const response = await paypalClient.execute(request);
    return response;
}