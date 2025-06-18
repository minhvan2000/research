'use strict';

import { Router } from 'express';
import asyncHandler from '../../middleware/asyncHandler.middleware.js';
import {
    authentication,
    authorization,
} from '../../middleware/authentication.middleware.js';
import userController from '../../controllers/user.controller.js';
import { getUserValidator } from '../../validators/user.validator.js';
import validate from '../../validators/index.js';
import {
    idMongoValidator,
    keySearchValidator,
    queryFilterValidator,
} from '../../validators/base.validator.js';

const router = Router();

router.use(authentication);

//Get a single user
router.get(
    '/:id',
    getUserValidator(),
    validate,
    asyncHandler(userController.getById)
);

router.use(authorization('Admin'));

//Get a list search users
router.get(
    '/search/:keySearch',
    keySearchValidator(),
    validate,
    asyncHandler(userController.getListSearch)
);

//Get all users
router.get(
    '/',
    queryFilterValidator(),
    validate,
    asyncHandler(userController.getAll)
);

router.patch(
    '/:id',
    idMongoValidator(),
    validate,
    asyncHandler(userController.update)
);

export default router;
