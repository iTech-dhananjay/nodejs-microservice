import winston from 'winston';
import chalk from 'chalk';

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
        default:
            coloredMessage = message;
            coloredLevel = chalk.white.bold(level.toUpperCase());
    }

    return `${coloredTimestamp} [${coloredLevel}]: ${coloredMessage}`;
});

// Configure winston logger
const logger = winston.createLogger({
    level: 'info', // Default logging level
    format: winston.format.combine(
        winston.format.timestamp(),
        customFormat
    ),
    transports: [
        new winston.transports.Console(),
    ],
});

// Custom log function for MongoDB logs
const logMongoDB = (message) => {
    const coloredMessage = chalk.magenta(message);
    logger.info(coloredMessage); // Use the 'info' level for MongoDB logs, with custom coloring
};

const logServer = (message) => {
    const coloredMessage = chalk.cyan(message);
    logger.info(coloredMessage);

}

const logInfo = (message) => logger.info(message);
const logError = (message) => logger.error(message);
const logWarn = (message) => logger.warn(message);

export { logInfo, logError, logWarn, logMongoDB, logServer };
