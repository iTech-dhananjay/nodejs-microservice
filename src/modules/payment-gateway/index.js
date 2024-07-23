import { Router } from 'express';
import payPalRouter from './router/payPal.js';
import razorPayRouter from './router/razorPay.js';
import { logInfo, logError } from '../../utils/logger.js'; // Import specific log functions

// Create a router instance
const router = Router();

// Use the imported routers
router.use('/paypal', payPalRouter);
router.use('/razorpay', razorPayRouter);

// Export the module with an init method
const paymentGatewayModule = {
    init: (app) => {
        try {
            app.use('/payment-gateway', router);
            logInfo('Payment Gateway Module initialized successfully');
        } catch (error) {
            logError(`Failed to initialize Payment Gateway Module: ${error.message}`);
        }
    },
};

export default paymentGatewayModule;