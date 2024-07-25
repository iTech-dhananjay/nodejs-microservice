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


//To display the byte ranges in megabytes (MB) in the logs
router.get('/video', (req, res) => {
    const filePath = path.resolve(_dirname, '../../../../public/uploads/1721739712029-video.mp4');  // Resolve the path to the video file

    // Get file statistics to obtain file size
    fs.stat(filePath, (err, stat) => {
        if (err) {
            return res.status(404).send('Video file not found.');
        }

        const fileSize = stat.size; // Total size of the file
        const range = req.headers.range; // Get range header from the request

        if (!range) {
            return res.status(416).send('Requires a range header.');
        }

        const chunkSize = 10 ** 6; // 1MB chunk size
        const start = Number(range.replace(/\D/g, "")); // Extract start byte from range header (e.g., "bytes=27033600-") by removing non-digit characters
        const end = Math.min(start + chunkSize - 1, fileSize - 1);
        const contentLength = end - start + 1; // Length of the chunk to be sent

        const headers = {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };

        // Convert byte values to MB for logging
        const startMB = (start / (10 ** 6)).toFixed(2);
        const endMB = (end / (10 ** 6)).toFixed(2);
        const fileSizeMB = (fileSize / (10 ** 6)).toFixed(2);
        const contentLengthMB = (contentLength / (10 ** 6)).toFixed(2);

        // Log the range details in MB [[ Start: 0.00 MB, End: 1.00 MB, File Size: 40.03 MB, Content Length: 1.00 MB ]]
        console.log(`Start: ${startMB} MB, End: ${endMB} MB, File Size: ${fileSizeMB} MB, Content Length: ${contentLengthMB} MB`);

        // Write the headers to the response
        res.writeHead(206, headers);

        // Create a readable stream for the specified range of the file
        const fileStream = fs.createReadStream(filePath, { start, end });

        // Pipe the file stream to the response
        fileStream.on('open', () => {
            fileStream.pipe(res);
        });
        fileStream.on('error', (streamErr) => {
            res.end(streamErr);
        });
    });
});

export default router;