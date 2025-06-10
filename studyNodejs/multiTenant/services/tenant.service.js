'use strict';

import { addATenantRepo } from '../repositories/tenant.repo.js';
import { addATenantUserRepo } from '../repositories/tenantUser.repo.js';
import { setCacheConnection } from '../utils/lruCacheManager.js';

import { addAUserRepo } from '../repositories/user.repo.js';
import { initTenantDBConnection } from '../utils/initDBConnection.js';

const addATenantService = async (dbConn, tenantData) => {
    console.log(dbConn);

    const session = await dbConn.startSession();
    session.startTransaction();
    try {
        const data = await addATenantRepo(dbConn, { ...tenantData }, session);

        let userData;
        if (data._id) {
            userData = await addATenantUserRepo(
                dbConn,
                {
                    tenantId: data._id,
                    email: tenantData.email,
                },
                session
            );

            const tenantDbConnection = await initTenantDBConnection(
                data.dbUri,
                data.name
            );

            await addAUserRepo(
                tenantDbConnection,
                {
                    _id: userData._id,
                    email: tenantData.email,
                },
                session
            );

            await session.commitTransaction();
            session.endSession();

            setCacheConnection(data._id.toString(), tenantDbConnection);
        }

        return {
            success: true,
            statusCode: 201,
            message: `Tenant added successfully`,
            responseObject: { tenantId: data._id, userId: userData?._id },
        };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

export { addATenantService };
