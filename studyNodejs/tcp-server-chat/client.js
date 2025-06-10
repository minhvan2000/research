const http = require('http');
const net = require('net');

// Create HTTP server to handle browser requests
const httpServer = http.createServer((req, res) => {
    // Create a TCP client to connect to the TCP server
    const client = new net.Socket();

    const request = `GET /index.html HTTP/1.1\r\nHost: 192.168.30.213:3333\r\n`;

    client.connect(8888, 'api.2ifactory.com', () => {
        client.write(
            '50450000F49AA47B,5252,6900056842221400000000600041000E7401000000600041000E7402000000600041000E7403000000600041000E7404000000600041000E7405000000600041000E7406000000600041000E7407000000600041000E7408000000600041000E7409000000600041000E740A000000600041000E740B000000600041000E74'
        );
        console.log('Connected to TCP server');
    });

    client.on('data', (data) => {
        console.log(data.toString());
        // Send TCP server's response to the browser
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data.toString());
        // client.destroy(); // Close TCP connection
    });

    client.on('close', () => {
        console.log('Connection to TCP server closed');
    });

    client.on('error', (err) => {
        console.error('Error:', err);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('Error connecting to TCP server');
    });
});

httpServer.listen(4000, () => {
    console.log('HTTP server running on port 4000');
});
