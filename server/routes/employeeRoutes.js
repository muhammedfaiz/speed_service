import express from 'express';
import { acceptRequest, acceptService, application, changeTaskComplete, employeeLogin, employeeLogout, employeeRefreshToken, getBookings, getCategories, getCommitedTasks, getEmployeeProfile, getHistory, getRecentActivities, getServiceData, getStats, rejectService, updateEmployeeProfile } from '../controllers/employeeController.js';
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
router.get("/requests/:token",authMiddleware,getBookings);
router.patch("/accept-request",authMiddleware,acceptRequest);
router.get("/tasks",authMiddleware,getCommitedTasks);
router.patch("/task-complete",authMiddleware,changeTaskComplete);
router.get("/history",authMiddleware,getHistory);
router.get("/getStats",authMiddleware,getStats);
router.get("/recentActivities",authMiddleware,getRecentActivities);
router.get("/profile",authMiddleware,getEmployeeProfile);
router.patch("/profile",authMiddleware,updateEmployeeProfile);

export default router;