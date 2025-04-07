  import axios from 'axios';

  const KHALTI_SANDBOX_URL = 'https://dev.khalti.com/api/v2/';
  const TEST_SECRET_KEY = 'cb1890d9c1ca45d8a23ac0ddea5a6c0c';

  // -----------------------------
  // Initiate Payment
  // -----------------------------
  export const initiatePaymentController = async (req, res) => {
    try {
      const { amount, itemName, name, email, phone } = req.body;

      if (!amount || !phone) {
        return res.status(400).json({
          success: false,
          message: 'Amount and phone are required for payment initiation.',
        });
      }

      const payload = {
        return_url: 'http://localhost:3000/api/payment/callback',
        website_url: 'http://localhost:3000',
        amount: amount, // paisa
        purchase_order_id: `ORDER-${Date.now()}`,
        purchase_order_name: itemName || 'Test Product',
        customer_info: {
          name: name || 'Test User',
          email: email || 'test@example.com',
          phone: phone,
        },
      };

      const response = await axios.post(
        `${KHALTI_SANDBOX_URL}epayment/initiate/`,
        payload,
        {
          headers: {
            Authorization: `Key ${TEST_SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      res.status(200).json({
        success: true,
        paymentUrl: response.data.payment_url,
        pidx: response.data.pidx,
      });
    } catch (error) {
      console.error('Error initiating payment:', error.response?.data || error.message);
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
      const { pidx } = req.body;

      if (!pidx) {
        return res.status(400).json({
          success: false,
          message: 'pidx is required to verify the payment.',
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

      res.status(200).json({
        success: paymentStatus === 'Completed',
        status: paymentStatus,
        data: response.data,
      });
    } catch (error) {
      console.error('Error verifying payment:', error.response?.data || error.message);
      res.status(500).json({
        success: false,
        error: error.response?.data || 'Payment verification failed',
      });
    }
  };

  // -----------------------------
  // Handle Payment Callback (Redirect)
  // -----------------------------
  export const handlePaymentCallback = async (req, res) => {
    try {
      const { pidx } = req.query;
      if (!pidx) {
        return res.status(400).send('Missing pidx in callback');
      }
  
      // Use environment variable or config for frontend URL
      const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
      const redirectUrl = `${FRONTEND_URL}/payment-success?pidx=${pidx}`;
      console.log('Redirecting user to:', redirectUrl);
  
      return res.redirect(redirectUrl);
    } catch (error) {
      console.error('Error handling callback:', error.message);
      return res.status(500).send('Callback handling failed');
    }
  };
