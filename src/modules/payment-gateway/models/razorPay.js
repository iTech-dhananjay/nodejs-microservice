import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  razorpayOrderId: {
    type: String,
    required: true,
  },
  razorpayPaymentId: {
    type: String,
    required: true,
  },
  razorpaySignature: {
    type: String,
    required: true,
  },
});

export const RazorPayPayment = mongoose.model("RazorPayPayment", paymentSchema);
