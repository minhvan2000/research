'use strict';

import keyTokenModel from '../models/keyToken.model.js';
import { generateKey } from '../utils/index.js';
import JWT from 'jsonwebtoken';

const createTokenPair = (payload, publicKey, privateKey) => {
    // access token
    const accessToken = JWT.sign(payload, publicKey, {
        // algorithm: 'RS256',
        expiresIn: '3 days',
    });

    const refreshToken = JWT.sign(payload, privateKey, {
        // algorithm: 'RS256',
        expiresIn: '7 days',
    });

    return { accessToken: accessToken, refreshToken: refreshToken };
};

class KeyTokenService {
    createKeyToken = async ({ userId, email }) => {
        const privateKey = generateKey();
        const publicKey = generateKey();

        console.log({ privateKey, publicKey });

        const tokens = createTokenPair(
            { userId: userId, email },
            publicKey,
            privateKey
        );

        await keyTokenModel.findOneAndUpdate(
            userId,
            {
                publicKey,
                privateKey,
                refreshTokensUsed: [],
                refreshToken: tokens.refreshToken,
            },
            {
                upsert: true,
                new: true,
            }
        );

        console.log(`Created Token Success::`, tokens);

        return tokens;
    };
}

export default new KeyTokenService();
