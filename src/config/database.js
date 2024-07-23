import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { logMongoDB, logError } from '../utils/logger.js';

dotenv.config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logMongoDB('MongoDB is connected'); // Custom logger for MongoDB
  } catch (error) {
    logError(`MongoDB connection error: ${error.message}`); // Use error logger
  }
};

export default connectToDatabase;
