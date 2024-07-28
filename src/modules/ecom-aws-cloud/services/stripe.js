import Stripe from 'stripe';
import StripePaymentModel from '../models/stripe.js';
const stripe = new Stripe('your_stripe_secret_key');

const createPaymentIntent = async (amount, currency, productId, userId) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });

        const payment = new StripePaymentModel({
            amount,
            currency,
            paymentIntentId: paymentIntent.id,
            status: paymentIntent.status,
            productId,
            userId,
        });

        await payment.save();

        return paymentIntent;
    } catch (error) {
        throw error;
    }
};

export const stripePaymentService = {
    createPaymentIntent,
};
