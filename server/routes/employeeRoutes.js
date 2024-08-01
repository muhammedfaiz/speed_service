import express from 'express';
import { application, employeeLogin, employeeLogout, getCategories } from '../controllers/employeeController.js';
import upload from '../middleware/uploadMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js';



const router = express.Router();


router.get("/categories",getCategories);
router.post("/apply",upload.single("proof"),application);
router.post("/login",employeeLogin);
router.post('/logout',authMiddleware,employeeLogout)

export default router;