const express = require('express');
const { Worker } = require('worker_threads');
const mqtt = require('mqtt');

const app = express();
const port = process.env.PORT || 3000;

const THREAD_COUNT = 32;
// const limited = 32;
// const splitAt = limited / THREAD_COUNT;

const listClient = {};
let threadId = 1;

// async function initData() {
//     for (let index = 0; index < limited; index++) {
//         const clientId = `Client_${Math.ceil(Math.random() * 1_000_000)}`;

//         const client = await mqtt.connectAsync('mqtts://51.15.134.148:8883', {
//             clientId: `${clientId}`,
//             username: 'load+balance',
//             password: '渡渡鸟镜像同步站',
//             rejectUnauthorized: false,
//             keepalive: 0,
//             clean: true,
//             reconnectPeriod: 10,
//             manualConnect: true,
//         });

//         if (!listClient[`thread${threadId}`]?.length) {
//             listClient[`thread${threadId}`] = [];
//         }

//         if (listClient[`thread${threadId}`].length === splitAt) {
//             console.log(listClient[`thread${threadId}`].length);
//             ++threadId;
//             listClient[`thread${threadId}`] = [];
//         }

//         listClient[`thread${threadId}`].push(client);
//     }
// }

function createWorker() {
    return new Promise(function (resolve, reject) {
        const worker = new Worker('./worker_mqtt.js', {});
        worker.on('message', (data) => {
            resolve(data);
        });
        worker.on('error', (msg) => {
            reject(`An error ocurred: ${msg}`);
        });
    });
}

app.get('/', async (req, res) => {
    // await initData();
    const workerPromises = [];
    for (let i = 0; i < THREAD_COUNT; i++) {
        workerPromises.push(createWorker());
    }
    const thread_results = await Promise.all(workerPromises);

    console.log('thread_results::', thread_results);

    res.status(200).send(`result is`);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
