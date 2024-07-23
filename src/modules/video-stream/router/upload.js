// routes/videoRouter.js
import { Router } from 'express';
import { uploadVideo } from '../services/stream.js';
import upload from '../../../config/multerFile.js'; // Adjust the path as necessary

const router = Router();

router.post('/', upload.single('video'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        await uploadVideo(req, res);
    } catch (error) {
        res.status(500).send('Error uploading video');
    }
});

export default router;
