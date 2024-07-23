import winston from 'winston';

// Create a logger instance
const logger = winston.createLogger({
    level: 'info', // Default log level
    format: winston.format.combine(
        winston.format.timestamp(), // Add timestamp to logs
        winston.format.colorize(), // Colorize the output based on log level
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        }) // Custom format
    ),
    transports: [
        new winston.transports.Console({ // Console transport for development
            level: 'info', // Only log 'info' level and above
        }),
        new winston.transports.File({ // File transport for production
            filename: 'combined.log',
            level: 'info',
        }),
        new winston.transports.File({ // Error file transport for error logs
            filename: 'error.log',
            level: 'error',
        }),
    ],
});

// Log an error message
export const logError = (message) => {
    logger.error(message);
};

// Log an info message
export const logInfo = (message) => {
    logger.info(message);
};

// Log a warning message
export const logWarning = (message) => {
    logger.warn(message);
};

// Log a debug message
export const logDebug = (message) => {
    logger.debug(message);
};

export default logger;







/*
import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
    ],
});

// Export the logger for use in other modules
export default logger;

 */




