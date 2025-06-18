'use strict';

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { join } from 'path';
import compression from 'compression';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import 'dotenv/config';
import logger from './utils/logger.log.js';
import environmentConfig from './configs/environment.config.js';

// Usage:
const app = express();

const {
    appConfig: { host, port },
} = environmentConfig;

/* init middleware */
const corsOptions = {
    origin: `${host}:${port}`, // allow to run
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
};

const compressionOptions = {
    level: 6,
    threshold: 100 * 1000,
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(compression(compressionOptions));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use((req, res, next) => {
    const requestId = req.headers['x-request-id'];
    req.requestId = requestId || uuidv4();
    logger.log(`input params :: ${req.method}`, [
        req.path,
        { requestId: req.requestId },
        req.method === 'POST' ? req.body : req.query,
    ]);

    next();
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, 'uploads')));

/* init db */
import './configs/init.mongodb.js';
import initDocumentData from './seeders/index.js';
// import checkConnect from './utils/checkConnect.js';

initDocumentData();
// checkConnect.checkOverload();

/* init MQTT */
import { clientMQTT } from './configs/init.mqtt.js';
clientMQTT.on('connect', () => {
    logger.log('MQTT client connected');
});

/* init router */
import router from './routers/index.js';

app.use('/', router);

/* handle error */

app.use((req, res, next) => {
    const error = new Error('Not Found!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;

    const resMessage = `${statusCode} - ${
        Date.now() - error.now
    }ms - Response:: ${JSON.stringify(error)}`;
    logger.error(resMessage, [
        req.path,
        { requestId: req.requestId },
        { message: error.message },
    ]);

    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        stack: error.stack,
        message: error.message || 'Interval Server Error',
    });
});

export default app;
