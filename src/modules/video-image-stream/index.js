import { Router } from 'express';
import videoRouter from './router/video.js';
import uploadRouter from './router/upload.js';
import imageRouter from './router/image.js';
import { logInfo } from '../../utils/logger.js';

const router = Router();

router.use('/video', videoRouter);
router.use('/upload', uploadRouter);
router.use('/image', imageRouter)

const videoStreamingModule = {
    init: (app) => {
        app.use('/video-image-stream', router);
        logInfo('Video Streaming Module loaded');
    },
};

export default videoStreamingModule;