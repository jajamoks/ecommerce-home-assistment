import winston from "winston";
const { format } = winston;

const logAppAndVersionNo = winston.format((info) => {
    info.app = "cflow-shopping-cart";
    info.applicationName = "cflow-shopping-cart";
    const commonMeta = {};
    Object.assign(info, commonMeta);
    return info;
});

// application logger
export const logger = winston.createLogger({
    format: format.combine(
        logAppAndVersionNo(),
        format.timestamp(),
        format.json(),
    ),
    transports: [
        new winston.transports.Console({
            formatter: (options) => {
                const { format, level, metadata, message } = options;
                const logLine = format;
                logLine.level = level.toUpperCase();
                logLine.log = message;
                Object.assign(logLine, metadata);
                return JSON.stringify(logLine, null, 2);
            },
        }),
    ],
});