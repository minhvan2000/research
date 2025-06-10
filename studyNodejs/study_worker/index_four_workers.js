const express = require('express');
const { Worker } = require('worker_threads');

const app = express();
const port = process.env.PORT || 3000;
const THREAD_COUNT = 32;

app.get('/non-blocking/', (req, res) => {
    res.status(200).send('This page is non-blocking');
});

function createWorker() {
    return new Promise(function (resolve, reject) {
        const worker = new Worker('./four_workers.js', {
            workerData: { thread_count: THREAD_COUNT, objClient: {} },
        });
        worker.on('message', (data) => {
            resolve(data);
        });
        worker.on('error', (msg) => {
            reject(`An error ocurred: ${msg}`);
        });
    });
}

app.get('/blocking', async (req, res) => {
    const workerPromises = [];
    for (let i = 0; i < THREAD_COUNT; i++) {
        workerPromises.push(createWorker());
    }
    const thread_results = await Promise.all(workerPromises);
    let total = 0;
    console.log(thread_results);

    for (const thread of thread_results) {
        total += thread.counter;
    }

    res.status(200).send(`result is ${total}`);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
