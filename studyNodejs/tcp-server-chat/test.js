import net from 'node:net';

const client = new net.Socket();
client.connect(8888, '192.168.30.213', function () {
    console.log('Connected');
    console.log('send data');

    let i = 1;

    setInterval(() => {
        client.write(
            `50450000F49AA47B,5252,6900056842221400000000600041000E7401000000600041000E7402000000600041000E7403000000600041000E7404000000600041000E7405000000600041000E7406000000600041000E7407000000600041000E7408000000600041000E7409000000600041000E740A000000600041000E740B000000600041000E74;`
        );
        i++;
    }, 5000);
});

client.on('data', function (data) {
    console.log('Received: ' + data);
    // client.destroy(); // kill client after server's response
});

client.on('close', function () {
    console.log('Connection closed');
});
