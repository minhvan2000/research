'use strict';

import { model, Schema } from 'mongoose'; // Erase if already required

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'Users';
// Declare the Schema of the Mongo model
const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            type: String,
        },
        avatar: {
            type: String,
            trim: true,
        },
        role: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Role',
        },
        isDelete: {
            type: Boolean,
            default: false,
        },
        deletedAt: {
            type: Date,
        },
        tokenResetPassword: {
            type: String,
            trim: true,
        },
        tokenResetPasswordExpire: {
            type: Date,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

userSchema.index({ fullName: 'text', email: 'text' });

//Export the model
export default model(DOCUMENT_NAME, userSchema);
