'use strict';

import { connections } from 'mongoose';
import { cpus } from 'os';
import { memoryUsage as _memoryUsage } from 'process';

const _SECONDS = 5000;

/* Count connect */
const countConnect = () => {
    const numConnection = connections.length;
    console.log(`Number of connections: ${numConnection}`);
};

/* Check overload */
const checkOverload = () => {
    setInterval(() => {
        const numConnection = connections.length;
        const numCores = cpus().length;
        const memoryUsage = _memoryUsage().rss;

        //Example maximum number of connections based on number of cores
        const maxConnections = numCores * 4;

        console.log(`Active connections:: ${numConnection}`);
        console.log(`Memory usage:: ${memoryUsage / 1024 / 1024} MB`);

        if (numConnection > maxConnections) {
            console.log(`Connection overload detected!`);
        }
    }, _SECONDS); // Monitor every 5 second
};

export { countConnect, checkOverload };
