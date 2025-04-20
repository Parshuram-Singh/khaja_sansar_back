import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  paymentStatus: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  price: { type: Number, required: true },
  deliveryTime: { type: String, required: true },
  selectedPlan: { type: String, required: true },
  orderDetails: [
    {
      day: {
        type: String,
        required: true  
      },
      items: [
        
           {
            type: [String],
            required: true
          },
        
      ]
    }
  ],
},
  { timestamps: true }

);

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

export default Subscription; 
