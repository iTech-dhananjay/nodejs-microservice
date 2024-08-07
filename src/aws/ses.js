import AWS from 'aws-sdk';

const ses = new AWS.SES();

// User Registration HTML email template
const registrationEmailTemplate = ({ username }) => `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Welcome to Our Service</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
            }
            .container {
                width: 80%;
                margin: auto;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 10px;
            }
            .header {
                background-color: #f4f4f4;
                padding: 10px;
                text-align: center;
                border-bottom: 1px solid #ccc;
            }
            .content {
                margin: 20px 0;
            }
            .footer {
                text-align: center;
                font-size: 0.9em;
                color: #777;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Welcome to Our Service, ${username}!</h1>
            </div>
            <div class="content">
                <p>Dear ${username},</p>
                <p>Thank you for registering with us. We are excited to have you on board.</p>
                <p>To get started, please verify your email address by clicking the link below:</p>
                <p><a href="https://your-service.com/verify-email?user=${username}">Verify Email</a></p>
                <p>If you have any questions, feel free to reply to this email or contact our support team.</p>
                <p>Best regards,</p>
                <p>The [Your Service] Team</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 Your Service. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
`;

// User Login Notification HTML email template
const loginEmailTemplate = ({ username, loginTime }) => `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Login Notification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
            }
            .container {
                width: 80%;
                margin: auto;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 10px;
            }
            .header {
                background-color: #f4f4f4;
                padding: 10px;
                text-align: center;
                border-bottom: 1px solid #ccc;
            }
            .content {
                margin: 20px 0;
            }
            .footer {
                text-align: center;
                font-size: 0.9em;
                color: #777;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Login Notification</h1>
            </div>
            <div class="content">
                <p>Dear ${username},</p>
                <p>We noticed a login to your account on ${loginTime}.</p>
                <p>If this was you, you can safely ignore this email.</p>
                <p>If you did not login, please reset your password immediately and contact our support team.</p>
                <p>Best regards,</p>
                <p>The [Your Service] Team</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 Your Service. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
`;

const sendRegistrationEmail = async ({ to, username }) => {
    const params = {
        Destination: {
            ToAddresses: [to],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: registrationEmailTemplate({ username }),
                },
                Text: {
                    Charset: "UTF-8",
                    Data: `Welcome to Our Service, ${username}!\n\nThank you for registering with us. To get started, please verify your email address by clicking the link below:\n\nhttps://your-service.com/verify-email?user=${username}\n\nIf you have any questions, feel free to reply to this email or contact our support team.\n\nBest regards,\nThe [Your Service] Team`,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Welcome to Our Service!",
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

const sendLoginNotificationEmail = async ({ to, username, loginTime }) => {
    const params = {
        Destination: {
            ToAddresses: [to],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: loginEmailTemplate({ username, loginTime }),
                },
                Text: {
                    Charset: "UTF-8",
                    Data: `Dear ${username},\n\nWe noticed a login to your account on ${loginTime}.\n\nIf this was you, you can safely ignore this email.\n\nIf you did not login, please reset your password immediately and contact our support team.\n\nBest regards,\nThe [Your Service] Team`,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Login Notification",
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

export { sendRegistrationEmail , sendLoginNotificationEmail}