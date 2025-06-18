import net from 'node:net';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout } from 'node:process';

const rl = readline.createInterface({ input, stdout });

const sockets = [];
const portTCP = 9000;
const server = net.createServer();

const removeClient = (client) => {
    const indexClient = sockets.indexOf(client);
    sockets.splice(indexClient, 1);

    console.log(`Remaining clients: ${sockets.length}`);
};

const broadcast = (client, message) => {
    if (sockets.length === 0) {
        console.log('All clients left!');
        return;
    }

    const socket = sockets.find((val) => val.nickname == client);

    if (!socket) {
        console.log(`Client ${client} not found!`);
        return;
    }

    socket.write(message);
};

server.on('connection', (client) => {
    console.log('A new client connection');
    const numberTime = Date.now();

    client.nickname = 'Guest-' + numberTime;

    const clientName = client.nickname;

    console.log(`Client ${clientName} joined!`);
    sockets.push(client);
    console.log(`Total clients: ${sockets.length}`);

    client.on('data', async (message) => {
        console.log('Client::', clientName);
        console.log('messageBuffer::', message);
        console.log('messageUTF8::', message.toString('utf8'));
        console.log('\n');
        broadcast(clientName, message);
    });

    client.on('end', () => {
        console.log(clientName);
        const notification = `Client ${clientName} left!\n`;
        stdout.write(notification);

        removeClient(clientName);
    });

    client.write('Hello');
});

rl.on('line', (input) => {
    const splitInputs = input.split(':');
    const clientSend = splitInputs[0].trim();

    const socket = sockets.find((val) => val.nickname === clientSend);

    socket.write(splitInputs[1].trim());
});

server.on('error', (err) => {
    console.log('Error::', err);
    throw err;
});

server.listen({ port: portTCP }, () => {
    // This config for IPv6
    const info = server.address();
    console.log(
        `Server TCP License listening on ${info.family} [${info.address}]:${info.port}`
    );
});
