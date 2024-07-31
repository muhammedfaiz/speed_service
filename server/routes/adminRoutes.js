import express from 'express';
import { acceptApplication, addCategory, addNewService, adminLogin, adminLogout, adminRegistration, changeEmployeeStatus, changeUserStatus, deleteApplication, deleteCategory, deleteService, getAllCategories, getAllUsers, getApplications, getEmployee, getServiceData, getServices, updateServiceData } from '../controllers/adminController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/register',adminRegistration);
router.post('/login',adminLogin);
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
router.patch("/service/:id",authMiddleware,upload.single('image'),updateServiceData)

export default router;