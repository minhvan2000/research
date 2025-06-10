let { SerialPort, ReadlineParser } = require('serialport'); // include the serialport library

SerialPort.list().then(
    (ports) => ports.forEach((port) => console.log(port.path)),
    (err) => console.log(err)
);

// var name = process.argv[2];

// // console.log(name);
// // console.log('Hello, and welcome to node, ' + name);

// let portName = process.argv[2]; // get the port name from the command line

// // if they didn't give a port name, tell them so, then quit:
// if (!portName) {
//     // list serial ports:
//     giveInstructions();
// }

// var myPort = new SerialPort({ path: name, baudRate: 921600 }); // open the port

// var parser = new ReadlineParser(); // make instance of Readline parser
// myPort.pipe(parser); // pipe the serial stream to the parser

// // these are the definitions for the serial events:
// myPort.on('open', showPortOpen); // called when the serial port opens
// myPort.on('close', showPortClose); // called when the serial port closes
// myPort.on('error', showError); // called when there's an error with the serial port
// parser.on('data', readSerialData); // called when there's new data incoming

// // these are the functions called when the serial events occur:
// function showPortOpen() {
//     console.log('port open. Data rate: ' + myPort.baudRate);

//     myPort.write('AT+QIACT?\r');
// }

// function readSerialData(data) {
//     console.log(data);
// }

// function showPortClose() {
//     console.log('port closed.');
// }

// function showError(error) {
//     console.log('Serial port error: ' + error);
// }

// function giveInstructions() {
//     console.log('you did not give a port name');
//     console.log('To run this properly, type \n');
//     console.log('node serial-in.js portname\n');
//     console.log('run the listPorts script to get a list of ports.\n');
//     process.exit(0);
// }
