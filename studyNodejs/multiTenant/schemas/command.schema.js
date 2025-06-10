'use strict';

import { Schema } from 'mongoose'; // Erase if already required

const historiesSchema = new Schema({
    _id: false,
    timestamps: {
        type: Date,
        default: new Date(),
    },
    status: {
        type: String,
        default: 'PENDING',
        enum: [
            'PENDING',
            'RETRYING',
            'PROCESSING',
            'PROCESSED',
            'ERROR',
            'CANCELED',
            'EXPIRED',
        ],
    },
    errorCode: {
        type: String,
    },
});

// Declare the Schema of the Mongo
const commandSchema = new Schema(
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
        dataDecoded: {
            type: Array,
            default: [],
        },
        request: {
            connector: {
                type: String,
                required: true,
            },
            value: {
                type: Object,
                required: true,
            },
        },
        policy: {
            expirationInSeconds: {
                type: Number,
                default: 60, //default 1 minutes
                min: 5, //minimum 5 seconds
                max: 259200, //maximum 3 days
            },
            ackTimeoutInSeconds: {
                type: Number,
                default: 60, //default 1 minutes
                min: 5, //minimum 5 seconds
                max: 259200, //maximum 3 days
            },
            ackMode: {
                type: Boolean,
                default: false,
            },
            attempts: {
                type: Number,
                default: 1,
                min: 1, //minimum 1 time
                max: 5, //maximum 5 times
            },
        },
        status: {
            type: String,
            default: 'PENDING',
            index: true,
            enum: [
                'PENDING',
                'RETRYING',
                'PROCESSING',
                'PROCESSED',
                'ERROR',
                'CANCELED',
                'EXPIRED',
            ],
        },
        history: [historiesSchema],
    },
    {
        timestamps: true,
    }
);

//Export the schema
export default commandSchema;
