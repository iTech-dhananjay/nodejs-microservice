import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
     productId: mongoose.Schema.Types.ObjectId,
     productName: String,
     quantity: {
          type: Number,
          required: true,
     },
     price: {
          type: Number,
          required: true,
     },
     status: {
          type: String,
          enum: ['pending', 'shipped', 'delivered', 'cancelled'],
          default: 'pending',
     },
     orderDate: {
          type: Date,
          default: Date.now,
     },
     deliveryDate: Date,
});

const orderModel = mongoose.model('orders', orderSchema);

export default orderModel;