import express from 'express';
import { acceptApplication, addCategory, addNewService, adminLogin, adminLogout, adminRefreshToken, adminRegistration, changeEmployeeStatus, changeUserStatus, deleteApplication, deleteCategory, deleteService, fetchOrderDetails, getAllCategories, getAllUsers, getApplications, getCategoryDetails, getDashboard, getEmployee, getOrdersService, getSalesData, getServiceData, getServices, updateCategoryDetails, updateServiceData } from '../controllers/adminController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/register',adminRegistration);
router.post('/login',adminLogin);
router.post("/refreshToken",adminRefreshToken);
router.post("/logout",authMiddleware,adminLogout);
router.get("/users",authMiddleware,getAllUsers);
router.patch('/changeUserStatus',authMiddleware,changeUserStatus);
router.post("/category",authMiddleware,upload.single("image"),addCategory);
router.get("/categories",authMiddleware,getAllCategories);
router.delete("/category/:id",authMiddleware,deleteCategory);
router.get("/applications",authMiddleware,getApplications);
router.post("/application",authMiddleware,acceptApplication);
router.delete("/application/:id",authMiddleware,deleteApplication);
router.get('/employees',authMiddleware,getEmployee);
router.patch("/employee-status/:id",authMiddleware,changeEmployeeStatus);
router.post("/service",authMiddleware,upload.single("image"),addNewService)
router.get("/services",authMiddleware,getServices);
router.delete("/service/:id",authMiddleware,deleteService);
router.get("/service/:id",authMiddleware,getServiceData);
router.patch("/service/:id",authMiddleware,upload.single('image'),updateServiceData);
router.get("/orders",authMiddleware,getOrdersService);
router.get("/order/:id",authMiddleware,fetchOrderDetails);
router.get("/sales-data",authMiddleware,getSalesData);
router.get("/dashboard",authMiddleware,getDashboard);
router.get("/category/:id",authMiddleware,getCategoryDetails);
router.patch("/category/:id",authMiddleware,upload.single('image'),updateCategoryDetails)

export default router;