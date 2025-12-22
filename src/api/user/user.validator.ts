import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import BaseValidator from '../base.validator';
import { TypeUtils } from '../../common/utilities/type.utils';
import { UserCreateModel, UserUpdateModel, UserSearchFilters } from '../../domain.types/user.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class UserValidator extends BaseValidator {
    public validateCreateRequest = async (request: express.Request): Promise<UserCreateModel> => {
        try {
            const users = joi.object({
                id: joi.string().uuid().required(),
                UserName: joi.string().max(64).min(0).required(),
                FirstName: joi.string().max(64).min(0).optional(),
                LastName: joi.string().max(64).min(0).optional(),
                ProfileImageUrl: joi.string().max(1000).min(0).optional(),
            });
            await users.validateAsync(request.body);
            const model: UserCreateModel = {
                id: request.body.id,
                UserName: request.body.UserName ? request.body.UserName : null,
                FirstName: request.body.FirstName ? request.body.FirstName : null,
                LastName: request.body.LastName ? request.body.LastName : null,
                ProfileImageUrl: request.body.ProfileImageUrl ? request.body.ProfileImageUrl : null,
            };
            return model;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (request: express.Request): Promise<UserUpdateModel> => {
        try {
            const users = joi.object({
                UserName: joi.string().max(64).min(0).optional(),
                FirstName: joi.string().max(64).min(0).optional(),
                LastName: joi.string().max(64).min(0).optional(),
                ProfileImageUrl: joi.string().max(1000).min(0).optional(),
            });
            await users.validateAsync(request.body);

            const model: UserUpdateModel = {};

            if (TypeUtils.hasProperty(request.body, 'UserName')) {
                model.UserName = request.body.UserName;
            }
            if (TypeUtils.hasProperty(request.body, 'FirstName')) {
                model.FirstName = request.body.FirstName;
            }
            if (TypeUtils.hasProperty(request.body, 'LastName')) {
                model.LastName = request.body.LastName;
            }
            if (TypeUtils.hasProperty(request.body, 'ProfileImageUrl')) {
                model.ProfileImageUrl = request.body.ProfileImageUrl;
            }

            return model;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSearchRequest = async (request: express.Request): Promise<UserSearchFilters> => {
        try {
            const users = joi.object({
                userName: joi.string().max(64).min(0).optional(),
                firstName: joi.string().max(64).min(0).optional(),
                lastName: joi.string().max(64).min(0).optional(),
                profileImageUrl: joi.string().max(1000).min(0).optional(),
                pageIndex: joi.number().min(0).optional(),
                itemsPerPage: joi.number().min(1).optional(),
                orderBy: joi.string().max(256).optional(),
                order: joi
                    .string()
                    .valid('ascending', 'descending')
                    .optional()
                    .error(() => new Error("order param: 'ascending' and 'descending' are the only valid values.")),
            });
            await users.validateAsync(request.query);
            const filters = this.getSearchFilters(request.query);
            const baseFilters = await this.getBaseSearchFilters(request);
            return {
                ...baseFilters,
                ...filters,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    private getSearchFilters = (query): UserSearchFilters => {
        var filters = {};

        var userName = query.userName ? query.userName : null;
        if (userName != null) {
            filters['userName'] = userName;
        }
        var firstName = query.firstName ? query.firstName : null;
        if (firstName != null) {
            filters['firstName'] = firstName;
        }
        var lastName = query.lastName ? query.lastName : null;
        if (lastName != null) {
            filters['lastName'] = lastName;
        }
        var profileImageUrl = query.profileImageUrl ? query.profileImageUrl : null;
        if (profileImageUrl != null) {
            filters['profileImageUrl'] = profileImageUrl;
        }

        return filters;
    };
}
