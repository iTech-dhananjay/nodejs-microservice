import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { uploadVideo } from '../services/stream.js';

const router = Router();

const uploadDir = 'public/uploads';

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer to save files in the 'public/uploads' directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

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