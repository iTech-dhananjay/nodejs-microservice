import { Router } from 'express';
import fs, {createReadStream} from 'fs';
import {dirname} from 'path';
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


router.get('/video', async (req, res) => {

    const filePath =  `${_dirname}/../../../../public/uploads/1721739712029-video.mp4`;
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;

    const range = req.headers.range;
    if(!range){
        return res.status(404).send('Requires a range.');
    }

    const chunkSize = 10**6 // 1-MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunkSize, fileSize);
    const contentLength = end - start + 1;

    const fileStream = await createReadStream(filePath,{
        start,
        end
    });

    fileStream.pipe(res);

    const header = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": `bytes `,
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    }

    res.writeHead(206, header);
})

export default router;