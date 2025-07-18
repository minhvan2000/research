import { connect } from 'node:http2';
import { readFileSync } from 'node:fs';
const client = connect('https://192.168.30.213:8443', {
    ca: readFileSync('../key/localIPRaw-cert.pem'),
});
client.on('error', (err) => console.error(err));

const req = client.request({ ':path': '/' });

req.on('response', (headers, flags) => {
    for (const name in headers) {
        console.log(`${name}: ${headers[name]}`);
    }
});

req.setEncoding('utf8');
let data = '';
req.on('data', (chunk) => {
    data += chunk;
});
req.on('end', () => {
    console.log(`\n${data}`);
    client.close();
});
req.end();
