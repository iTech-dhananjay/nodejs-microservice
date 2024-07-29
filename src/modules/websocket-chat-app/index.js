import { Router } from 'express';
import chatMessageRouter from './router/chatMessage.js';
import { logInfo } from '../../utils/logger.js';

const router = Router();
router.use('/chat', chatMessageRouter);

const chatMessageModule = {
    init: (app) => {
        app.use('/chat-app', router);
        logInfo('Chat Message Module loaded');
    },
};

export default chatMessageModule;