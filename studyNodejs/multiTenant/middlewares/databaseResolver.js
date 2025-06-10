'use strict';

import { getConnectionForTenant } from '../utils/connectionManager.js';
import { verifyJWT } from '../utils/misc.js';

export const databaseResolver = (req, _, next) => {
    const urlArr = req.url.split('/');

    // Skip database resolution for login route
    if (urlArr.includes('login')) return next();

    const token = req.headers.jwt;
    // Handle the logic for null checking and authorization
    const payloadData = verifyJWT(token);
    // Handle the expiry logic, etc.
    getConnectionForTenant(payloadData.tenantId).then((dbConnection) => {
        console.log(dbConnection);
        req.dbConnection = dbConnection;
    });

    next();
};
