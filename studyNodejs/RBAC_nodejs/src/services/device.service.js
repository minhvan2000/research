'use strict';

import { BadRequestError } from '../core/error.response.js';
import deviceModel from '../models/device.model.js';
import roleModel from '../models/role.model.js';
import userModel from '../models/user.model.js';
import {
    convertToObjectId,
    getInfoData,
    getSelectData,
    getSort,
    removeFieldSecret,
    removeNestedObject,
    removeUndefinedObject,
    unGetSelectData,
} from '../utils/index.js';

class DeviceService {
    create = async ({ name, serial, userId, latitude, longitude }) => {
        const foundDevice = await deviceModel.findOne({ serial }).lean().exec();

        if (foundDevice) {
            throw new BadRequestError('Device already exists!');
        }

        const newDevice = await deviceModel
            .create({
                name,
                serial,
                userId,
                latitude,
                longitude,
            })
            .populate('userId', 'name -_id');

        return getInfoData({
            fields: ['createdAt', 'updatedAt', '__v'],
            object: newDevice,
        });
    };

    getListSearch = async ({ keySearch, userId }) => {
        const regexSearch = new RegExp(keySearch);

        const queryOption = {
            $and: [
                {
                    $text: { $search: regexSearch },
                },
                { isDelete: { $ne: true } },
            ],
        };
        if (userId) {
            queryOption.$and.push({ userId: convertToObjectId(userId) });
        }

        return await userModel
            .find(queryOption)
            .populate('userId', 'fullName -_id')
            .sort({ score: { $meta: 'textScore' } })
            .lean()
            .exec();
    };

    getById = async ({ id, userId }) => {
        const foundUser = await userModel
            .findOne({
                _id: convertToObjectId(id),
                userId: convertToObjectId(userId),
                isDelete: { $ne: true },
            })
            .populate('userId', 'fullName -_id')
            .lean();

        if (!foundUser) {
            throw new BadRequestError('Device invalid');
        }

        return {
            ...getInfoData({
                fields: [
                    '_id',
                    'name',
                    'serial',
                    'thumb',
                    'latitude',
                    'longitude',
                    'status',
                ],
                object: foundUser,
            }),
            user: foundUser.userId.name,
        };
    };

    getAll = async ({
        limit = 20,
        page = 1,
        sort = 'createdAt',
        name,
        serial,
        selects = ['name', 'serial', 'latitude', 'longitude'],
        userId,
    }) => {
        const skip = (page - 1) * limit;
        const sortBy = getSort(sort);
        const match = {
            userId: convertToObjectId(userId),
            isDelete: { $ne: true },
        };

        if (serial) {
            match.serial = serial;
        }

        if (name) {
            match.name = name;
        }

        const arraySelect = removeFieldSecret(selects, 'user.');

        arraySelect.push('user.fullName');

        const options = [
            { $match: match },
            {
                $lookup: {
                    from: 'Users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            { $unwind: '$user' },
            {
                $project: getSelectData(arraySelect),
            },
            { $sort: sortBy },
        ];

        if (page) {
            options.push(
                {
                    $facet: {
                        totalData: [{ $count: 'total' }],
                        listData: [{ $skip: skip }, { $limit: limit }],
                    },
                },
                { $unwind: '$totalData' },
                { $set: { totalData: '$totalData.total' } }
            );
        }

        return await deviceModel.aggregate(options).allowDiskUse(true).exec();
    };

    update = async (deviceId, payload) => {
        const foundDevice = await this.getById(deviceId);

        if (!foundDevice) {
            throw new BadRequestError('User invalid!');
        }

        const objectParams = removeUndefinedObject(payload);

        if (objectParams.isDelete) {
            objectParams.deletedAt = Date.now();
        } else {
            objectParams.deletedAt = '';
        }

        const updatedDelete = await deviceModel
            .findByIdAndUpdate(deviceId, removeNestedObject(objectParams), {
                new: true,
            })
            .populate('userId', 'fullName -_id')
            .select(unGetSelectData(['createdAt', 'updatedAt', '__v']));
        return updatedDelete;
    };
}

export default new DeviceService();
