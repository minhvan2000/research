import { check } from 'express-validator';

const arrValidateBasic = [
    check('email', 'Email must be valid').isEmail().normalizeEmail(),
    check('password', 'Password is required').isString().notEmpty(),
];

function loginValidator() {
    return arrValidateBasic;
}

function registerValidator() {
    return arrValidateBasic.concat([
        check('confirmPassword', 'Passwords do not match').custom(
            (value, { req }) => value === req.body.password
        ),
        check('fullName', 'Name is required')
            .notEmpty()
            .isString()
            .withMessage('Name must be string'),
    ]);
}

function forgotPasswordValidator() {
    return arrValidateBasic[0]; // *This validate just only check email
}

// *This validate just only check password
function resetPasswordValidator() {
    return [arrValidateBasic[1]].concat([
        check('tokenReset', 'Invalid token reset password')
            .isHexadecimal()
            .isByteLength({
                max: 128,
            }),
    ]);
}

export {
    registerValidator,
    loginValidator,
    forgotPasswordValidator,
    resetPasswordValidator,
};
