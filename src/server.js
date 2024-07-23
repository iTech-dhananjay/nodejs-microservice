import dotenv from 'dotenv';
import app from './app.js';
import connectToDatabase from './config/database.js';
import { logInfo } from './utils/logger.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectToDatabase();

// Start the server
const PORT = process.env.PORT || 4009;
app.listen(PORT, () => logInfo(`Server is running on port ${PORT}`));
