import express from 'express';
import { stripePaymentService } from '../services/stripe.js';

const router = express.Router();

router.post('/create-payment-intent', async (req, res) => {
    const { amount, currency, productId, userId } = req.body;

    try {
        const paymentIntent = await stripePaymentService.createPaymentIntent(amount, currency, productId, userId);
        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }
});

export default router;