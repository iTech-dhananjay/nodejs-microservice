import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/database.js';
import { logInfo } from './utils/logger.js';
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
const PORT = process.env.PORT || 4009;
app.listen(PORT, () => logInfo(`Server is running on port ${PORT}`));
