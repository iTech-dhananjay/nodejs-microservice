import { Router } from 'express';
import {readFileSync} from 'fs';
import {dirname} from 'path';
import {fileURLToPath} from 'url'
import { videoStreamService } from '../services/stream.js';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname((_filename));
console.log(_dirname,'directory')

const router = Router();

// router.get('/:id', async (req, res) => {
//     try {
//         await videoStreamService.streamVideo(req, res);
//     } catch (error) {
//         res.status(500).send('Error streaming video');
//     }
// });

router.get('/video', async (req, res) => {
    const file = readFileSync(`${_dirname}/../../../../public/uploads/1721739712029-video.mp4`);

    res.send(file)

})

export default router;