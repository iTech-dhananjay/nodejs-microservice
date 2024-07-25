import express from 'express';
import fs from 'fs';
import path from 'path';
const router = express.Router();

// Helper function to get image chunk
const getImageChunk = async (imageId, range) => {
    const image = await Image.findById(imageId);
    if (!image) {
        throw new Error('Image not found');
    }

    const { filePath, fileSize, mimeType } = image;

    const chunkSize = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunkSize - 1, fileSize - 1);
    const contentLength = end - start + 1;

    const fileStream = fs.createReadStream(filePath, { start, end });

    const headers = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": mimeType,
    };

    // Convert byte values to MB for logging
    const startMB = (start / (10 ** 6)).toFixed(2);
    const endMB = (end / (10 ** 6)).toFixed(2);
    const fileSizeMB = (fileSize / (10 ** 6)).toFixed(2);
    console.log(`Start: ${startMB} MB, End: ${endMB} MB, File Size: ${fileSizeMB} MB, Content Length: ${(contentLength / (10 ** 6)).toFixed(2)} MB`);

    return { fileStream, headers };
};

// Route to serve image in chunks
router.get('/image/:id', async (req, res) => {
    const { id } = req.params;
    const range = req.headers.range;

    if (!range) {
        return res.status(416).send('Requires a range header.');
    }

    try {
        const { fileStream, headers } = await getImageChunk(id, range);
        res.writeHead(206, headers);
        fileStream.pipe(res);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

export default router;