'use strict';

import { Schema } from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
const roleSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            index: 'text',
        },
    },
    {
        timestamps: true,
    }
);

//Export the model
export default roleSchema;
