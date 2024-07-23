import { Router } from 'express';
import streamRouter from './router/stream.js';
import uploadRouter from './router/upload.js';
import { logInfo } from '../../utils/logger.js';

const router = Router();

router.use('/stream', streamRouter);
router.use('/upload', uploadRouter);

const videoStreamingModule = {
    init: (app) => {
        app.use('/api/video', router);
        logInfo('Video Streaming Module loaded');
    },
};

export default videoStreamingModule;