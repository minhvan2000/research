'use strict';

const dev = {
    appConfig: {
        host: process.env.APP_HOST || 'localhost',
        port: process.env.APP_PORT || 8888,
    },
    dbConfig: {
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 27017,
        name: process.env.DB_NAME || 'BMSMonitorDB',
    },
    mailerConfig: {
        host: process.env.MAIL_HOST || 'smtp.gmail.com',
        port: process.env.MAIL_PORT || 587,
        user: process.env.MAIL_USER || 'admin@gmail.com',
        pass: process.env.MAIL_PASS || '**************',
        ciphers: process.env.MAIL_CIPHERS || 'SSLv3',
    },
    mqttConfig: {
        host: process.env.BROKER_HOST || 'localhost',
        port: process.env.BROKER_PORT || 8883,
        username: process.env.BROKER_USERNAME || 'superDev',
        password: process.env.BROKER_PASSWORD || 'superDev-password',
        client: process.env.CLIENT_NAME || 'Developer__Client',
        listTopicSubscribe: ['BSMMonitor_Topic'],
    },
    redisConfig: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379,
    },
};

const config = { dev };
const env = process.env.NODE_ENV || 'dev';

// console.log(config[env], env);
export default config[env];
