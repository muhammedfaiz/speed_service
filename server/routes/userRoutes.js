import express from 'express';
import { userRegister,userLogin, verifyOtp, resendOtp, userLogout, refreshAccessToken, getServices, serviceData, addAddress, getUserAddresses, addItemToCart, getUserCartForService, updateQuantityCart, placeOrder, fetchBookings, getBookingDetails, fetchAllCarts, getCheckoutDetails, cancelBooking, addReview } from '../controllers/userController.js';
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
router.get("/carts",authMiddleware,fetchAllCarts);
router.get('/cart/:token/:id',authMiddleware,getUserCartForService);
router.patch("/cart",authMiddleware,updateQuantityCart);
router.post("/order",authMiddleware,placeOrder);
router.get("/bookings",authMiddleware,fetchBookings);
router.get("/booking-details/:id",authMiddleware,getBookingDetails);
router.get("/checkout/:id",authMiddleware,getCheckoutDetails);
router.patch("/cancel-booking/:id",authMiddleware,cancelBooking);
router.post("/review",authMiddleware,addReview);

router.get('/client-id', (req, res) => {
    res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
  });



export default router;