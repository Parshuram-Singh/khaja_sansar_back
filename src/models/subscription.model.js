import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  dietaryPreference: { type: String, required: true },
  deliverySchedule: { type: [String], required: true },
  deliveryTime: { type: String, required: true },
  selectedPlan: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

export default Subscription; 
