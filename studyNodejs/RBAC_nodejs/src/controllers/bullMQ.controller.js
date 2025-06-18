import { Worker } from 'bullmq';
import loggerLog from '../utils/logger.log.js';
import environmentConfig from '../configs/environment.config.js';

const {
    redisConfig: { host, port },
} = environmentConfig;

const processMessage = async (job) => {
    const { topic, message } = job.data;
    // Log the message
    loggerLog.log(`Processing message on topic ${topic}: ${message}`);
};

const worker = new Worker(
    'messageQueue',
    async (job) => {
        await processMessage(job);
    },
    {
        connection: {
            host: host,
            port: port,
        },
    }
);

worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed!`);
});

worker.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed with error: ${err.message}`);
});
