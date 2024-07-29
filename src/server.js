import dotenv from 'dotenv';
import http from 'http';
import app from './app.js';
import connectToDatabase from './config/database.js';
import { chatMessageService } from './modules/websocket-chat-app/services/chatMessage.js';
import { logServer } from './utils/logger.js';
import { Server } from 'socket.io';
import { setIoInstance } from '../src/modules/websocket-chat-app/router/chatMessage.js';
import './config/cron.js'; // Add this line to initialize the cron job

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectToDatabase();

// Create an HTTP server
const server = http.createServer(app);

// Setup WebSocket
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

// Pass the WebSocket instance to the service
setIoInstance(io);

// Start the server
const PORT = process.env.PORT || 4009;
app.listen(PORT, () => logServer(`Server is running on port ${PORT}`));
