'use strict';

import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';

import { getInfoData, generateKey, convertToObjectId } from '../utils/index.js';
import { BadRequestError } from '../core/error.response.js';
import keyTokenService from './keyToken.service.js';
import roleModel from '../models/role.model.js';
import sendMail from './mailer.service.js';
import environmentConfig from '../configs/environment.config.js';

const { mailer, app } = environmentConfig;

class AccessService {
    register = async ({
        fullName,
        email,
        password,
        phoneNumber = '038xxxx124',
        address = 'HCM',
    }) => {
        const holderUser = await userModel.findOne({ email }).lean();

        if (holderUser) {
            throw new BadRequestError('Email already exists');
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const getRole = await roleModel.findOne({ name: 'User' }).lean().exec();

        const newUser = await userModel.create({
            fullName,
            email,
            password: passwordHash,
            role: getRole._id,
            phoneNumber,
            address,
        });

        if (!newUser) {
            throw new BadRequestError('Error: User conflicted!');
        }

        const tokens = await keyTokenService.createKeyToken({
            userId: newUser._id,
            email,
        });

        return {
            user: getInfoData({
                fields: ['_id', 'fullName', 'email'],
                object: newUser,
            }),
            tokenType: 'Bearer',
            tokens,
        };
    };

    login = async ({ email, password }) => {
        const foundUser = await userModel.findOne({ email }).lean();

        if (!foundUser) {
            throw new BadRequestError('Email & Password is');
        }

        const match = await bcrypt.compare(password, foundUser.password);
        if (!match) {
            throw new AuthFailureError('Error: Authentication!');
        }

        const { _id: userId } = foundUser;

        const tokens = await keyTokenService.createKeyToken({
            userId,
            email,
        });

        return {
            user: getInfoData({
                fields: ['_id', 'fullName', 'email'],
                object: foundUser,
            }),
            tokenType: 'Bearer',
            tokens,
        };
    };

    forgotPassword = async ({ email }) => {
        const user = await userModel.findOne({ email });

        if (!user) {
            throw new NotFoundError('Email not registered!');
        }

        const tokenReset = generateKey();

        user.tokenResetPassword = tokenReset;
        user.tokenResetPasswordExpire = Date.now() + 86400000; // Token only lasts for 24 hours

        await user.save();

        const mailOptions = {
            from: mailer.user,
            to: 'minhdv@dfm-engineering.com',
            template: 'interfaceEmail.template',
            subject: 'Password help has arrived!',
            context: {
                title: 'Password Forgot',
                urlServer: app.host,
                pathLogo: 'none',
                contentHeader: 'Password help has arrived',
                urlRedirect: 'http://127.0.0.1:8888',
                userName: user.name,
                contentBody: `You requested for a password reset? <br/> Kindly click this button <a href="http://127.0.0.1:8888/v1/api/user/${user.tokenResetPassword}"
                style="background-color:#5cb85c;border-radius:3px;color:#FFFFFF;display:inline-block;font-family:'Helvetica',Arial,sans-serif;font-size:13px;height:45px;line-height:45px;text-align:center;text-decoration:none;text-transform:uppercase;width:150px;-webkit-text-size-adjust:none;mso-hide:all;">Reset
                Password </a> to reset your password.`,
                contentFooter: 'Cheers!',
            },
        };
        await sendMail(mailOptions);

        return { message: 'Send Mail success' };
    };

    resetPassword = async ({
        tokenResetPassword,
        password,
        confirmPassword,
    }) => {
        const user = await userModel
            .findOne({ tokenResetPassword })
            .lean()
            .exec();

        if (!user) {
            throw new BadRequestError('Invalid token');
        }

        if (password !== confirmPassword) {
            throw new BadRequestError("Passwords don't match");
        }

        const passwordHash = await bcrypt.hash(password, 10);

        user.password = passwordHash;

        delete user.tokenResetPassword;
        delete user.tokenResetPasswordExpire;

        const userUpdated = await userModel.updateOne(
            {
                _id: convertToObjectId(user._id),
            },
            {
                $set: { ...user },
                $unset: {
                    tokenResetPassword: '',
                    tokenResetPasswordExpire: '',
                },
            }
        );

        const mailOptions = {
            from: mailer.user,
            to: 'minhdv@dfm-engineering.com',
            template: 'interfaceEmail.template',
            subject: 'Password Reset Confirmation!',
            context: {
                title: 'Password Reset',
                urlServer: 'http://127.0.0.1',
                pathLogo: 'none',
                contentHeader: 'Password Reset Confirmation',
                urlRedirect: 'http://127.0.0.1:8888',
                userName: userUpdated.name,
                contentBody: `<span style="color: #fb9678">Congratulations!!!<span><br/><span style="color: #5cb85c">Your password has been successful reset</span><br/><span style="color: #505053">You can now login with your new password.</span>`,
                contentFooter: 'Cheers!',
            },
        };

        await sendMail(mailOptions);

        return { message: 'Update password success' };
    };
}

export default new AccessService();
