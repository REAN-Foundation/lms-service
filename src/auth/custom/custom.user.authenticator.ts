import express from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { logger } from '../../logger/logger';
import { IUserAuthenticator } from '../interfaces/user.authenticator.interface';
import { ActionScope, AuthResult } from '../auth.types';
import { CurrentUser } from '../../domain.types/miscellaneous/current.user';

/////////////////////////////////////////////////////////////////////////////////

export class CustomUserAuthenticator implements IUserAuthenticator {

    public authenticate = async (
        request: express.Request
    ): Promise<AuthResult> => {

        let res: AuthResult = {
            Result        : true,
            Message       : 'Authenticated',
            HttpErrorCode : 200,
        };

        try {

            const publicAccess = request.actionScope === ActionScope.Public;
            const optionalUserAuth = request.optionalUserAuth;
            const privilegedClient = request.currentClient?.IsPrivileged as boolean;

            const authHeader = request.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            const missingToken = token == null || token === 'null' || token === undefined;

            const allowWithoutToken = publicAccess || optionalUserAuth || privilegedClient;

            if (missingToken) {
                if (allowWithoutToken) {
                    return res;
                }
                res = {
                    Result        : false,
                    Message       : 'Unauthorized user access',
                    HttpErrorCode : 401,
                };
                return res;
            }

            // synchronous verification
            var user = jwt.verify(token, process.env.USER_ACCESS_TOKEN_SECRET) as JwtPayload;

            var sessionId = user.SessionId ?? null;
            if (!sessionId) {
                const IsPrivilegedUser = request.currentClient.IsPrivileged as boolean;
                if (IsPrivilegedUser) {
                    request.currentUser = user as CurrentUser;
                    return res;
                }
                res = {
                    Result        : false,
                    Message       : 'Your session has expired. Please login to the app again.',
                    HttpErrorCode : 403,
                };

                return res;
            }

            request.currentUser = user as CurrentUser;
            request.currentUserTenantId = request.currentUser?.TenantId;
            res = {
                Result        : true,
                Message       : 'Authenticated',
                HttpErrorCode : 200,
            };

            return res;
        } catch (err) {
            logger.error(JSON.stringify(err, null, 2));
            logger.error(err.message);
            res = {
                Result        : false,
                Message       : 'Forbidden user access: ' + err.message, // Please do not change this and if needed to change then check with app developer
                HttpErrorCode : 403,
            };
            return res;
        }
    };

}


