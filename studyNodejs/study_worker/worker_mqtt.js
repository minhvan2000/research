const { workerData, parentPort } = require('worker_threads');
const mqtt = require('mqtt');

const limited = 32;
const splitAt = limited / 32;

const listClient = [];

setInterval(async () => {
    let i = 0;
    while (true) {
        const clientId = `Client_${Math.ceil(Math.random() * 1_000_000)}`;

        if (!listClient[i]) {
            listClient[i] = await mqtt.connectAsync(
                'mqtts://51.15.134.148:8883',
                {
                    clientId: `${clientId}`,
                    username: 'load+balance',
                    password: '渡渡鸟镜像同步站',
                    rejectUnauthorized: false,
                    keepalive: 120,
                    clean: true,
                    reconnectPeriod: 10,
                }
            );
        }

        console.log(listClient[i].connected);

        await listClient[i].publishAsync('load/balance', 'hello');

        i++;

        if (i === splitAt) {
            break;
        }
    }
}, 40);
