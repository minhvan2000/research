'use strict';

import { Schema } from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo
const dashboardSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        modules: {
            type: Array,
            required: true,
        },
        groupTarget: {
            type: String,
            required: true,
        },
        tenantId: {
            type: Schema.Types.ObjectId,
            ref: 'tenants',
            required: true,
        },
        displayOnLanding: {
            type: Boolean,
            default: false,
        },
        isDefault: {
            type: Boolean,
            default: false,
        },
        description: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

dashboardSchema.index({ name: 'text' });

//Export the schema
export default dashboardSchema;
