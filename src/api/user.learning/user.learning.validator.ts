import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import BaseValidator from '../base.validator';
import { TypeUtils } from '../../common/utilities/type.utils';
import {
    UserLearningCreateModel,
    UserLearningUpdateModel,
    UserLearningSearchFilters,
} from '../../domain.types/user.learning.types';
import { ProgressStatus } from '../../domain.types/enums/progress.status.enum';

///////////////////////////////////////////////////////////////////////////////////////////////

export class UserLearningValidator extends BaseValidator {
    public validateCreateRequest = async (request: express.Request): Promise<UserLearningCreateModel> => {
        try {
            const user_learnings = joi.object({
                UserId: joi.string().uuid().required(),
                ActionId: joi.string().uuid().required(),
                ProgressStatus: joi
                    .string()
                    .valid(...Object.values(ProgressStatus))
                    .required(),
                PercentageCompletion: joi.number().integer().required(),
                CourseId: joi.string().uuid().required(),
                LearningPathId: joi.string().uuid().required(),
                CourseModuleId: joi.string().uuid().required(),
                CourseContentId: joi.string().uuid().required(),
            });
            await user_learnings.validateAsync(request.body);
            const model: UserLearningCreateModel = {
                UserId: request.body.UserId ? request.body.UserId : null,
                ActionId: request.body.ActionId ? request.body.ActionId : null,
                ProgressStatus: request.body.ProgressStatus ? request.body.ProgressStatus : null,
                PercentageCompletion: request.body.PercentageCompletion ? request.body.PercentageCompletion : null,
                CourseId: request.body.CourseId,
                LearningPathId: request.body.LearningPathId,
                CourseModuleId: request.body.CourseModuleId,
                CourseContentId: request.body.CourseContentId,
            };
            return model;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (request: express.Request): Promise<UserLearningUpdateModel> => {
        try {
            const user_learnings = joi.object({
                UserId: joi.string().uuid().optional(),
                ActionId: joi.string().uuid().optional(),
                ProgressStatus: joi
                    .string()
                    .valid(...Object.values(ProgressStatus))
                    .optional(),
                PercentageCompletion: joi.number().integer().optional(),
                CourseId: joi.string().uuid().optional(),
                LearningPathId: joi.string().uuid().optional(),
                CourseModuleId: joi.string().uuid().optional(),
                CourseContentId: joi.string().uuid().optional(),
            });
            await user_learnings.validateAsync(request.body);

            const model: UserLearningUpdateModel = {};

            if (TypeUtils.hasProperty(request.body, 'UserId')) {
                model.UserId = request.body.UserId;
            }
            if (TypeUtils.hasProperty(request.body, 'ActionId')) {
                model.ActionId = request.body.ActionId;
            }
            if (TypeUtils.hasProperty(request.body, 'ProgressStatus')) {
                model.ProgressStatus = request.body.ProgressStatus;
            }
            if (TypeUtils.hasProperty(request.body, 'PercentageCompletion')) {
                model.PercentageCompletion = request.body.PercentageCompletion;
            }
            if (TypeUtils.hasProperty(request.body, 'CourseId')) {
                model.CourseId = request.body.CourseId;
            }
            if (TypeUtils.hasProperty(request.body, 'LearningPathId')) {
                model.LearningPathId = request.body.LearningPathId;
            }
            if (TypeUtils.hasProperty(request.body, 'CourseModuleId')) {
                model.CourseModuleId = request.body.CourseModuleId;
            }
            if (TypeUtils.hasProperty(request.body, 'CourseContentId')) {
                model.CourseContentId = request.body.CourseContentId;
            }

            return model;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSearchRequest = async (request: express.Request): Promise<UserLearningSearchFilters> => {
        try {
            const user_learnings = joi.object({
                UserId: joi.string().uuid().optional(),
                ActionId: joi.string().uuid().optional(),
                ProgressStatus: joi
                    .string()
                    .valid(...Object.values(ProgressStatus))
                    .optional(),
                PercentageCompletion: joi.number().integer().optional(),
                CourseId: joi.string().uuid().optional(),
                LearningPathId: joi.string().uuid().optional(),
                CourseModuleId: joi.string().uuid().optional(),
                CourseContentId: joi.string().uuid().optional(),
            });
            await user_learnings.validateAsync(request.query);
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

    private getSearchFilters = (query): UserLearningSearchFilters => {
        var filters = {};

        var UserId = query.UserId ? query.UserId : null;
        if (UserId != null) {
            filters['UserId'] = UserId;
        }
        var ActionId = query.ActionId ? query.ActionId : null;
        if (ActionId != null) {
            filters['ActionId'] = ActionId;
        }
        var ProgressStatus = query.ProgressStatus ? query.ProgressStatus : null;
        if (ProgressStatus != null) {
            filters['ProgressStatus'] = ProgressStatus;
        }
        var PercentageCompletion = query.PercentageCompletion ? query.PercentageCompletion : null;
        if (PercentageCompletion != null) {
            filters['PercentageCompletion'] = PercentageCompletion;
        }
        var CourseId = query.CourseId ? query.CourseId : null;
        if (CourseId != null) {
            filters['CourseId'] = CourseId;
        }
        var LearningPathId = query.LearningPathId ? query.LearningPathId : null;
        if (LearningPathId != null) {
            filters['LearningPathId'] = LearningPathId;
        }
        var CourseModuleId = query.CourseModuleId ? query.CourseModuleId : null;
        if (CourseModuleId != null) {
            filters['CourseModuleId'] = CourseModuleId;
        }
        var CourseContentId = query.CourseContentId ? query.CourseContentId : null;
        if (CourseContentId != null) {
            filters['CourseContentId'] = CourseContentId;
        }

        return filters;
    };

    public validateUpdateUserLearning = async (request: express.Request) => {
        try {
            const userId = await this.requestParamAsUUID(request, 'userId');
            const contentId = await this.requestParamAsUUID(request, 'contentId');

            const model: any = {
                UserId: userId,
                ContentId: contentId,
                ActionId: request.body.ActionId || null,
                LearningPathId: request.body.LearningPathId || null,
                CourseId: request.body.CourseId || null,
                ModuleId: request.body.ModuleId || null,
                ProgressStatus: request.body.ProgressStatus || null,
                PercentageCompletion: request.body.PercentageCompletion || null,
            };

            return model;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}
