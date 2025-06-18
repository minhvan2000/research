'use strict';

import asyncHandler from '../middleware/asyncHandler.middleware.js';
import roleModel from '../models/role.model.js';
import loggerLog from '../utils/logger.log.js';
import importDataRole from './role.seeder.js';

const initDocumentData = asyncHandler(async () => {
    loggerLog.log('=============== Run Seeder ===============', []);

    const dataRole = await roleModel.find().lean().exec();
    if (dataRole.length == 0) {
        importDataRole();

        loggerLog.log(
            '=============== Complete Init Document Data ===============',
            []
        );
    }
    return;
});

export default initDocumentData;
