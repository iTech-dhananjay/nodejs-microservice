import { Router } from 'express';
import { videoStreamService } from "../services/stream.js";
import upload from '../../../config/fileUpload.js';

const router = Router();

router.post('/', upload.single('video'), async (req, res) => {
    try {
        const file = req.file
        if (!file) {
            return res.status(400).send('No file uploaded.');
        }
        const video = await videoStreamService.addVideo(file);
        res.status(201).json(video);
    } catch (error) {
        res.status(500).send('Error uploading video');
    }
});

export default router;
