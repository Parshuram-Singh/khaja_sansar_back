// models/Payment.js

import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    // Unique payment identifier provided by Khalti or other gateways
    pidx: {
      type: String,
      required: true,
      unique: true,
    },

    // Payment method used for the transaction
    paymentMethod: {
      type: String,
      enum: ['Khalti', 'Esewa', 'Bank Transfer'],
      default: 'Khalti',
      required: true,
    },

    // Whether the payment has been refunded
    isRefunded: {
      type: Boolean,
      default: false,
    },

    // Payment amount in paisa (e.g., 1000 = Rs. 10)
    amount: {
      type: Number,
      required: true,
    },

    // Status of the payment
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed'],
      default: 'Pending'
    },

    // Reference to the user who made the payment
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // (Optional) Reference to the associated subscription if any
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subscription',
    },

    // Name of the product or service purchased
    itemName: {
      type: String,
    },

    // Unique ID for the purchase order
    purchaseOrderId: {
      type: String,
    },

    // Customer details submitted during the payment
    customerInfo: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
    }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

export default mongoose.model('Payment', paymentSchema);
