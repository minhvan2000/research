'use strict';

import asyncHandler from '../middleware/asyncHandler.middleware.js';
import roleModel from '../models/role.model.js';

const importDataRole = asyncHandler(async () => {
    const roles = await roleModel.create([{ name: 'Admin' }, { name: 'User' }]);

    console.log('Import Role Successfully!');
    return roles;
});

export default importDataRole;
