import express from "express";
import paymentRoute from "./routes/paymentRoutes.js";
import payPalPaymentRoute from "./routes/paypalPaymentRoutes.js"
import cors from "cors";



export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", paymentRoute);

// Routes
app.use('/api/payments', payPalPaymentRoute);

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);
