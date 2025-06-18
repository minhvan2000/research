'use strict';

import JWT from 'jsonwebtoken';

import { AuthFailureError, ForbiddenError } from '../core/error.response.js';
import asyncHandler from './asyncHandler.middleware.js';
import keyTokenModel from '../models/keyToken.model.js';
import userModel from '../models/user.model.js';
import { convertToObjectId } from '../utils/index.js';

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization',
    REFRESH_TOKEN: 'x-token-refresh',
};

const verifyJWT = async (token, keySecret) => {
    return JWT.verify(token, keySecret);
};

const authentication = asyncHandler(async (req, res, next) => {
    const userId = req.headers[HEADER.CLIENT_ID];
    if (!userId) {
        throw new AuthFailureError('Invalid Request');
    }

    const foundUser = await userModel
        .findOne({ _id: convertToObjectId(userId), isDelete: { $ne: true } })
        .populate('role', 'name -_id')
        .lean()
        .exec();

    if (!foundUser) {
        throw new ForbiddenError('Your request has been denied!');
    }

    const keyStore = await keyTokenModel.findById(userId).lean().exec();
    if (!keyStore) throw new ForbiddenError('Your request has been denied!');

    if (req.headers[HEADER.REFRESH_TOKEN]) {
        try {
            const refreshToken = req.headers[HEADER.REFRESH_TOKEN];
            const decodeUser = await verifyJWT(
                refreshToken,
                keyStore.privateKey
            );

            if (userId !== decodeUser.userId) {
                throw new AuthFailureError('Invalid User');
            }

            req.keyStore = keyStore;
            req.user = decodeUser; //{userId: decodeUser.userId, email: decodeUser.email}
            req.user.role = foundUser.role.name;
            req.refreshToken = refreshToken;
            return next();
        } catch (error) {
            throw error;
        }
    }

    const bearerAuthentication = req.headers[HEADER.AUTHORIZATION];
    if (!bearerAuthentication)
        throw new ForbiddenError('Your request has been denied!');

    const accessToken = bearerAuthentication.split(' ')[1];

    if (!accessToken) throw new AuthFailureError('Invalid Request');

    try {
        const decodeUser = await verifyJWT(accessToken, keyStore.publicKey);

        if (userId !== decodeUser.userId) {
            throw new AuthFailureError('Invalid User');
        }

        req.keyStore = keyStore;
        req.user = decodeUser;
        req.user.role = foundUser.role.name;
        return next();
    } catch (error) {
        if (error.message == 'jwt expired') {
            throw new AuthFailureError('Token was expired');
        } else {
            throw error;
        }
    }
});

const authorization = (role) => {
    return (req, res, next) => {
        if (!req.user.role) {
            return res.status(403).json({
                message: 'Permission denied',
            });
        }
        console.log('permission::', req.user.role);
        const validPermissions = req.user.role.includes(role);
        if (!validPermissions) {
            return res.status(403).json({
                message: 'Permission denied',
            });
        }

        return next();
    };
};

export { authentication, authorization };
