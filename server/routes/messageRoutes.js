import express from 'express';
import { getMessages, sendMessage } from '../controllers/messageController.js';

const router = express.Router();

router.post("/send",sendMessage);
router.get("/:id/:token",getMessages);



export default router;