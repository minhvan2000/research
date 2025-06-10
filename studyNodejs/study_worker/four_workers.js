const { workerData, parentPort } = require('worker_threads');

workerData.objClient.temp = 'temp';

let counter = 0;
for (let i = 0; i < 100_000_000_000 / workerData.thread_count; i++) {
    counter++;
}

workerData.objClient.counter = counter;

// 100 000 000 000
//  12 500 000 000
parentPort.postMessage(workerData.objClient);
