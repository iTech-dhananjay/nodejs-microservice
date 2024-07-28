
import express from 'express';
import { chatMessageService } from '../services/chatMessage.js';

const router = express.Router();

router.get('/messages/:roomId', async (req, res) => {
    const { roomId } = req.params;

    try {
        const messages = await chatMessageService.getMessages(roomId);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
