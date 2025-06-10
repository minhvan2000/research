'use strict';

import { Schema } from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
const interfaceSchema = new Schema(
    {
        _id: {
            type: String,
        },
        deviceId: {
            type: String,
            required: true,
            trim: true,
            ref: 'devices',
        },
        connector: {
            type: String,
            required: true,
            enum: ['mqtt'],
        },
        status: {
            type: String,
            default: 'PROVISIONED',
            enum: ['PROVISIONED', 'ACTIVATED', 'INACTIVATED'],
        },
        lastContact: {
            type: Date,
            default: Date.now(),
        },
        definition: {
            type: Schema.Types.Mixed,
        },
        network: {
            type: Schema.Types.Mixed,
        },
    },
    {
        timestamps: true,
    }
);

//Export the model
export default interfaceSchema;
