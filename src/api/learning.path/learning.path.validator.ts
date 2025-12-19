import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import BaseValidator from '../base.validator';
import { TypeUtils } from '../../common/utilities/type.utils';
import {
    LearningPathCreateModel,
    LearningPathUpdateModel,
    LearningPathSearchFilters,
} from '../../domain.types/learning.path.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class LearningPathValidator extends BaseValidator {
    public validateCreateRequest = async (request: express.Request): Promise<LearningPathCreateModel> => {
        try {
            const learningPaths = joi.object({
                TenantId: joi.string().uuid().optional(),
                Name: joi.string().max(64).min(0).required(),
                Description: joi.string().max(2000).min(0).optional(),
                ImageUrl: joi.string().max(1000).min(0).optional(),
                DurationInDays: joi.number().integer().optional(),
                PreferenceWeight: joi.number().integer().optional(),
                Enabled: joi.boolean().optional(),
                CourseSequence: joi.object().pattern(joi.string().uuid(), joi.number().integer().min(1)).optional(),
            });
            await learningPaths.validateAsync(request.body);
            const model: LearningPathCreateModel = {
                TenantId: request.body.TenantId ?? request.currentUser.TenantId,
                Name: request.body.Name ? request.body.Name : null,
                Description: request.body.Description ? request.body.Description : null,
                ImageUrl: request.body.ImageUrl ? request.body.ImageUrl : null,
                DurationInDays: request.body.DurationInDays ? request.body.DurationInDays : null,
                PreferenceWeight: request.body.PreferenceWeight ? request.body.PreferenceWeight : null,
                Enabled: request.body.Enabled ? request.body.Enabled : null,
                CourseSequence: request.body.CourseSequence ? request.body.CourseSequence : null,
            };
            return model;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (request: express.Request): Promise<LearningPathUpdateModel> => {
        try {
            const learningPaths = joi.object({
                TenantId: joi.string().uuid().optional(),
                Name: joi.string().max(64).min(0).optional(),
                Description: joi.string().max(2000).min(0).optional(),
                ImageUrl: joi.string().max(1000).min(0).optional(),
                DurationInDays: joi.number().integer().optional(),
                PreferenceWeight: joi.number().integer().optional(),
                Enabled: joi.boolean().optional(),
                CourseSequence: joi.object().pattern(joi.string().uuid(), joi.number().integer().min(1)).optional(),
            });
            await learningPaths.validateAsync(request.body);

            const model: LearningPathUpdateModel = {};

            if (TypeUtils.hasProperty(request.body, 'TenantId')) {
                model.TenantId = request.body.TenantId;
            }
            if (TypeUtils.hasProperty(request.body, 'Name')) {
                model.Name = request.body.Name;
            }
            if (TypeUtils.hasProperty(request.body, 'Description')) {
                model.Description = request.body.Description;
            }
            if (TypeUtils.hasProperty(request.body, 'ImageUrl')) {
                model.ImageUrl = request.body.ImageUrl;
            }
            if (TypeUtils.hasProperty(request.body, 'DurationInDays')) {
                model.DurationInDays = request.body.DurationInDays;
            }
            if (TypeUtils.hasProperty(request.body, 'PreferenceWeight')) {
                model.PreferenceWeight = request.body.PreferenceWeight;
            }
            if (TypeUtils.hasProperty(request.body, 'Enabled')) {
                model.Enabled = request.body.Enabled;
            }
            if (TypeUtils.hasProperty(request.body, 'CourseSequence')) {
                model.CourseSequence = request.body.CourseSequence;
            }

            return model;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSearchRequest = async (request: express.Request): Promise<LearningPathSearchFilters> => {
        try {
            const learningPaths = joi.object({
                tenantId: joi.string().uuid().optional(),
                name: joi.string().max(64).min(0).optional(),
                description: joi.string().max(2000).min(0).optional(),
                imageUrl: joi.string().max(1000).min(0).optional(),
                durationInDays: joi.number().integer().optional(),
                preferenceWeight: joi.number().integer().optional(),
                enabled: joi.boolean().optional(),
                pageIndex: joi.number().min(0).optional(),
                itemsPerPage: joi.number().min(1).optional(),
                orderBy: joi.string().max(256).optional(),
                order: joi
                    .string()
                    .valid('ascending', 'descending')
                    .optional()
                    .error(() => new Error("order param: 'ascending' and 'descending' are the only valid values.")),
            });
            await learningPaths.validateAsync(request.query);
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

    private getSearchFilters = (query): LearningPathSearchFilters => {
        var filters = {};

        var tenantId = query.tenantId ? query.tenantId : null;
        if (tenantId != null) {
            filters['TenantId'] = tenantId;
        }
        var name = query.name ? query.name : null;
        if (name != null) {
            filters['Name'] = name;
        }
        var description = query.description ? query.description : null;
        if (description != null) {
            filters['Description'] = description;
        }
        var imageUrl = query.imageUrl ? query.imageUrl : null;
        if (imageUrl != null) {
            filters['ImageUrl'] = imageUrl;
        }
        var durationInDays = query.durationInDays ? query.durationInDays : null;
        if (durationInDays != null) {
            filters['DurationInDays'] = durationInDays;
        }
        var preferenceWeight = query.preferenceWeight ? query.preferenceWeight : null;
        if (preferenceWeight != null) {
            filters['PreferenceWeight'] = preferenceWeight;
        }
        var enabled = query.enabled ? query.enabled : null;
        if (enabled != null) {
            filters['Enabled'] = enabled;
        }

        return filters;
    };

    public reorderCoursesRequest = async (request: express.Request): Promise<Record<string, number>> => {
        try {
            const schema = joi.object({
                CourseSequence: joi.object().pattern(joi.string().uuid(), joi.number().integer().min(1)).required(),
            });
            await schema.validateAsync(request.body);
            return request.body.CourseSequence;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}
