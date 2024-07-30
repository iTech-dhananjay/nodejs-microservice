import { CronJob } from 'cron';
import userModel from '../modules/ecom-aws-cloud/models/user.js';  // Adjust the path based on your project structure

const cleanupSessions = async () => {
    // Get the date 1 day ago
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    try {
        // Remove sessions older than 1 day
        const result = await userModel.updateMany(
            {},
            { $pull: { sessions: { createdAt: { $lt: oneDayAgo } } } }
        );
        console.log(`Sessions older than 1 day have been removed: ${result.modifiedCount} sessions cleaned.`);
    } catch (error) {
        console.error('Error cleaning up sessions:', error.message);
    }
};

// Schedule the job to run every day at midnight
const job = new CronJob('0 0 * * *', cleanupSessions, null, true, 'Asia/Kolkata');
job.start();