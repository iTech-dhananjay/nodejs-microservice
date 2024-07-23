import multer from 'multer';
import fs from 'fs';
import path from 'path';

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

export default upload;
