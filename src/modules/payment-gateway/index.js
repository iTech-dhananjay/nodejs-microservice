import { Router } from 'express';
import payPalRouter from './router/payPal.js';
import razorPayRouter from './router/razorPay.js';
import winston from 'winston';

// Create a router instance
const router = Router();

// Use the imported routers
router.use('/paypal', payPalRouter);
router.use('/razorpay', razorPayRouter);

// Configure winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
    ],
});

// Export the module with an init method
const paymentGatewayModule = {
    init: (app) => {
        app.use('/api/payment-gateway', router);
        logger.info('Payment Gateway Module initialized');
    },
};

export default paymentGatewayModule;