import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { upload, uploadDir } from '../../../config/fileUpload.js';
import {imageService} from '../services/image.js'; // Ensure this path is correct

const router = Router();

import { promisify } from 'util';
import { createWriteStream, stat, readFile, unlink } from 'fs';

const statAsync = promisify(stat);
const readFileAsync = promisify(readFile);
const unlinkAsync = promisify(unlink);

router.post('/upload-chunk', upload.array('chunk'), async (req, res) => {
    const { originalname, chunkIndex, totalChunks } = req.body;
    const chunks = req.files;

    if (!originalname || !chunkIndex || !totalChunks || !chunks || chunks.length === 0) {
        return res.status(400).send('Missing required fields or files');
    }

    const filePath = path.join(uploadDir, originalname);

    try {
        // Move chunks to their respective locations
        await Promise.all(chunks.map(async (chunk, index) => {
            const tempFilePath = `${filePath}.part${chunkIndex[index]}`;
            await promisify(fs.rename)(chunk.path, tempFilePath);
        }));

        // Check if all chunks are uploaded
        const allChunksUploaded = [...Array(parseInt(totalChunks)).keys()].every((index) => {
            return fs.existsSync(`${filePath}.part${index}`);
        });

        if (allChunksUploaded) {
            // Merge chunks into a single file
            const writeStream = createWriteStream(filePath);

            for (let index = 0; index < totalChunks; index++) {
                const chunkPath = `${filePath}.part${index}`;
                const data = await readFileAsync(chunkPath);
                writeStream.write(data);
                await unlinkAsync(chunkPath); // Remove chunk after merging
            }

            writeStream.end();

            // Save file details to the database
            const fileSize = (await statAsync(filePath)).size;
            const mimeType = 'image/png'; // Adjust based on actual file type

            await imageService.saveFileDetails({
                filename: originalname,
                filePath: filePath,
                fileSize: fileSize,
                mimeType: mimeType,
            });

            res.status(200).send('Chunk uploaded and file details saved successfully');
        } else {
            res.status(400).send('Not all chunks uploaded');
        }
    } catch (error) {
        console.error('Error processing upload:', error);
        res.status(500).send('Error processing upload');
    }
});

export default router;
