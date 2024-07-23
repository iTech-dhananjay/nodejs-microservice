import express from 'express';
import cors from 'cors';
import paymentGatewayRouter from './modules/payment-gateway/index.js'; // Updated import

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the paymentGatewayRouter
app.use('/api/payment-gateway', paymentGatewayRouter);

app.get('/api/getkey', (req, res) => {
    const apiKey = process.env.RAZORPAY_API_KEY;
    if (apiKey) {
        res.status(200).json({ key: apiKey });
    } else {
        res.status(500).json({ error: 'API key not found' });
    }
});

export default app;