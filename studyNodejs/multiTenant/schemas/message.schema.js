'use strict';

import { Schema } from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo
const messageSchema = new Schema(
    {
        deviceId: {
            type: String,
            trim: true,
            required: true,
            ref: 'devices',
        },
        FCnt: {
            type: Number,
            default: 1,
        },
        payload: {
            type: String,
            trim: true,
        },
        type: {
            type: String,
        },
        dataDecoded: {
            type: Array,
            default: [],
        },
        rawData: {
            type: Object,
            default: {},
        },
        ack: {
            type: Boolean,
            default: false,
        },
        uniqueToken: {
            type: String,
            index: { unique: true },
        },
        attributes: {
            type: Schema.Types.Mixed,
        },
    },
    {
        timestamps: true,
    }
);

//Export the schema
export default messageSchema;
