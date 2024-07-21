import express from 'express';
import { adminLogin, adminLogout, adminRegistration } from '../controllers/adminController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register',adminRegistration);
router.post('/login',adminLogin);
router.post("/logout",authMiddleware,adminLogout);

export default router;