import { Router } from 'express';
import winston from 'winston';
import payPalRouter from './router/payPal.js';
import razorPayRouter from './router/razorPay.js';

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

// Log the info when the module is imported
logger.info('Payment Gateway Module initialized');

// Export the router directly
export default router;