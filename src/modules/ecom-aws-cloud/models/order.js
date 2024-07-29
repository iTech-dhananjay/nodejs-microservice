import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
     userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
     },
     productId: {
          type: mongoose.Schema.Types.ObjectId,
          index: true,  // Adding an index for faster queries
          ref: 'Product',
     },
     status: {
          type: String,
          enum: ['Pending', 'Accept', 'Reject', 'Dispatch'],
     },
});

const orderModel = mongoose.model('orders', orderSchema);

export default orderModel;
