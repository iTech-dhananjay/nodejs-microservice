import { Server } from 'socket.io';
import { chatMessageService } from './services/chatMessage.js';

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

export default setupWebSocket;
