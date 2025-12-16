import express from 'express';
import ModbusRTU from 'modbus-serial';
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/action', async (req, res) => {
    const { value, address } = req.body;

    const client = new ModbusRTU();
    await client.connectTCP('dcmzb-27-74-240-110.a.free.pinggy.link', {
        port: 41989
    });

    const values = Array(1).fill(value === 'ON');
    await client.writeCoils(address, values);
    client.close();

    res.send('[POST]::Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
