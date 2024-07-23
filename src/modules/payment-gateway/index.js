import { Router } from 'express';
import payPalRouter from './router/payPal.js';
import razorPayRouter from './router/razorPay.js';
import winston from 'winston';

const router = Router();

router.use('/paypal', payPalRouter);
router.use('/razorpay', razorPayRouter);

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
    ],
});

const paymentGatewayModule = {
    init: (app) => {
        app.use('/api/payment-gateway', router);
        logger.info('Payment Gateway Module initialized');
    },
};

export default paymentGatewayModule;