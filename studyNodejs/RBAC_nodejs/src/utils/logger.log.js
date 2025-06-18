'use strict';

import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

class Logger {
    constructor() {
        const formatPrint = format.printf(
            ({ level, message, context, requestId, timestamp, metadata }) => {
                return `${timestamp}::${level}::${context}::${requestId}::${message}::${JSON.stringify(
                    metadata
                )}`;
            }
        );

        this.logger = createLogger({
            format: format.combine(
                format.timestamp({
                    format:
                        (new Date().toLocaleString(), 'YYYY-MM-DD HH:mm:ss'),
                }),
                formatPrint
            ),
            transports: [
                new transports.Console(),
                new transports.DailyRotateFile({
                    level: 'info',
                    dirname: 'src/logs',
                    filename: 'server-%DATE%.info.log',
                    datePattern: 'YYYY-MM-DD-HH',
                    handleExceptions: true,
                    json: true,
                    zippedArchive: true, //save as a compressed file
                    maxsize: '50m', // 50MB
                    maxFiles: '3d', // Auto delete
                    format: format.combine(
                        format.timestamp({
                            format:
                                (new Date().toLocaleString(),
                                'YYYY-MM-DD HH:mm:ss'),
                        }),
                        formatPrint
                    ),
                }),
                new transports.DailyRotateFile({
                    level: 'error',
                    dirname: 'src/logs',
                    filename: 'server-%DATE%.error.log',
                    datePattern: 'YYYY-MM-DD-HH',
                    handleExceptions: true,
                    json: true,
                    zippedArchive: true, //save as a compressed file
                    maxsize: '50m', // 50MB
                    maxFiles: '3d', // Auto delete
                    format: format.combine(
                        format.timestamp({
                            format:
                                (new Date().toLocaleString(),
                                'YYYY-MM-DD HH:mm:ss'),
                        }),
                        formatPrint
                    ),
                }),
            ],
        });
    }

    commonParams(params) {
        let context, req, metadata;

        if (!Array.isArray(params)) {
            context = params;
        } else {
            [context, req, metadata] = params;
        }

        const requestId = req?.requestId || 'unknown';

        return { requestId, context, metadata };
    }

    log(message, params) {
        const paramLog = this.commonParams(params);
        const logObject = Object.assign(
            {
                message,
            },
            paramLog
        );
        this.logger.info(logObject);
    }

    error(message, params) {
        const paramLog = this.commonParams(params);
        const logObject = Object.assign(
            {
                message,
            },
            paramLog
        );
        this.logger.error(logObject);
    }
}

export default new Logger();
