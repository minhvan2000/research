'use strict';

import { CreatedResponse, SuccessResponse } from '../core/success.response.js';

import deviceService from '../services/device.service.js';
import loggerLog from '../utils/logger.log.js';

const addUserIdForUser = (objectRequest, objectUser) => {
    const dataRequest = { ...objectRequest };

    if (objectUser.role === 'User') {
        dataRequest.userId = objectUser.userId;
    }

    return dataRequest;
};

class DeviceController {
    create = async (req, res, next) => {
        if (req.user.role === 'User') {
            req.body.userId = req.user.userId;
        }

        loggerLog.log(`[P]::Create a device::${req.method}`, [
            req.path,
            { requestId: req.requestId },
            { ...req.body, user: req.user.userId },
        ]);

        new CreatedResponse({
            message: 'Create a device successful',
            metadata: await deviceService.create({
                ...req.body,
            }),
        }).send(res);
    };

    getListSearch = async (req, res, next) => {
        loggerLog.log(`[G]::Get a list search devices::${req.method}`, [
            req.path,
            { requestId: req.requestId },
            req.params,
        ]);

        new SuccessResponse({
            message: 'Get a list search devices successful',
            metadata: await deviceService.getListSearch(
                addUserIdForUser(req.params, req.user)
            ),
        }).send(res);
    };

    getById = async (req, res, next) => {
        loggerLog.log(`[G]::Get a single device::${req.method}`, [
            req.path,
            { requestId: req.requestId },
            req.params,
        ]);
        new SuccessResponse({
            message: 'Get a single device successful',
            metadata: await deviceService.getById(
                addUserIdForUser(req.params, req.user)
            ),
        }).send(res);
    };

    getAll = async (req, res, next) => {
        loggerLog.log(`[G]::Get all devices::${req.method}`, [
            req.path,
            { requestId: req.requestId },
            req.query,
        ]);
        new SuccessResponse({
            message: 'Get all devices successful',
            metadata: await deviceService.getAll(
                addUserIdForUser(req.query, req.user)
            ),
        }).send(res);
    };

    update = async (req, res, next) => {
        loggerLog.log(`[P]::Update a single device::${req.method}`, [
            req.path,
            { requestId: req.requestId },
            { ...req.params, ...req.body },
        ]);

        new SuccessResponse({
            message: 'Update a single device successful',
            metadata: await deviceService.update(
                req.params.id,
                addUserIdForUser(req.body, req.user)
            ),
        }).send(res);
    };
}

export default new DeviceController();
