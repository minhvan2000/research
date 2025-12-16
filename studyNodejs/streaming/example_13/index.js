import Onvif from 'node-onvif';

const device = new Onvif({
    xaddr: 'http://192.168.1.100:8000/onvif/device_service',
    user: 'admin',
    pass: '12345'
});

device.init().then(() => {
    console.log('Connected to camera!');
    console.log('Device information:', device.getInformation());
});
