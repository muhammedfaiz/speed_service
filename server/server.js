import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connect from './config/db.js';
import userRouter from './routes/userRoutes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connect();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// routes
app.use("/api/user",userRouter);

app.listen(PORT,()=>{console.log("Server connected to port "+PORT)});

