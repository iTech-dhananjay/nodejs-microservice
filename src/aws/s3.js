import AWS from 'aws-sdk';

const s3 = new AWS.S3();

export const uploadFile = async (params) => {
    try {
        const data = await s3.upload(params).promise();
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

// More S3 functions can be added here