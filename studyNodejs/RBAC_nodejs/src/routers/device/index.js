'use strict';

import { Router } from 'express';
import asyncHandler from '../../middleware/asyncHandler.middleware.js';
import { authentication } from '../../middleware/authentication.middleware.js';
import deviceController from '../../controllers/device.controller.js';
import { getUserValidator } from '../../validators/user.validator.js';
import validate from '../../validators/index.js';
import {
    idMongoValidator,
    keySearchValidator,
    queryFilterValidator,
} from '../../validators/base.validator.js';

const router = Router();

router.use(authentication);

//Create a device
router.post('/', asyncHandler(deviceController.create));

//Get a list search devices
router.get(
    '/search/:keySearch',
    keySearchValidator(),
    validate,
    asyncHandler(deviceController.getListSearch)
);

//Get a single device
router.get('/:id', asyncHandler(deviceController.getById));

//Get all devices
router.get(
    '/',
    queryFilterValidator(),
    validate,
    asyncHandler(deviceController.getAll)
);

//Update/Soft Delete all devices
router.patch(
    '/:id',
    idMongoValidator(),
    validate,
    asyncHandler(deviceController.update)
);

export default router;
