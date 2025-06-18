import { Queue } from 'bullmq';
import environmentConfig from './environment.config.js';

const {
    redisConfig: { host, port },
} = environmentConfig;

const messageQueue = new Queue('messageQueue', {
    connection: {
        host: host,
        port: port,
    },
});

export default messageQueue;
