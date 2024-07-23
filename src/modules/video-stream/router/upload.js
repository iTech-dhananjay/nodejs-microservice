import { Router } from 'express';
import multer from 'multer';
import { uploadVideo } from '../services/stream.js';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('video'), async (req, res) => {
    try {
        await uploadVideo(req, res);
    } catch (error) {
        res.status(500).send('Error uploading video');
    }
});

export default router;