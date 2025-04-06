import express from 'express';
import {
  initiatePaymentController,
  verifyPaymentController,
  handlePaymentCallback
} from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/initiate-payment', initiatePaymentController);
router.get('/callback', handlePaymentCallback);
router.post('/verify', verifyPaymentController);

export default router;
