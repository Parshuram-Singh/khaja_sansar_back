import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  pidx: { type: String, required: true, unique: true },
  transactionId: { type: String, required: true },
  amount: { type: Number, required: true }, // Amount in paisa
  status: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription', required: true },
  purchaseOrderId: { type: String },
  purchaseOrderName: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Payment', paymentSchema);