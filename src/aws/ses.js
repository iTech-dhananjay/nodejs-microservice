import AWS from 'aws-sdk';

const ses = new AWS.SES();

// Basic HTML email template
const emailTemplate = ({ subject, body }) => `
    <!DOCTYPE html>
    <html>
    <head>
        <title>${subject}</title>
    </head>
    <body>
        <h1>${subject}</h1>
        <p>${body}</p>
    </body>
    </html>
`;

export const sendEmail = async ({ to, subject, body }) => {
    const params = {
        Destination: {
            ToAddresses: [to],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: emailTemplate({ subject, body }),
                },
                Text: {
                    Charset: "UTF-8",
                    Data: body,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: subject,
            },
        },
        Source: "your-email@example.com", // Replace with your verified SES email
    };

    try {
        const data = await ses.sendEmail(params).promise();
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

// More SES functions can be added here