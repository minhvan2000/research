'use strict';

import { model, Schema } from 'mongoose'; // Erase if already required

const DOCUMENT_NAME = 'Device';
const COLLECTION_NAME = 'Devices';
// Declare the Schema of the Mongo model
const deviceSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        serial: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        thumb: {
            type: String,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            default: 'inactive',
            enum: ['active', 'inactive'],
        },
        isDelete: {
            type: Boolean,
            default: false,
        },
        deletedAt: {
            type: Date,
        },
        attributes: {
            type: Schema.Types.Mixed,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

//Export the model
export default model(DOCUMENT_NAME, deviceSchema);
