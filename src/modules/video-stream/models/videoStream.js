import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    originalName: { type: String, required: true },
    filename: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    path: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const VideoModel = mongoose.model('Video', videoSchema);

export default VideoModel;