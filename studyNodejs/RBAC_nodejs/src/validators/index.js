import { validationResult } from 'express-validator';
import { BadRequestError } from '../core/error.response.js';

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorFormat = errors.formatWith((message) => message.msg);
        next(new BadRequestError(JSON.stringify(errorFormat.mapped())));
    }
    next();
};

export default validate;
