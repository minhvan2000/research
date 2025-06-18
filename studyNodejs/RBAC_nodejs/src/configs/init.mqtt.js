'use strict';

import mqtt from 'mqtt';

import environmentConfig from './environment.config.js';
import mqttController from '../controllers/mqtt.controller.js';

const {
    mqttConfig: { host, port, username, password, client, listTopicSubscribe },
} = environmentConfig;

const connectString = `mqtts://${host}:${port}`;

const optionsMQTT = {
    clientId: client,
    rejectUnauthorized: false,
    username: username,
    password: password,
    keepalive: 0,
    clean: false, // receive QoS 1 and 2 messages while offline
};

const clientMQTT = mqtt.connect(connectString, optionsMQTT);

clientMQTT.on('connect', () => {
    console.log(`connectionMQTT - Connection status: connected`);

    clientMQTT.subscribe(listTopicSubscribe, { qos: 2 }, (err) => {
        if (err) {
            console.error('Failed to subscribe to topic:', err);
        } else {
            console.log(
                `Subscribed to topic: ${JSON.stringify(listTopicSubscribe)}`
            );
        }
    }); // Subscribe to all topics
});

clientMQTT.on('message', mqttController.onMessage);

export { clientMQTT };
