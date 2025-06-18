'use strict';

import { SuccessResponse } from '../core/success.response.js';

import userService from '../services/user.service.js';
import loggerLog from '../utils/logger.log.js';

class UserController {
    getListSearch = async (req, res, next) => {
        loggerLog.log(`[G]::Get a list search users::${req.method}`, [
            req.path,
            { requestId: req.requestId },
            req.params,
        ]);
        new SuccessResponse({
            message: 'Get a list search users Successful',
            metadata: await userService.getListSearch(req.params),
        }).send(res);
    };

    getById = async (req, res, next) => {
        loggerLog.log(`[G]::Get a single user::${req.method}`, [
            req.path,
            { requestId: req.requestId },
            req.params,
        ]);
        new SuccessResponse({
            message: 'Get a single user successful',
            metadata: await userService.getById(req.params.id),
        }).send(res);
    };

    getAll = async (req, res, next) => {
        loggerLog.log(`[G]::Get all users::${req.method}`, [
            req.path,
            { requestId: req.requestId },
            req.query,
        ]);
        new SuccessResponse({
            message: 'Get all users successful',
            metadata: await userService.getAll(req.query),
        }).send(res);
    };

    update = async (req, res, next) => {
        loggerLog.log(`[P]::Update a single user::${req.method}`, [
            req.path,
            { requestId: req.requestId },
            { ...req.params, ...req.body },
        ]);

        new SuccessResponse({
            message: 'Update a single user successful',
            metadata: await userService.update(req.params.id, {
                ...req.body,
            }),
        }).send(res);
    };
}

export default new UserController();
