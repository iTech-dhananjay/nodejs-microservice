import AWS from 'aws-sdk';

const sns = new AWS.SNS();

export const publishMessage = async (params) => {
    try {
        const data = await sns.publish(params).promise();
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

// More SNS functions can be added here