import AWS from 'aws-sdk';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { v4: uuidv4 } = require('uuid');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    BUCKET: process.env.AWS_BUCKET,
});


export const uploadImageToS3 = async (fileBuffer, fileType) => {
    const params = {
        Bucket: process.env.AWS_BUCKET, // Replace with your S3 bucket name
        Key: `${uuidv4()}.${fileType}`,
        Body: fileBuffer,
        ContentType: `image/${fileType}`,
        ACL: 'public-read',
    };

    try {
        const data = await s3.upload(params).promise();
        return data.Location; // Return the URL of the uploaded image
    } catch (error) {
        throw new Error('Error uploading image to S3: ' + error.message);
    }
};