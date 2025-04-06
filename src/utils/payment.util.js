import axios from "axios";

const KHALTI_SECRET_KEY = process.env.KHALTI_SECRET_KEY;
const KHALTI_INITIATE_URL = process.env.KHALTI_INITIATE_URL;
const KHALTI_LOOKUP_URL = process.env.KHALTI_LOOKUP_URL;

export const initiatePaymentRequest = async (payload) => {
  try {
    const response = await axios.post(KHALTI_INITIATE_URL, payload, {
      headers: {
        Authorization: `Key ${KHALTI_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Payment initiation failed: ${error.response?.data?.error || error.message}`);
  }
};

export const verifyPaymentRequest = async (pidx) => {
  try {
    const response = await axios.post(
      KHALTI_LOOKUP_URL,
      { pidx },
      {
        headers: {
          Authorization: `Key ${KHALTI_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Payment verification failed: ${error.response?.data?.error || error.message}`);
  }
};

