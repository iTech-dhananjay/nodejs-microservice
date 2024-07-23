// modules/payment-gateway/index.js
import { Router } from 'express';
import payPalRouter from './router/payPal.js';
import razorPayRouter from './router/razorPay.js';
import logger from '../../utils/logger.js';

// Create a router instance
const router = Router();

// Use the imported routers
router.use('/paypal', payPalRouter);
router.use('/razorpay', razorPayRouter);

// Export the module with an init method
const paymentGatewayModule = {
    init: (app) => {
        app.use('/payment-gateway', router);
        logger.info('Payment Gateway Module initialized');
    },
};

export default paymentGatewayModule;