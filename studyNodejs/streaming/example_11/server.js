// main.js (Electron main process)
const { spawn } = require('child_process');

const ffmpeg = spawn('ffmpeg', [
    '-i',
    'rtsp://192.168.1.100:554',
    '-f',
    'mjpeg',
    '-q:v',
    '5',
    'pipe:1'
]);

const express = require('express');
const app = express();

app.get('/camera', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'multipart/x-mixed-replace; boundary=frame'
    });
    ffmpeg.stdout.pipe(res);
});

app.listen(8080, () =>
    console.log('Camera stream on http://localhost:8080/camera')
);
