const { spawn } = require('child_process');

function startFFmpegProcess() {
    const cmd = spawn('ffmpeg', [
        '-rtsp_transport',
        'tcp',
        '-i',
        'rtsp://admin:iLotusLand2@25@192.168.1.100:554/snl/live/1/1', // input RTSP stream
        '-f',
        'mjpeg',
        '-vf',
        'fps=20',
        '-'
    ]);
    return cmd;
}
module.exports = {
    startFFmpegProcess
};
