'use strict';

import mongoose from 'mongoose';
import TenantSchema from '../schemas/tenant.schema.js';
import TenantUserSchema from '../schemas/tenantUser.schema.js';
import UserSchema from '../schemas/user.schema.js';

const clientOption = {
    socketTimeoutMS: 30000,
};

// Log MongoDB queries
mongoose.set('debug', true);

const initAdminDbConnection = async (DB_URL) => {
    try {
        const db = mongoose.createConnection(DB_URL, clientOption);

        db.on('error', (err) => console.log('Admin db error: ', err));

        db.once('open', () => {
            console.log('Admin client MongoDB Connection ok!');
        });

        db.model('tenants', TenantSchema);
        db.model('tenantUsers', TenantUserSchema);

        return db;
    } catch (error) {
        return error;
    }
};

const initTenantDBConnection = async (DB_URL, dbName) => {
    try {
        const db = mongoose.createConnection(DB_URL, clientOption);

        db.on('error', (err) =>
            console.log(`Tenant ${dbName} db error: `, err)
        );

        db.once('open', () => {
            console.log(
                `Tenant connection for ${dbName} MongoDB Connection ok!`
            );
        });

        db.model('users', UserSchema);

        return db;
    } catch (error) {
        return error;
    }
};
export { initAdminDbConnection, initTenantDBConnection };
