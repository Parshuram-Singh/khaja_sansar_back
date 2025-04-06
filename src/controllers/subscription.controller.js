// controllers/subscription.controller.js
import Subscription from "../models/subscription.model.js";

// Save subscription
export const saveSubscription = async (req, res) => {
  try {
    const { productId, productName, price, dietaryPreference, deliverySchedule, deliveryTime, selectedPlan } = req.body;
      // Validation for required fields
      if (!productId || !productName || !price || !dietaryPreference || !deliverySchedule || !deliveryTime || !selectedPlan) {
        return res.status(400).json({ message: "All fields are required!" });
    }
    const newSubscription = new Subscription({
        productId,
        productName,
        price,
        dietaryPreference,
        deliverySchedule,
        deliveryTime,
        selectedPlan
    });

    // Save the subscription to the database
    await newSubscription.save();

    res.status(201).json({ message: "Subscription successful!", data: newSubscription });

  } catch (error) {
      console.error("Error in subscription:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getAllSubscription = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();

    // If no subscriptions are found, return a 404 error
    if (subscriptions.length === 0) {
      return res.status(404).json({ message: "No subscriptions found!" });
    }

    // Return the list of subscriptions
    res.status(200).json({ message: "Subscriptions found!", data: subscriptions });

  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};