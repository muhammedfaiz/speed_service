import express from 'express';
import { userRegister,userLogin, verifyOtp, resendOtp, userLogout, refreshAccessToken, getServices, serviceData } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/signup",userRegister);
router.post("/verifyOtp",verifyOtp);
router.post("/login",userLogin);
router.post("/resendOtp",resendOtp);
router.post("/refreshToken",refreshAccessToken);
router.post("/logout",authMiddleware,userLogout);
router.get("/services",getServices);
router.get("/service/:id",serviceData);



export default router;