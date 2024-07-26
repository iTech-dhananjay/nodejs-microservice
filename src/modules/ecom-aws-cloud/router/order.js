import { Router } from 'express';
import { orderService } from '../services/order.js';
import isLoggedIn from '../../../middleware/isLoggedIn.js';
import isLoggedInAndAdmin from '../../../middleware/checkAdminRole.js';

const router = Router();

// Create a new order (only accessible by logged-in users)
router.post('/add', isLoggedIn, async (req, res) => {
     try {
          const userId = req.user.userId;
          const { productId, quantity } = req.body;

          const isAvailable = await orderService.checkProductAvailability(
               productId,
               quantity
          );

          if (!isAvailable) {
               return res.status(400).json({
                    message: 'Product is not available or insufficient stock',
               });
          }

          const order = await orderService.createOrder(
               userId,
               productId,
               quantity
          );
          res.status(201).json(order);
     } catch (error) {
          res.status(400).json({ message: error.message });
     }
});

// Get the live status of an order
router.get('/status/:orderId', isLoggedIn, async (req, res) => {
     try {
          const orderId = req.params.orderId;
          const userId = req.user.userId;

          const orderStatus = await orderService.getOrderStatus(
               userId,
               orderId
          );

          if (!orderStatus) {
               return res.status(404).json({ message: 'Order not found' });
          }

          return res.status(200).json({ status: orderStatus });
     } catch (error) {
          res.status(500).json({ message: 'Internal server error' });
     }
});

// Update the status of an order (Admin only)
router.put('/status/:orderId', isLoggedInAndAdmin, async (req, res) => {
     try {
          const { orderId } = req.params;
          const { newStatus } = req.body;

          const updatedOrder = await orderService.updateOrderStatus(
               orderId,
               newStatus
          );

          res.status(200).json(updatedOrder);
     } catch (error) {
          res.status(400).json({ message: error.message });
     }
});

export default router;
