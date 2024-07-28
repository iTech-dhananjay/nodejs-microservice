import dotenv from 'dotenv';
import http from 'http';
import app from './app.js';
import connectToDatabase from './config/database.js';
import setupWebSocket from './modules/websocket-chat-app/websocket.js';
import { logServer } from './utils/logger.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectToDatabase();

// Create HTTP server
const server = http.createServer(app);

// Setup WebSocket
setupWebSocket(server);

// Start the server
const PORT = process.env.PORT || 4009;
app.listen(PORT, () => logServer(`Server is running on port ${PORT}`));
