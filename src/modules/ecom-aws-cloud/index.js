import { Router } from 'express';
import userRouter from './router/user.js';
import productRouter from './router/product.js';
import orderRouter from './router/order.js';
import warehouseRouter from './router/warehouse.js';
import stripeRouter from './router/stripe.js';
import todoKafkaRouter from './router/todo-kafka.js';
import { logInfo, logError } from '../../utils/logger.js';

// Create a router instance
const router = Router();

// Use the imported routers
router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/order', orderRouter);
router.use('/warehouse', warehouseRouter)
router.use('/stripe-payment', stripeRouter)
router.use('/todo-kafka', todoKafkaRouter);

// Export the module with an init method
const EcomModule = {
    init: (app) => {
        try {
            app.use('/ecom', router);
            logInfo('E-commerce Module initialized successfully');
        } catch (error) {
            logError(`Failed to initialize Ecom Module: ${error.message}`);
        }
    },
};

export default EcomModule;