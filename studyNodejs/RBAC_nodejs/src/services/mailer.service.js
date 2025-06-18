'use strict';

import hbs from 'nodemailer-express-handlebars';
import transporter from '../configs/init.nodemailer.js';

import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendMail = async (option) => {
    try {
        const handlebarsOptions = {
            viewEngine: {
                extName: '.hbs',
                partialsDir: path.resolve(__dirname, '../templates'),
                layoutsDir: path.resolve(__dirname, '../templates'),
                defaultLayout: '',
            },
            viewPath: path.resolve(__dirname, '../templates'),
        };

        transporter.use('compile', hbs(handlebarsOptions));
        transporter.sendMail(option, (err, info) => {
            if (err) {
                return console.log(err);
            }
            console.log('Message sent::', info.messageId);
        });
    } catch (error) {
        console.error('error send Email::', error);
        return error;
    }
};

export default sendMail;
