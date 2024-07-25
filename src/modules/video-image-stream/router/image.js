import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { upload, uploadDir } from '../../../config/fileUpload.js';

const router = Router();

router.post('/upload-chunk', upload.single('chunk'), (req, res) => {
    const { originalname, chunkIndex, totalChunks } = req.body;
    const chunk = req.file;

    if (!originalname || !chunkIndex || !totalChunks) {
        return res.status(400).send('Missing required fields');
    }

    const filePath = path.join(uploadDir, originalname);
    const tempFilePath = `${filePath}.part${chunkIndex}`;

    fs.renameSync(chunk.path, tempFilePath);

    // Check if all chunks are uploaded
    const allChunksUploaded = [...Array(parseInt(totalChunks)).keys()].every((index) => {
        return fs.existsSync(`${filePath}.part${index}`);
    });

    if (allChunksUploaded) {
        const writeStream = fs.createWriteStream(filePath);

        for (let index = 0; index < totalChunks; index++) {
            const chunkPath = `${filePath}.part${index}`;
            const data = fs.readFileSync(chunkPath);
            writeStream.write(data);
            fs.unlinkSync(chunkPath); // Remove chunk after merging
        }

        writeStream.end();
    }

    res.status(200).send('Chunk uploaded successfully');
});

export default router;
