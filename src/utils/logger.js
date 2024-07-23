import winston from 'winston';
import chalk from 'chalk';

// Define custom log levels and their colors
const customLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        mongodb: 3, // Custom level for MongoDB
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'blue',
        mongodb: 'green', // Custom color for MongoDB
    },
};

// Add custom colors to winston
winston.addColors(customLevels.colors);

// Create a custom format that uses chalk for coloring
const customFormat = winston.format.printf(({ level, message, timestamp }) => {
    let coloredMessage = message;
    let coloredTimestamp = chalk.blue(timestamp); // Color the timestamp
    let coloredLevel = level.toUpperCase();

    switch (level) {
        case 'error':
            coloredMessage = chalk.red(message);
            coloredLevel = chalk.red.bold(level.toUpperCase());
            break;
        case 'warn':
            coloredMessage = chalk.yellow(message);
            coloredLevel = chalk.yellow.bold(level.toUpperCase());
            break;
        case 'info':
            coloredMessage = chalk.blue(message);
            coloredLevel = chalk.blue.bold(level.toUpperCase());
            break;
        case 'mongodb':
            coloredMessage = chalk.green(message);
            coloredLevel = chalk.green.bold(level.toUpperCase());
            break;
        default:
            coloredMessage = message;
            coloredLevel = level.toUpperCase();
    }

    return `${coloredTimestamp} [${coloredLevel}]: ${coloredMessage}`;
});

// Configure winston logger
const logger = winston.createLogger({
    levels: customLevels.levels,
    format: winston.format.combine(
        winston.format.timestamp(),
        customFormat
    ),
    transports: [
        new winston.transports.Console(),
    ],
});

const logInfo = (message) => logger.info(message);
const logError = (message) => logger.error(message);
const logWarn = (message) => logger.warn(message);
const logMongoDB = (message) => logger.log('mongodb', message);  // Custom log level for MongoDB

export { logInfo, logError, logWarn, logMongoDB };
