'use strict';

import { Schema } from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo
const tenantSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
        },
        tax: {
            type: String,
            required: true,
            trim: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        dbURI: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            default: 'unknown',
            enum: ['unknown', 'confirmed'],
        },
        approvedBy: {
            type: Schema.Types.ObjectId,
            ref: 'users',
        },
        approvedAt: {
            type: Date,
        },
        updatedBy: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: '000000000000000000000000', // This is systemId
        },
        isDeleted: {
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

tenantSchema.index({ name: 'text', address: 'text' });

tenantSchema.index(
    { createdAt: 1 },
    {
        name: 'TTL_Unknown',
        partialFilterExpression: { status: 'unknown' },
        expireAfterSeconds: 2592000,
    }
);

//Export the schema
export default tenantSchema;
