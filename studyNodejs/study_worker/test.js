const { Worker, isMainThread, workerData } = require('worker_threads');
const mqtt = require('mqtt');

const THREAD_COUNT = 32;

const limited = 4800;

const splitAt = limited / THREAD_COUNT;

const listClient = {};
let threadId = 1;

for (let index = 0; index < limited; index++) {
    const clientId = `Client_${Math.ceil(Math.random() * 1_000_000)}`;

    const client = mqtt.connect('mqtts://51.15.134.148:8883', {
        clientId: `${clientId}`,
        username: 'load+balance',
        password: '渡渡鸟镜像同步站',
        rejectUnauthorized: false,
        keepalive: 0,
        clean: true,
        reconnectPeriod: 10,
    });

    if (!listClient[`thread${threadId}`]?.length) {
        listClient[`thread${threadId}`] = [];
    }

    if (listClient[`thread${threadId}`].length === splitAt) {
        console.log(listClient[`thread${threadId}`].length);
        ++threadId;
        listClient[`thread${threadId}`] = [];
    }

    listClient[`thread${threadId}`].push(client);
}

console.log(Object.keys(listClient).length);

if (isMainThread) {
    return new Promise(function (resolve, reject) {
        console.log('hello');
        for (let i = 0; i < THREAD_COUNT; i++) {
            console.log(listClient[`thread${i + 1}`]);

            new Worker(__filename, {
                workerData: listClient[`thread${i + 1}`],
            });
        }
        resolve();
    });
} else {
    setInterval(async () => {
        let i = 0;
        while (true) {
            const connClient = workerData[i];
            if (connClient) {
                await connClient.publishAsync(
                    'load/balance',
                    '{"fcnt":999,"nodeId":"000000016112111","address":"000","payload":"0003DD0CC2D803',
                    { qos: 1, retain: false }
                );
            } else {
                connClient.reconnect();
            }

            i++;

            if (i === 150) {
                break;
            }
        }
    }, 40);
}
