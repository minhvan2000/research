import mqtt from 'mqtt';

import { readFileSync } from 'node:fs';
import path from 'node:path';

const client = mqtt.connect('mqtts://51.15.134.148:8883', {
    clientId: 'LTE-863593052821923',
    rejectUnauthorized: false,
    username: 'json+device',
    password: 'password',
    keepalive: 0,
    clean: false, // receive QoS 1 and 2 messages while offline
}); // create a client

const clientMQTT = mqtt.connect(connectString, optionsMQTT);

//OFFLINE
//ONLINE

//'{"fcnt":999,"nodeId":"000000016112111","address":"000","payload":"09000A000007111203000200007C3D","deviceID":"000000016112000","iccid":"89882280666087539122","type":"LTE-M","lte network":{"lac":"00","ci":"0000","rssi":-140,"rsrp":-140,"sinr":-140,"rsrq":-140,"bars":5},"timestamp":1734397104,"messageId":7541}'

//'{"nodeId":"000000016112111","deviceID":"000000016112000","status":"ONLINE","firmwareVersion":"1.0.0","hardwareVersion":"2.0.0"}'

client.on('connect', () => {
    console.log(`connectionMQTT - Connection status: connected`);
    let i = 0;
    let j = 0;

    setInterval(() => {
        i++;
        client.publish(
            'dfmhub',
            `{"fcnt":${i},"payload":"0D03080C8101000C8201000909","deviceID":"863593052821923","iccid":"89882280666087539122","type":"LTE-M","lte network":{"lac":"00","ci":"0000","rssi":-140,"rsrp":-140,"sinr":-140,"rsrq":-140,"bars":5},"timestamp":${Date.now()},"messageId":${i}}`,
            { qos: 1, retain: false },
            (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Done call mqtt pubic');
                }
            }
        );
    }, 30000);

    setInterval(() => {
        j++;
        client.publish(
            'dfmhub',
            `{"fcnt":${j},"payload":"0D036F0CC26C03FF0006005103FF0006010003FF0006025103FF0006030003FF0006045103FF0006050003FF0006065103FF0006070003FF0006085103FF0006090003FF00060A5103FF00060B0003FF00060C5103FF00060D0003FF00060E5103FF00060F0003FF0006105103FF00061100EED8","deviceID":"863593052821923","iccid":"89882280666087539122","type":"LTE-M","lte network":{"lac":"00","ci":"0000","rssi":-140,"rsrp":-140,"sinr":-140,"rsrq":-140,"bars":5},"timestamp":${Date.now()},"messageId":${j}}`,
            { qos: 1, retain: false },
            (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Done call mqtt pubic');
                }
            }
        );
    }, 32000);

    setInterval(() => {
        j++;
        client.publish(
            'dfmhub',
            `{"fcnt":${j},"payload":"0D036F0CC26C03FF0006125103FF0006130003FF0006145103FF0006150003FF0006165103FF0006170003FF0006185103FF0006190003FF00061A5103FF00061B0003FF00061C5103FF00061D0003FF00061E5103FF00061F0003FF0006205103FF0006210003FF0006225103FF00062300473C","deviceID":"863593052821923","iccid":"89882280666087539122","type":"LTE-M","lte network":{"lac":"00","ci":"0000","rssi":-140,"rsrp":-140,"sinr":-140,"rsrq":-140,"bars":5},"timestamp":${Date.now()},"messageId":${j}}`,
            { qos: 1, retain: false },
            (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Done call mqtt pubic');
                }
            }
        );
    }, 34000);
});
