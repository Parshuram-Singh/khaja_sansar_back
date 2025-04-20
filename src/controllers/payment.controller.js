import mongoose from 'mongoose';
import axios from 'axios';
import Payment from '../models/payment.model.js'; // Adjust path if needed

const KHALTI_SANDBOX_URL = 'https://dev.khalti.com/api/v2/';
const TEST_SECRET_KEY = 'cb1890d9c1ca45d8a23ac0ddea5a6c0c';

// -----------------------------
// Save Payment Data to DB
// -----------------------------
const savePayment = async (paymentData, userId, subscriptionId) => {
  try {
    console.log('savePayment - Input Data:', { paymentData, userId, subscriptionId });

    if (!paymentData.pidx) throw new Error('Missing pidx');
    if (!paymentData.amount) throw new Error('Missing amount');
    if (!paymentData.status) throw new Error('Missing status');
    if (!mongoose.isValidObjectId(userId)) throw new Error('Invalid userId');
    if (!mongoose.isValidObjectId(subscriptionId)) throw new Error('Invalid subscriptionId');

    const payment = new Payment({
      pidx: paymentData.pidx,
      transactionId: paymentData.transaction_id || `TXN-${Date.now()}`,
      amount: paymentData.amount,
      status: paymentData.status,
      user: userId,
      subscription: subscriptionId,
      purchaseOrderId: paymentData.purchase_order_id || `PO-${Date.now()}`,
      purchaseOrderName: paymentData.purchase_order_name || 'Default Purchase',
      createdAt: new Date(),
    });

    const validationError = payment.validateSync();
    if (validationError) throw new Error(`Validation failed: ${validationError.message}`);

    const saved = await payment.save();
    console.log('Payment saved:', saved);
    return saved;
  } catch (error) {
    console.error('Error saving payment:', error.message);
    throw new Error(`Failed to save payment: ${error.message}`);
  }
};

// -----------------------------
// Initiate Payment
// -----------------------------
export const initiatePaymentController = async (req, res) => {
  try {
    const { amount, name, email, phone, subscriptionId, userId } = req.body;
    console.log('initiatePaymentController - Input:', { amount, name, email, phone, subscriptionId, userId });

    if (!amount || !phone || !userId || !subscriptionId) {
      return res.status(400).json({
        success: false,
        message: 'Amount, phone, userId, and subscriptionId are required.',
      });
    }

    const purchase_order_id = `SUB-${subscriptionId}-${Date.now()}`;
    const purchase_order_name = `Subscription-${subscriptionId}`;

    const payload = {
      return_url: 'http://localhost:3000/api/payment/callback',
      website_url: 'http://localhost:3000',
      amount,
      purchase_order_id,
      purchase_order_name,
      customer_info: {
        name: name || 'Test User',
        email: email || 'test@example.com',
        phone,
      },
    };

    const response = await axios.post(`${KHALTI_SANDBOX_URL}epayment/initiate/`, payload, {
      headers: {
        Authorization: `Key ${TEST_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const paymentResponse = response.data;
    console.log('Khalti Response:', paymentResponse);

    // Save initial payment
    await savePayment({
      pidx: paymentResponse.pidx,
      transaction_id: null,
      amount,
      status: 'Initiated',
      purchase_order_id,
      purchase_order_name,
    }, userId, subscriptionId);

    res.status(200).json({
      success: true,
      paymentUrl: paymentResponse.payment_url,
      pidx: paymentResponse.pidx,
    });
  } catch (error) {
    console.error('Initiate Payment Error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: error.response?.data || 'Payment initiation failed',
    });
  }
};

// -----------------------------
// Verify Payment
// -----------------------------
export const verifyPaymentController = async (req, res) => {
  try {
    const { pidx} = req.body;

    if (!pidx) {
      return res.status(400).json({
        success: false,
        message: 'pidx, userId, and subscriptionId are required to verify payment.',
      });
    }

    const response = await axios.post(
      `${KHALTI_SANDBOX_URL}epayment/lookup/`,
      { pidx },
      {
        headers: {
          Authorization: `Key ${TEST_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const paymentStatus = response.data.status;
    console.log('Khalti Verification Response:', response.data);

    if (paymentStatus === 'Completed') {
      // Update existing payment entry
      const updated = await Payment.findOneAndUpdate(
        { pidx },
        {
          status: 'Completed',
          transactionId: response.data.transaction_id,
        },
        { new: true }
      );

      console.log('Updated payment:', updated);
    }

    res.status(200).json({
      success: paymentStatus === 'Completed',
      status: paymentStatus,
      data: response.data,
    });
  } catch (error) {
    console.error('Verify Payment Error:', error.message);
    res.status(500).json({
      success: false,
      error: error.response?.data || `Verification failed: ${error.message}`,
    });
  }
};

// -----------------------------
// Handle Callback (Redirect)
// -----------------------------
export const handlePaymentCallback = async (req, res) => {
  try {
    const { pidx } = req.query;
    console.log('handlePaymentCallback - Query:', { pidx });

    if (!pidx) {
      return res.status(400).send('Missing pidx in callback');
    }

    const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
    const redirectUrl = `${FRONTEND_URL}/payment-success?pidx=${pidx}`;
    console.log('Redirecting to:', redirectUrl);

    return res.redirect(redirectUrl);
  } catch (error) {
    console.error('Callback Error:', error.message);
    return res.status(500).send('Callback handling failed');
  }
};
