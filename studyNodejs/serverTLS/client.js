'use strict';
// Assumes an echo server that is listening on port 8000.
const tls = require('node:tls');
const fs = require('node:fs');

const options = {
    // Necessary only if the server requires client certificate authentication.
    key: fs.readFileSync('ryans-key.pem'),
    cert: fs.readFileSync('ryans-cert.pem'),

    // Necessary only if the server uses a self-signed certificate.
    ca: [fs.readFileSync('ryans-cert.pem')],

    // Necessary only if the server's cert isn't for "localhost".
    checkServerIdentity: () => {
        return null;
    },
};

const socket = tls.connect(8000, options, () => {
    console.log(
        'client connected',
        socket.authorized ? 'authorized' : 'unauthorized'
    );
    process.stdin.pipe(socket);
    process.stdin.resume();
});
socket.setEncoding('utf8');
socket.on('data', (data) => {
    console.log(data);
});
socket.on('end', () => {
    console.log('server ends connection');
});
