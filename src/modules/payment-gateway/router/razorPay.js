import express from "express";
import {
  checkout,
  paymentVerification,
} from "../services/razorPay.js";

const router = express.Router();

router.route("/checkout").post(checkout);

router.route("/paymentverification").post(paymentVerification);

export default router;
