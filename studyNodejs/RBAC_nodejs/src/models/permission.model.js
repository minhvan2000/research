'use strict';

import { model, Schema } from 'mongoose'; // Erase if already required

const DOCUMENT_NAME = 'Permission';
const COLLECTION_NAME = 'Permissions';
// Declare the Schema of the Mongo model
const permissionSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        permissions: [
            {
                name: {
                    type: String,
                },
                value: [
                    {
                        type: Number, // 0->Create, 1->Read, 2->Update, 3->Delete
                    },
                ],
            },
        ],
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

//Export the model
export default model(DOCUMENT_NAME, permissionSchema);
