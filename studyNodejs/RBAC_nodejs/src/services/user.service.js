'use strict';

import { BadRequestError } from '../core/error.response.js';
import roleModel from '../models/role.model.js';
import userModel from '../models/user.model.js';
import {
    getInfoData,
    getSelectData,
    getSort,
    removeFieldSecret,
    removeNestedObject,
    removeUndefinedObject,
    unGetSelectData,
} from '../utils/index.js';

class UserService {
    getListSearch = async ({ keySearch }) => {
        const getRoleAdmin = await roleModel
            .findOne({ name: 'Admin' })
            .lean()
            .exec();

        const regexSearch = new RegExp(keySearch);
        return await userModel
            .find({
                $and: [
                    {
                        $text: { $search: regexSearch },
                    },
                    {
                        role: { $ne: getRoleAdmin._id },
                        isDelete: { $ne: true },
                    },
                ],
            })
            .populate('role', 'name -_id')
            .sort({ score: { $meta: 'textScore' } })
            .lean()
            .exec();
    };

    getById = async (userId) => {
        const foundUser = await userModel
            .findById(userId)
            .populate('role', 'name -_id')
            .lean();

        if (!foundUser) {
            throw new BadRequestError('User invalid');
        }

        return getInfoData({
            fields: [
                '_id',
                'fullName',
                'email',
                'phoneNumber',
                'address',
                'avatar',
                'role',
            ],
            object: foundUser,
        });
    };

    getAll = async ({
        limit = 20,
        page = 1,
        sort = 'createdAt',
        email,
        name,
        selects = ['email', 'name', 'phoneNumber', 'address', 'avatar'],
    }) => {
        const skip = (page - 1) * limit;
        const sortBy = getSort(sort);
        const match = { isDelete: { $ne: true } };

        if (email) {
            match.email = email;
        }

        if (name) {
            match.name = name;
        }

        const arraySelect = removeFieldSecret(selects, [
            'role._id',
            'role.name',
            'role.createdAt',
            'role.updatedAt',
            'role.__v',
            'password',
            'tokenResetPassword',
            'tokenResetPasswordExpire',
        ]);

        arraySelect.push('role.name');

        const options = [
            { $match: match },
            {
                $lookup: {
                    from: 'Roles',
                    localField: 'role',
                    foreignField: '_id',
                    as: 'role',
                },
            },
            { $unwind: '$role' },
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

        return await userModel.aggregate(options).allowDiskUse(true).exec();
    };

    update = async (userId, payload) => {
        const foundUser = await this.getById(userId);

        if (!foundUser) {
            throw new BadRequestError('User invalid!');
        }

        const objectParams = removeUndefinedObject(payload);

        if (foundUser.role.name === 'Admin' && objectParams.isDelete) {
            throw new BadRequestError("Don't delete the admin, please");
        }

        if (objectParams.isDelete) {
            objectParams.deletedAt = Date.now();
        } else {
            objectParams.deletedAt = '';
        }

        const updatedUser = await userModel
            .findByIdAndUpdate(userId, removeNestedObject(objectParams), {
                new: true,
            })
            .populate('role', 'name -_id')
            .select(
                unGetSelectData([
                    'password',
                    'tokenResetPassword',
                    'tokenResetPasswordExpire',
                    'createdAt',
                    'updatedAt',
                    '__v',
                ])
            );
        return updatedUser;
    };
}

export default new UserService();
