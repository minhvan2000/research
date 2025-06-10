'use strict';

import { Schema } from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo
const deviceSchema = new Schema(
    {
        deviceId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        tenantId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'tenants',
        },
        groupId: {
            type: Schema.Types.ObjectId,
            default: '000000000000000000000000',
            required: true,
            ref: 'groups',
        },
        tagId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'tags',
        },
        name: {
            type: String,
            required: true,
        },
        thumb: {
            type: String,
        },
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
        firmwareVer: {
            type: String,
            default: 'v0.0.1',
        },
        hardwareVer: {
            type: String,
            default: 'v0.0.1',
        },
        description: {
            type: String,
        },
        manufacture: {
            type: String,
            trim: true,
        },
        type: {
            type: String,
            required: true,
            enum: ['RSO36', 'ESO', 'RSO18'],
        },
        isDelete: {
            type: Boolean,
            default: false,
        },
        deletedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

deviceSchema.virtual('interfaces', {
    ref: 'interfaces', // The model to use
    localField: 'deviceId', // Find people where `localField`
    foreignField: 'deviceId', // is equal to `foreignField`
    justOne: true,
});

deviceSchema.virtual('features', {
    ref: 'features',
    localField: 'deviceId',
    foreignField: 'deviceId',
    justOne: true,
});

deviceSchema.virtual('messages', {
    ref: 'messages',
    localField: 'deviceId',
    foreignField: 'deviceId',
    justOne: true,
});

deviceSchema.virtual('positions', {
    ref: 'positions',
    localField: 'deviceId',
    foreignField: 'deviceId',
});

deviceSchema.index({ name: 'text', deviceId: 'text' });

//Export the schema
export default deviceSchema;
