import net from 'node:net';
import * as readline from 'node:readline/promises';
import { stdin as input } from 'node:process';
const rl = readline.createInterface({ input });

const client = net.createConnection({ port: 3333 }, () => {
    // 'connect' listener.
    console.log('connected to server!');
    client.write('world!\r\n');
    rl.on('line', (input) => {
        client.write(input);
    });
});

client.on('data', (data) => {
    console.log('data.toString()', data.toString());
});

client.on('end', () => {
    console.log('disconnected from server');
});
// '{"value":"09028F001B01010B01010200180100002A8000D077450040774500107A4500C0104500700D450010104500005D430080E94300001A430020E1440000E343000082440000994300809543000000C200002843000023430000000000C05E44004076440040574400B89C4566A97A43C3956B42CD06CB421F81B442C3237643C3A59F41000000005C6F264129DC1841C3E576418D76","fileName":"./compile_file/DFM/TestDST/deformater"}';
