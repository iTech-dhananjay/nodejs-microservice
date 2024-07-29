import express from 'express';
import {chatMessageService} from "../services/chatMessage.js";
const router = express.Router();
let ioInstance;

export const setIoInstance = (io) => {
    ioInstance = io;
};

router.get('/messages/:roomId', async (req, res) => {
    const { roomId } = req.params;

    try {
        const messages = await chatMessageService.getMessages(roomId);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/send-message', async (req, res) => {
    const { senderId, recipientId, message, roomId } = req.body;

    try {
        const savedMessage = await chatMessageService.saveMessage(senderId, recipientId, message, roomId);

        // Emit the message to the room via WebSocket
        if (ioInstance) {
            ioInstance.to(roomId).emit('receive-message', savedMessage);
        }

        res.status(200).json(savedMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
