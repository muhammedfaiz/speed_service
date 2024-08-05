import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connect from './config/db.js';
import userRouter from './routes/userRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import employeeRouter from './routes/employeeRoutes.js'
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
connect();
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS","PATCH"],
}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// routes
app.use("/api/user",userRouter);
app.use("/api/admin",adminRouter);
app.use("/api/employee",employeeRouter);
app.options('*', cors());
app.listen(PORT,()=>{console.log("Server connected to port "+PORT)});

