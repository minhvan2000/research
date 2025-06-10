'use strict';

import { Schema } from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo
const groupSchema = new Schema(
    {
        parentId: {
            type: Schema.Types.ObjectId,
            ref: 'groups',
        },
        tenantId: {
            type: Schema.Types.ObjectId,
            ref: 'tenants',
        },
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        path: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        type: {
            type: String,
            required: true,
            enum: ['GENERAL', 'RSO36', 'ESO', 'RSO18'],
        },
        shortDescription: {
            type: String,
            default: '',
        },
        isLocalMap: {
            type: Boolean,
            default: false,
        },
        imageMap: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

groupSchema.virtual('devices', {
    ref: 'devices', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'groupId', // is equal to `foreignField`
    count: true,
    match: { isDelete: { $ne: true } },
});

groupSchema.index({ name: 'text', path: 'text' });

//Export the schema
export default groupSchema;
