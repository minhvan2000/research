'use strict';

import { model, Schema } from 'mongoose'; // Erase if already required

const DOCUMENT_NAME = 'Role';
const COLLECTION_NAME = 'Roles';
// Declare the Schema of the Mongo model
const roleSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

//Export the model
export default model(DOCUMENT_NAME, roleSchema);
