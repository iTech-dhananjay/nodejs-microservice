import ChatMessageModel from '../models/chatMessage.js';

const saveMessage = async (senderId, recipientId, message, roomId) => {
    try {
        const chatMessage = new ChatMessageModel({
            senderId,
            recipientId,
            message,
            roomId,
        });

        await chatMessage.save();
        return chatMessage;
    } catch (error) {
        throw new Error('Failed to save message');
    }
};

const getMessages = async (roomId) => {
    try {
        const messages = await ChatMessageModel.find({ roomId }).sort({ timestamp: 1 });
        return messages;
    } catch (error) {
        throw new Error('Failed to fetch messages');
    }
};

export const chatMessageService =
    {
        saveMessage,
        getMessages
    };
