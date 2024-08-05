import express from 'express';
import { acceptService, application, employeeLogin, employeeLogout, employeeRefreshToken, getCategories, getServiceData, rejectService } from '../controllers/employeeController.js';
import upload from '../middleware/uploadMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js';



const router = express.Router();


router.get("/categories",getCategories);
router.post("/apply",upload.single("proof"),application);
router.post("/login",employeeLogin);
router.post('/logout',authMiddleware,employeeLogout);
router.post("/refreshToken",employeeRefreshToken);
router.get("/services/:token",authMiddleware,getServiceData);
router.patch("/accept-service",authMiddleware,acceptService);
router.patch("/reject-service",authMiddleware,rejectService);

export default router;