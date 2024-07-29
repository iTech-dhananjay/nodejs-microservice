import { CronJob } from 'cron';
import userModel from '../modules/ecom-aws-cloud/models/user.js';  // Adjust the path based on your project structure

const cleanupSessions = async () => {
    // Get the current date without the time portion
    const today = new Date();

    try {
        const result = await userModel.updateMany(
            {},
            { $pull: { sessions: { createdAt: { $lt: today } } } }
        );
        console.log(`Sessions older than today have been removed: ${result.modifiedCount} sessions cleaned.`);
    } catch (error) {
        console.error('Error cleaning up sessions:', error.message);
    }
};

// Schedule the job to run every minute for testing
const job = new CronJob('* * * * *', cleanupSessions, null, true, 'Asia/Kolkata');
job.start();