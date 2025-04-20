// routes/myProfile.routes.js
import express from 'express';
const router = express.Router();
import { getUserProfile, updateUserProfile, getOrderHistory } from '../controllers/myProfile.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

router.get('/order-history',authenticate ,getOrderHistory);

export default router;