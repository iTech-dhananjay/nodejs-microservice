import path from 'path';
import fs from 'fs';
import Video from '../models/videoStream.js';
import { logError } from '../../../utils/logger.js';
import VideoModel from "../models/videoStream.js";

export const saveVideo = async (file) => {
    const video = new VideoModel({
        originalName: file.originalname,
        filename: file.filename,
        mimetype: file.mimetype,
        size: file.size,
        path: file.path,
    });
    return await video.save();
};

export const getVideoById = async (id) => {
    return await VideoModel.findById(id);
};

export const uploadVideo = async (req, res) => {
    try {
        const video = await saveVideo(req.file);
        res.status(201).json(video);
    } catch (error) {
        logError(`Error uploading video: ${error.message}`);
        res.status(500).send('Error uploading video');
    }
};

export const streamVideo = async (req, res) => {
    try {
        const video = await getVideoById(req.params.id);
        if (!video) {
            return res.status(404).send('Video not found');
        }

        const videoPath = path.resolve('uploads', video.filename);
        const stat = fs.statSync(videoPath);
        const fileSize = stat.size;
        const range = req.headers.range;

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

            if (start >= fileSize) {
                res.status(416).send('Requested range not satisfiable\n' + start + ' >= ' + fileSize);
                return;
            }

            const chunksize = (end - start) + 1;
            const file = fs.createReadStream(videoPath, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            };

            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            fs.createReadStream(videoPath).pipe(res);
        }
    } catch (error) {
        logError(`Error streaming video: ${error.message}`);
        res.status(500).send('Error streaming video');
    }
};