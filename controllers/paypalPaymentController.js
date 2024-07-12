import paypal from 'paypal-rest-sdk';
import {promisify} from 'util';
import dotenv from 'dotenv';
dotenv.config();
import PayPalPaymentModel from "../models/paypalPaymentModel.js";
paypal.configure({
    mode: process.env.PAYPAL_MODE,
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

const createPayment = async (req, res) => {
    try {
        const { amount, currency } = req.body;

        if (!amount || !currency) {
            return res.status(400).json({ error: 'amount and currency are required' });
        }

        const createPaymentJson = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal',
            },
            redirect_urls: {
                return_url: 'http://return.url',
                cancel_url: 'http://cancel.url',
            },
            transactions: [{
                amount: {
                    currency: currency,
                    total: amount,
                },
                description: 'This is the payment description.',
            }],
        };

        paypal.payment.create(createPaymentJson, async (error, payment) => {
            if (error) {
                console.error('Error creating PayPal payment:', error.response ? error.response : error);
                return res.status(500).json({ error: error.response ? error.response.message : 'Failed to create payment' });
            } else {
                // Save the payment details in the database
                const newPayment = new PayPalPaymentModel({
                    paymentId: payment.id,
                    //payerId: payment.payer.payer_info.payer_id,
                    amount: amount,
                    currency: currency,
                    status: payment.state,
                });

                await newPayment.save();

                res.json({ id: payment.id, links: payment.links });
            }
        });

        // const createPayment = promisify(paypal.payment.create.bind(paypal.payment));
        // const payment = await createPayment(createPaymentJson);
    } catch (error) {
        console.error('Error creating PayPal payment:', error);
        res.status(500).json({ error: error.message || 'Failed to create payment' });
    }
};


const executePayment = async (req, res) => {
    try {
        const { paymentId, payerId } = req.body;

        if (!paymentId || !payerId) {
            return res.status(400).json({ error: 'paymentId and payerId are required' });
        }

        const executePaymentJson = {
            payerId: payerId,
        };

        const payment = await new Promise((resolve, reject) => {
            paypal.payment.execute(paymentId, executePaymentJson, (error, payment) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(payment);
                }
            });
        });

        if (!payment.id || !payment.payer.payerInfo.payerId || !payment.transactions[0].amount.total || !payment.transactions[0].amount.currency || !payment.state) {
            return res.status(400).json({ error: 'Incomplete PayPal payment data' });
        }

        const newPayment = new PayPalPayment({
            paymentId: payment.id,
            payerId: payment.payer.payerInfo.payerId,
            amount: payment.transactions[0].amount.total,
            currency: payment.transactions[0].amount.currency,
            status: payment.state,
        });

        await newPayment.save();
        res.json(payment);
    } catch (error) {
        console.error('Error executing PayPal payment:', error);
        res.status(500).json({ error: error.message || 'Failed to execute payment' });
    }
};

export { createPayment, executePayment };