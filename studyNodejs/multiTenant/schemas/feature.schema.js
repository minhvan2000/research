'use strict';

import { Schema } from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
const featuresSchema = new Schema(
    {
        deviceId: {
            type: String,
            required: true,
            trim: true,
            ref: 'devices',
        },
        sourceTypeId: {
            type: Schema.Types.ObjectId,
            ref: 'sourceTypes',
        },
        type: {
            type: Number,
            required: true,
            enum: [1, 2], // 1: Energy; 2: Water
        },
        measure: {
            type: Number,
            enum: [0, 1, 2, 3], //0: Ignore; 1: 1 Phase; 2: 3 Phase; 3: Pull Counter
        },
        action: {
            type: Object,
        },
        attributes: {
            type: Schema.Types.Mixed,
        },
    },
    {
        timestamps: true,
    }
);

//Export the model
export default featuresSchema;
