import Subscription from "../models/subscription.model.js";
import User from "../models/user.model.js";
import nodeMailer from "../utils/EmailSender.js";
import { generateSubscriptionMessage } from "../utils/EmailTemplates.js";

// Save subscription
export const saveSubscription = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    
    const {
      userId,
      paymentStatus,
      price,
      deliveryTime,
      deliveryAddress,
      startDate,
      endDate,
      type, 
      orderDetails,
    } = req.body;
    
    // Fetch the selected user from the database
    const selectedUser = await User.findById(userId);
    console.log("Selected user:", selectedUser);

    if (!selectedUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Create a new subscription document with the updated fields
    const newSubscription = await Subscription.create({
      userId: selectedUser._id,
      paymentStatus,
      price,
      deliveryTime,
      deliveryAddress,
      startDate,
      endDate,
      type,
      orderDetails,
    });
    console.log("Saved subscription:", newSubscription);
    res.status(201).json({ message: "Subscription successful!", data: newSubscription, status: 200 });

  } catch (error) {
    console.error("Error in subscription:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Get all subscriptions
export const getAllSubscription = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();

    if (subscriptions.length === 0) {
      return res.status(404).json({ message: "No subscriptions found!" });
    }

    res.status(200).json({ message: "Subscriptions found!", data: subscriptions });

  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};