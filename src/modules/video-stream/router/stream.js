import { Router } from 'express';
import { streamVideo }  from '../services/stream.js';

const router = Router();

router.get('/:id', async (req, res) => {
    try {
        await streamVideo(req, res);
    } catch (error) {
        res.status(500).send('Error streaming video');
    }
});

export default router;