import { encode } from './encode.min.js';

const objectData = {
    device: 'ESO',
    action: 'ON',
    attributes: {
        dimming: 100,
        schedules: [
            {
                Type: 'Hourly',
                Everyday: '00:01:00',
                Action: 'Relay On',
                Dimming: 15,
            },
        ],
    },
};

console.log(encode(objectData));
