import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    selectedPlan: {
      type: String,
      enum: ["Weekly Plan", "Monthly Plan", "Corporate Plan"],
      required: true,
    },
    dietaryPreference: {
      type: String,
      enum: [
        "Nepali",
        "Japanese",
        "Vegetarian",
        "Non-Vegetarian",
        "Gluten-Free",
      ],
      required: true,
    },
    deliverySchedule: { type: [String], required: true }, // Array of selected days
    deliveryTime: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", SubscriptionSchema);
