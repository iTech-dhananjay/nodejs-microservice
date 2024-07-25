import { Router } from 'express';
import fs, {createReadStream} from 'fs';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url'

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname((_filename));
console.log(_dirname,'directory')

const router = Router();



/*

// Importing the fileReadSync function from the 'fs' module (not used in the code but might be intended for future use)
import { readFileSync } from 'fs';

router.get('/video', async (req, res) => {
    // Read the video file synchronously from the specified path Note: Using 'readFileSync' reads the file in a blocking manner, which might affect performance for large files

    const file = readFileSync(`${__dirname}/../../../../public/uploads/1721739712029-video.mp4`);
    res.send(file);
});

*/



router.get('/video', (req, res) => {
    const filePath = path.resolve(_dirname, '../../../../public/uploads/1721739712029-video.mp4');

    fs.stat(filePath, (err, stat) => {
        if (err) {
            return res.status(404).send('Video file not found.');
        }

        const fileSize = stat.size;
        const range = req.headers.range;

        if (!range) {
            return res.status(416).send('Requires a range header.');
        }

        const chunkSize = 10 ** 6; // 1MB
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + chunkSize - 1, fileSize - 1);

        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };

        res.writeHead(206, headers);

        const fileStream = fs.createReadStream(filePath, { start, end });
        fileStream.on('open', () => {
            fileStream.pipe(res);
        });
        fileStream.on('error', (streamErr) => {
            res.end(streamErr);
        });
    });
});

export default router;