import jwt from 'jsonwebtoken';
import { findOne } from '../../DB/service/db.service.js';
import userModel from '../../DB/models/user.model.js';
import { ttl } from '../../DB/service/redis.service.js';


export const authentication = async (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        throw new Error('token not exists', { cause: 401 });
    }

    // Accept both `authorization: <token>` and `Authorization: Bearer <token>`.
    const token = authorization
        .replace(/^Bearer\s+/i, "")
        .trim()
        .replace(/^(["'])(.*)\1$/, "$2");
    if (!token) {
        throw new Error('token not exists', { cause: 401 });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, 'fam1');
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new Error('access token expired; sign in again or refresh it', { cause: 401 });
        }
        if (error.name === "JsonWebTokenError") {
            throw new Error('invalid access token; send the access_token returned by signin', { cause: 401 });
        }
        throw new Error('unable to verify access token', { cause: 401 });
    }

    if (!decoded?.userId) {
        throw new Error('token not valid', { cause: 401 });
    }

    const user = await userModel. finsById(decoded.userId);

    if (!user) {
        throw new Error('user not found', { cause: 401 });
    }
    if(!user?.isConfirmed) throw new Error('user not confirmed', { cause: 401 });
    if(user?.changeCredentialAt?.getTime() > decoded.iat){
        throw new Error('token is expired', { cause: 401 });
    }
    if (decoded.jti && await ttl(`revokeToken::${user._id}::${decoded.jti}`) > 0) {
        throw new Error('token is revoked', { cause: 401 });
    }

    req.user = user;
    req.decoded = decoded;
    req.jti = decoded.jti;
    next();
    
};
 
