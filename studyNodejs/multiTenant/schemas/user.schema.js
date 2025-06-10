'use strict';

import { Schema } from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            select: false,
            required: true,
        },
        tenantId: {
            type: Schema.Types.ObjectId,
            ref: 'tenants',
            required: true,
        },
        roleId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'roles',
        },
        profile: {
            type: String,
            enum: ['admin', 'user', 'customer'],
        },
        phoneNumber: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            type: String,
        },
        avatar: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            default: 'unknown',
            enum: ['unknown', 'registered', 'confirmed'],
            required: true,
        },
        mode: {
            type: String,
            enum: ['individuals', 'businesses'],
            required: true,
        },
        lastedAccess: {
            type: Date,
            default: Date.now(),
        },
        isDelete: {
            type: Boolean,
            default: false,
        },
        deletedAt: {
            type: Date,
        },
        tokenVerify: {
            type: String,
            trim: true,
        },
        tokenVerifyExpire: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.index({ fullName: 'text', email: 'text' });

userSchema.index(
    { createdAt: 1 },
    {
        name: 'TTL_Unknown',
        partialFilterExpression: { status: 'unknown' },
        expireAfterSeconds: 86400, // expire after a day
    }
);

userSchema.index(
    { createdAt: 1 },
    {
        name: 'TTL_Registered',
        partialFilterExpression: { status: 'registered' },
        expireAfterSeconds: 2592000, // expire after a month
    }
);

//Export the model
export default userSchema;
