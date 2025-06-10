'use strict';

import { Schema } from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo
const positionSchema = new Schema(
    {
        deviceId: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        x: {
            type: Number,
            required: true,
        },
        y: {
            type: Number,
            required: true,
        },
        z: {
            type: Number,
            required: true,
            default: 0,
        },
        type: {
            type: Number,
            required: true,
            enum: [1, 2], // 1: 2D Map; 2: 3D Map
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

//Export the schema
export default positionSchema;
