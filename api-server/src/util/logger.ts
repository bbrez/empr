import * as winston from 'winston';

export default winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),

    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                winston.format.printf(info => `[${info.timestamp}] (${info.level}): ${info.message}`)
            )
        }),
        new winston.transports.File({
            filename: 'logs/main.log',
        })
    ]
});

export const socketLogger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),

    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
            )
        }),

        new winston.transports.File({
            filename: 'logs/socket.log',
        })
    ]
});