import express from 'express';
import { userRegister,userLogin, verifyOtp, resendOtp } from '../controllers/userController.js';

const router = express.Router();

router.post("/signup",userRegister);
router.post("/verifyOtp",verifyOtp);
router.post("/login",userLogin);
router.post("/resendOtp",resendOtp);


export default router;