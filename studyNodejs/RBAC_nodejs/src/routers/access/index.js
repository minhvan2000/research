'use strict';

import { Router } from 'express';
import asyncHandler from '../../middleware/asyncHandler.middleware.js';
import accessController from '../../controllers/access.controller.js';
import validate from '../../validators/index.js';
import {
    loginValidator,
    registerValidator,
} from '../../validators/access.validator.js';

const router = Router();

//Register
router.post(
    '/register',
    registerValidator(),
    validate,
    asyncHandler(accessController.register)
);

router.post(
    '/login',
    loginValidator(),
    validate,
    asyncHandler(accessController.login)
);

//Forgot Password
router.post('/forgot-password', asyncHandler(accessController.forgotPassword));

// //Change Password
// router.post(
//     '/auth/reset-password/:tokenReset',
//     asyncHandler(accessController.resetPassword)
// );

// //Authentication
// router.use(authentication);

// //Logout
// router.post('/auth/logout', asyncHandler(accessController.logout));
// router.post(
//     '/auth/handler-refresh-token',
//     asyncHandler(accessController.handlerRefreshToken)
// );

export default router;
