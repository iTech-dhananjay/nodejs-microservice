import orderModel from '../models/order.js';
import productModel from '../models/product.js';

// Check if a product is available in the required quantity
const checkProductAvailability = async (productId, quantity) => {
     try {
          const product = await productModel.findById(productId);

          if (!product || product.stock < quantity) {
               return false; // Product is not available or insufficient stock
          }

          return true; // Product is available in the required quantity
     } catch (error) {
          throw new Error(error.message);
     }
};

const createOrder = async (userId, productId, quantity) => {
     try {
          // Check if the product is available in the required quantity
          const product = await productModel.findById(productId);
          if (!product || product.availableStock < quantity) {
               throw new Error('Product not available');
          }

          // Create an order
          const order = new orderModel({
               userId: userId,
               productId: productId,
               status: 'Pending', // Set initial status to Pending
          });

          // Deduct the ordered quantity from the product's stock
          product.availableStock -= quantity;
          await product.save();

          return await order.save();
     } catch (error) {
          throw new Error(error.message);
     }
};

const getOrderStatus = async (userId, orderId) => {
     try {
          const order = await orderModel.findOne({
               _id: orderId,
               userId: userId,
          });

          if (!order) {
               return null;
          }

          return order.status;
     } catch (error) {
          throw new Error(error.message);
     }
};

const updateOrderStatus = async (orderId, newStatus) => {
     try {
          const updatedOrder = await orderModel.findOneAndUpdate(
               { _id: orderId },
               { $set: { status: newStatus } },
               { new: true }
          );

          if (!updatedOrder) {
               throw new Error('Order not found');
          }

          return updatedOrder;
     } catch (error) {
          throw new Error(error.message);
     }
};

export const orderService = {
     createOrder,
     checkProductAvailability,
     getOrderStatus,
     updateOrderStatus,
};
