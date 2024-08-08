import express from 'express';
import { userRegister,userLogin, verifyOtp, resendOtp, userLogout, refreshAccessToken, getServices, serviceData, addAddress, getUserAddresses, addItemToCart, getUserCart, updateQuantityCart, placeOrder } from '../controllers/userController.js';
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
router.post("/address",authMiddleware,addAddress);
router.get("/addresses/:token",authMiddleware,getUserAddresses);
router.post("/cart",authMiddleware,addItemToCart);
router.get('/cart/:token',authMiddleware,getUserCart);
router.patch("/cart",authMiddleware,updateQuantityCart);
router.post("/order",authMiddleware,placeOrder);

router.get('/client-id', (req, res) => {
    res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
  });



export default router;