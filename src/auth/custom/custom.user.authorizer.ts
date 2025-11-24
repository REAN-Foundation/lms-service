import express from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '../../logger/logger';
import { PermissionHandler } from './permission.handler';
import { ActionScope } from '../auth.types';
import { ConfigurationManager } from '../../config/configuration.manager';
import { CurrentUser } from '../../domain.types/miscellaneous/current.user';
import { IUserAuthorizer } from '../interfaces/user.authorizer.interface';

//////////////////////////////////////////////////////////////

export class CustomAuthorizer implements IUserAuthorizer {

    _rolePrivilegeService: any = null;

    constructor() {
        // RolePrivilegeService will be injected when needed
    }

    public authorize = async (request: express.Request, response: express.Response | null): Promise<boolean> => {
        try {

            const context = request.context;
            if (context == null || context === 'undefined') {
                return false;
            }

            // Temp solution - Needs to be refined
            if (request.currentClient?.IsPrivileged) {
                return true;
            }

            const publicAccess = request.actionScope === ActionScope.Public;
            const optionalUserAuth = request.optionalUserAuth;

            const currentUser = request.currentUser ?? null;
            if (!currentUser) {
                //If the user is not authenticated, then check if the resource access is public
                if (publicAccess || optionalUserAuth) {
                    // To check whether a particular resource is available for public access,
                    //  e.g. a profile image download
                    return true;
                }
                // If the resource is not public, then the user must be authenticated
                return false;
            }

            const hasPermission = await PermissionHandler.checkRoleBasedPermissions(request);
            return hasPermission;

        } catch (error) {
            logger.error(error.message);
        }
        return false;
    };

    public generateUserSessionToken = async (user: CurrentUser): Promise<string> => {
        return new Promise((resolve, reject) => {
            try {
                const expiresIn: number = ConfigurationManager.JwtExpiresIn();
                const token = jwt.sign(user, process.env.USER_ACCESS_TOKEN_SECRET, { expiresIn: expiresIn });
                resolve(token);
            } catch (error) {
                reject(error);
            }
        });
    };

}

