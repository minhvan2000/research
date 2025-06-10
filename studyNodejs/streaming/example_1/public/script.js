const socket = io('/'); // Create our socket
const videoGrid = document.getElementById('video-grid'); // Find the Video-Grid element

const myPeer = new Peer(); // Creating a peer element which represents the current user
const myVideo = document.createElement('video'); // Create a new video tag to show our video
myVideo.muted = true; // Mute ourselves on our end so there is no feedback loop

console.log(navigator.webkitGetUserMedia);
console.log(navigator.mediaDevices);
console.log(navigator);

// Access the user's video and audio
if (navigator.mediaDevices) {
    navigator.mediaDevices
        .getUserMedia({
            video: true,
            audio: true,
        })
        .then((stream) => {
            console.log(stream);

            let mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'video/webm',
            });
            mediaRecorder.start(5000);
            mediaRecorder.ondataavailable = function (e) {
                // const blob = new Blob([e.data], {
                //     type: mediaRecorder.mimeType,
                // });

                // const audioURL = URL.createObjectURL(blob);

                // console.log(audioURL);

                // console.log(blob);
                socket.emit('emit-client', {
                    data: e.data,
                    steam: mediaRecorder.stream,
                });
            };
            addVideoStream(myVideo, stream); // Display our video to ourselves

            myPeer.on('call', (call) => {
                console.log(call);
                // When we join someone's room we will receive a call from them
                call.answer(stream); // Stream them our video/audio
                const video = document.createElement('video'); // Create a video tag for them
                call.on('stream', (userVideoStream) => {
                    console.log(userVideoStream);
                    // When we recieve their stream
                    addVideoStream(video, userVideoStream); // Display their video to ourselves
                });
            });

            socket.on('user-connected', (userId) => {
                // If a new user connect
                connectToNewUser(userId, stream);
            });
        });
} else {
    socket.on('client-on', function (msg) {
        let image = new Image();

        console.log({ data: msg.data });

        // console.log(btoa(String.fromCharCode(...new Uint8Array(msg.data))));

        const blob = new Blob([msg.data], {
            type: 'image/png',
        });

        const audioURL = URL.createObjectURL(blob);

        console.log(audioURL);

        console.log(blob);
    });
}

myPeer.on('open', (id) => {
    // When we first open the app, have us join a room
    socket.emit('join-room', ROOM_ID, id);
});

function connectToNewUser(userId, stream) {
    // This runs when someone joins our room
    const call = myPeer.call(userId, stream); // Call the user who just joined
    // Add their video
    const video = document.createElement('video');
    call.on('stream', (userVideoStream) => {
        addVideoStream(video, userVideoStream);
    });
    // If they leave, remove their video
    call.on('close', () => {
        video.remove();
    });
}

function addVideoStream(video, stream) {
    video.srcObject = stream;

    console.log(stream);

    video.addEventListener('loadedmetadata', () => {
        // Play the video as it loads
        video.play();
    });
    videoGrid.append(video); // Append video element to videoGrid
}
