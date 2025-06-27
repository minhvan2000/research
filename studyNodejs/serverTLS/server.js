'use strict';

const tls = require('node:tls');
const fs = require('node:fs');

const options = {
    key: fs.readFileSync('ryans-key.pem'),
    cert: fs.readFileSync('ryans-cert.pem'),

    // This is necessary only if using client certificate authentication.
    requestCert: true,

    // This is necessary only if the client uses a self-signed certificate.
    ca: [fs.readFileSync('ryans-cert.pem')],
};

const server = tls.createServer(options, (socket) => {
    console.log(
        'server connected',
        socket.authorized ? 'authorized' : 'unauthorized'
    );
    socket.write('welcome!\n');
    socket.setEncoding('utf8');
    socket.pipe(socket);
});
server.listen(8000, () => {
    console.log('server bound');
    // console.log(tls.getCiphers());
});
