import ChatMessageModel from '../models/chatMessage.js';
import {Server} from "socket.io";


const setupWebSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
        },
    });

    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('join-room', (roomId) => {
            socket.join(roomId);
            console.log(`User joined room: ${roomId}`);
        });

        socket.on('send-message', async ({ senderId, recipientId, message, roomId }) => {
            try {
                const savedMessage = await chatMessageService.saveMessage(senderId, recipientId, message, roomId);
                io.to(roomId).emit('receive-message', savedMessage);
            } catch (error) {
                console.error('Failed to save message:', error.message);
            }
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
};

const saveMessage = async (senderId, recipientId, message, roomId) => {
    try {
        const chatMessage = new ChatMessageModel({
            senderId,
            recipientId,
            message,
            roomId,
        });

        await chatMessage.save();
        return chatMessage;
    } catch (error) {
        throw new Error('Failed to save message');
    }
};

const getMessages = async (roomId) => {
    try {
        const messages = await ChatMessageModel.find({ roomId }).sort({ timestamp: 1 });
        return messages;
    } catch (error) {
        throw new Error('Failed to fetch messages');
    }
};

export const chatMessageService =
    {
        saveMessage,
        getMessages,
        setupWebSocket
    };
