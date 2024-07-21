import express from 'express';
import { userRegister,userLogin, verifyOtp, resendOtp, userLogout, refreshAccessToken } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/signup",userRegister);
router.post("/verifyOtp",verifyOtp);
router.post("/login",userLogin);
router.post("/resendOtp",resendOtp);
router.post("/logout",authMiddleware,userLogout);
router.post("/refreshToken",refreshAccessToken);



export default router;