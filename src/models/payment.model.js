import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    pidx: {
      type: String,
      required: true,
      unique: true,
    },
    paymentMethod: {
      type: String,
      enum: ['Khalti', 'Esewa', 'Bank Transfer'],
      default: 'Khalti',
      required: true,
    },
    isRefunded: {
      type: Boolean,
      default: false,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed'],
      default: 'Pending',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subscription',
    },
    itemName: {
      type: String,
    },
    purchaseOrderId: {
      type: String,
    },
    customerInfo: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Payment', paymentSchema);
