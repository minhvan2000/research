const socket = io.connect('http://192.168.0.121:5000');

navigator.getUserMedia(
    { video: true, audio: true },
    (stream) => {
        const localVideo = document.getElementById('local-video');
        if (localVideo) {
            localVideo.srcObject = stream;
        }
    },
    (error) => {
        console.warn(error.message);
    }
);
