import { Person } from '../entities/person';

const { sign } = require('jsonwebtoken');

export function getTokens(user: Person) {
    const sevenDays = 60 * 60 * 24 * 7 * 1000;
    const fifteenMins = 60 * 15 * 1000;
    const accessUser = {
        id: user.id
    };
    const accessToken = sign(
        { user: accessUser },
        '<your secret key for access token>',
        {
            expiresIn: fifteenMins
        }
    );
    const refreshUser = {
        id: user.id
        // count: user.tokenCount
    };
    const refreshToken = sign(
        { user: refreshUser },
        '<your secret key for refresh token>',
        {
            expiresIn: sevenDays
        }
    );

    return { accessToken, refreshToken };
}
