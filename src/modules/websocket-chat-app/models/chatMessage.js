import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    roomId: {
        type: String,
        required: true,
    },
});

const ChatMessageModel = mongoose.model('ChatMessage', chatMessageSchema);

export default ChatMessageModel;
