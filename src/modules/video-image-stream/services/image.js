import ImageModel from '../models/image.js'; // Adjust the path as needed

const saveFileDetails = async (fileData) => {
    try {
        const { filename, filePath, fileSize, mimeType } = fileData;
        const newImage = new ImageModel({
            filename,
            filePath,
            fileSize,
            mimeType,
        });
        await newImage.save();
    } catch (error) {
        console.error('Error in saveFileDetails service:', error);
        throw error;
    }
};

const getAllImages = async() =>{
    try {
        const documents = await ImageModel.find();
        return documents;
    }catch (error) {
        throw error;
    }
}


export const imageService = {
    saveFileDetails,
    getAllImages
}
