import winston from 'winston';
import chalk from 'chalk';

// Configure winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
            let color;
            switch (level) {
                case 'info':
                    color = chalk.green;
                    break;
                case 'error':
                    color = chalk.red;
                    break;
                case 'warn':
                    color = chalk.yellow;
                    break;
                default:
                    color = chalk.white;
            }
            return color(`${timestamp} [${level}]: ${message}`);
        })
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(({ level, message, timestamp }) => {
                    let color;
                    switch (level) {
                        case 'info':
                            color = chalk.green;
                            break;
                        case 'error':
                            color = chalk.red;
                            break;
                        case 'warn':
                            color = chalk.yellow;
                            break;
                        default:
                            color = chalk.white;
                    }
                    return color(`${timestamp} [${level}]: ${message}`);
                })
            ),
        }),
    ],
});

const logInfo = (message) => logger.info(message);
const logError = (message) => logger.error(message);
const logWarn = (message) => logger.warn(message);

export { logInfo, logError, logWarn };


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




