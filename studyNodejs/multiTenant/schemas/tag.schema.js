'use strict';

import { Schema } from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
const tagSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },
        tenantId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'tenants',
        },
        pathIcon: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: Number,
            default: 1,
            enum: [0, 1], // 0: Public, 1: Private
        },
    },
    {
        timestamps: true,
    }
);

//Export the model
export default tagSchema;
