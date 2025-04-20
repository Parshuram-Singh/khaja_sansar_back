import Subscription from "../models/subscription.model.js";
import Payment from "../models/payment.model.js";

const getUserProfile = (req, res) => {
  // implement later
};

const updateUserProfile = (req, res) => {
  //implement  later
};

const getOrderHistory = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch user's payment history with linked subscription details
    const payments = await Payment.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: 'subscription',
        select: 'deliveryTime selectedPlan orderDetails price createdAt',
        model: 'Subscription'
      })
      .select('pidx transactionId amount status subscription purchaseOrderId purchaseOrderName createdAt');

    const response = {
      success: true,
      message: payments.length === 0
        ? "No payment history found"
        : "Order history fetched successfully",
      payments,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching order history:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};




export { getUserProfile, updateUserProfile, getOrderHistory };