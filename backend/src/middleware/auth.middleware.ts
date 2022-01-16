import { JwtPayload, verify } from 'jsonwebtoken';
import { getTokens } from '../utilities/auth.utilities';
import { getRepository } from 'typeorm';
import { Person } from '../entities/person';

export function validateAccessToken(token: string): JwtPayload {
    try {
        return verify(
            token,
            '<your secret key for access token>'
        ) as JwtPayload;
    } catch (e) {
        console.error('Error verifying access token');
        throw e;
    }
}

export function validateRefreshToken(token: string): JwtPayload {
    try {
        return verify(
            token,
            '<your secret key for refresh token>'
        ) as JwtPayload;
    } catch (e) {
        console.error('Error verifying refresh token');
        throw e;
    }
}

export async function validateTokensMiddleware(req, res, next) {
    const refreshToken = req.headers['x-refresh-token'];
    const accessToken = req.headers['x-access-token'];
    if (!accessToken && !refreshToken) return next();

    const decodedAccessToken = validateAccessToken(accessToken);
    if (decodedAccessToken && decodedAccessToken.user) {
        req.user = decodedAccessToken.user;
        return next();
    }

    const decodedRefreshToken = validateRefreshToken(refreshToken);
    if (decodedRefreshToken && decodedRefreshToken.user) {
        // valid refresh token
        const personRepository = getRepository(Person);
        const user = await personRepository.findOne({
            where: {
                id: decodedRefreshToken.user.id
            }
        });
        // valid user and user token not invalidated
        if (!user || user.count !== decodedRefreshToken.user.count)
            return next();
        req.user = decodedRefreshToken.user;
        // refresh the tokens
        const userTokens = getTokens(user);
        res.set({
            'Access-Control-Expose-Headers': 'x-access-token,x-refresh-token',
            'x-access-token': userTokens.accessToken,
            'x-refresh-token': userTokens.refreshToken
        });
        return next();
    }
    next();
}
