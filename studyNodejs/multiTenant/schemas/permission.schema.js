'use strict';

import { Schema } from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
const permissionSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'users',
        },
        isGrantRead: {
            type: Boolean,
            required: true,
            default: false,
        },
        isGrantWrite: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

permissionSchema.index({ name: 'text' });

//Export the model
export default permissionSchema;
