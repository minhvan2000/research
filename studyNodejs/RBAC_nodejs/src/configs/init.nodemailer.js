'use strict';

import nodemailer from 'nodemailer';
import environmentConfig from './environment.config.js';

const {
    mailerConfig: { host, port, user, pass, ciphers },
} = environmentConfig;

const transporter = nodemailer.createTransport({
    host: host,
    port: port,
    secure: false, // use TLS
    auth: {
        user: user,
        pass: pass,
    },
    // tls: {
    //     ciphers: ciphers,
    // },
});

export default transporter;
