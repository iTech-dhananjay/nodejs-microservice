import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/database.js';
// import Razorpay from 'razorpay';

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();


// export const instance = new Razorpay({
//   key_id: process.env.RAZORPAY_API_KEY,
//   key_secret: process.env.RAZORPAY_API_SECRET,
// });

// Start the server
app.listen(process.env.PORT, () =>
    console.log(`Server is running on port ${process.env.PORT}`)
);