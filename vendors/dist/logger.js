"use strict";
const winston_1 = require("winston");
const { combine, timestamp, colorize, printf } = winston_1.format;
const expressWinston = require('express-winston');
const { LoggingWinston } = require('@google-cloud/logging-winston');
const IS_DEPLOYED = process.env.NODE_ENV === 'production';
const getWinstonTransport = () => {
    if (IS_DEPLOYED) {
        const loggingWinston = new LoggingWinston({
            serviceContext: {
                service: 'vendors',
                version: '0.0.1',
            },
        });
        return loggingWinston;
    }
    return new winston_1.transports.Console();
};
const productionMsgFormat = combine(printf((info) => info.message));
const developmentMsgFormat = combine(colorize(), timestamp({
    format: 'YYYY-MM-DDTHH:mm:SS',
}), printf(info => `${info.timestamp} ${info.level} ${info.message}`));
const logger = winston_1.createLogger({
    transports: [new winston_1.transports.Console({ level: 'debug' })],
    format: IS_DEPLOYED ? productionMsgFormat : developmentMsgFormat,
});
const requestLogger = expressWinston.logger({
    transports: [getWinstonTransport()],
    format: combine(colorize(), timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }), printf(info => `${info.timestamp} ${info.level}: ${info.message} - ${JSON.stringify(info.meta.res)}`)),
});
const errorLogger = expressWinston.errorLogger({
    transports: [getWinstonTransport()],
    format: combine(colorize(), timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }), printf(info => `${info.timestamp} ${info.level}: ${JSON.stringify(info, null, 2)}`)),
});
module.exports = {
    requestLogger,
    errorLogger,
    info: (message) => logger.info(message),
    error: (error) => logger.error(error),
    debug: (debug) => logger.debug(debug),
};
//# sourceMappingURL=logger.js.map