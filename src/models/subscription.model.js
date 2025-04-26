import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["one-time-order", "weekly", "monthly", "corporate"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    price: { type: Number, required: true },
    deliveryTime: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: {
      type: Date,
      required: function () {
        return this.type === "weekly";
      },
    },

    // Unified orderDetails for both weekly and daily plans
    orderDetails: [
      {
        day: { type: String, required: true },
        items: [{ type: String, required: true }], // An array of food items
      }
    ]
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

export default Subscription;
