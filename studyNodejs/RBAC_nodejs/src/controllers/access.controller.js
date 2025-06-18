'use strict';

import {
    CreatedResponse,
    OKResponse,
    SuccessResponse,
} from '../core/success.response.js';

import accessService from '../services/access.service.js';
import loggerLog from '../utils/logger.log.js';

class AccessController {
    register = async (req, res, next) => {
        loggerLog.log(`[P]::register::${req.method}`, [
            req.path,
            { requestId: req.requestId },
            req.body,
        ]);
        new CreatedResponse({
            message: 'Register Successful',
            metadata: await accessService.register(req.body),
        }).send(res);
    };

    login = async (req, res, next) => {
        loggerLog.log(`[P]::login::${req.method}`, [
            req.path,
            { requestId: req.requestId },
            req.body,
        ]);
        new OKResponse({
            message: 'Login Successful',
            metadata: await accessService.login(req.body),
        }).send(res);
    };

    forgotPassword = async (req, res, next) => {
        loggerLog.log(`[P]::Forgot Password::${req.method}`, [
            req.path,
            { requestId: req.requestId },
            req.body,
        ]);
        new SuccessResponse({
            message: 'Forgot Password',
            metadata: await accessService.forgotPassword(req.body),
        }).send(res);
    };
}

export default new AccessController();
