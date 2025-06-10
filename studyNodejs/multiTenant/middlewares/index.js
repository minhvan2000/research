'use strict';

import cors from 'cors';
import cookieParser from 'cookie-parser';

/* init middleware */
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
};

export default function (app) {
    app.use(cors(corsOptions));
    app.use(cookieParser());
}
