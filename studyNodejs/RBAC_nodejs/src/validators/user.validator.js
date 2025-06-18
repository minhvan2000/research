import { check } from 'express-validator';
import { idMongoValidator } from './base.validator.js';

function getUserValidator() {
    return [
        ...idMongoValidator(),
        check('id', 'User invalid').custom(
            (value, { req }) =>
                req.user.role === 'Admin' || value === req.user.userId
        ),
    ];
}

export { getUserValidator };
