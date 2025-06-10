'use strict';

import { Schema } from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
const sourceTypeSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: 'text',
        },
        tenantId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'tenants',
        },
        emissionFactor: {
            type: Number,
            required: true,
        },
        referencePrice: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

//Export the model
export default sourceTypeSchema;
