import dotenv from 'dotenv';
import http from 'http';
import app from './app.js';
import connectToDatabase from './config/database.js';
import { chatMessageService } from './modules/websocket-chat-app/services/chatMessage.js';
import { logServer } from './utils/logger.js';
import { Server } from 'socket.io';
import { setIoInstance } from '../src/modules/websocket-chat-app/router/chatMessage.js';
import './config/cron.js'; // Add this line to initialize the cron job
import initConsumer from "./kafka/consumer.js";
import kafkaClient from './config/kafka.js';  // Ensures Kafka topic is created

// Load environment variables
dotenv.config();


// Connect to MongoDB
connectToDatabase();

// Initialize Kafka Consumer
initConsumer().then(() => {
    console.log('Kafka Consumer setup complete');
}).catch(error => {
    console.error('Failed to set up Kafka Consumer:', error);
});



// Create an HTTP server
const server = http.createServer(app);
// Setup WebSocket
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

setIoInstance(io); // Pass the WebSocket instance to the service

// Start the server
const PORT = process.env.PORT || 4009;
app.listen(PORT, () => logServer(`Server is running on port ${PORT}`));
