'use strict';

import { Schema } from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo
const keyTokenSchema = Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'users',
        },
        privateKey: {
            type: String,
            required: true,
        },
        publicKey: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String,
            required: true,
        },
        refreshTokensUsed: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

//Export the schema
export default keyTokenSchema;
