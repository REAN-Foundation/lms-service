import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import BaseValidator from '../base.validator';
import { TypeUtils } from '../../common/utilities/type.utils';
import { CourseCreateModel, CourseUpdateModel, CourseSearchFilters } from '../../domain.types/course.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class CourseValidator extends BaseValidator {
    public validateCreateRequest = async (request: express.Request): Promise<CourseCreateModel> => {
        try {
            const courses = joi.object({
                TenantId: joi.string().max(64).min(0).optional(),
                Name: joi.string().max(64).min(0).required(),
                Description: joi.string().max(2000).min(0).optional(),
                ImageUrl: joi.string().max(1000).min(0).optional(),
                DurationInDays: joi.number().integer().optional(),
                ModuleSequence: joi.object().pattern(joi.string().uuid(), joi.number().integer().min(1)).optional(),
                LearningPathIds: joi.array().items(joi.string().uuid()).optional(),
            });
            await courses.validateAsync(request.body);
            const model: CourseCreateModel = {
                TenantId: request.body.TenantId ?? request.currentUser.TenantId,
                Name: request.body.Name ? request.body.Name : null,
                Description: request.body.Description ? request.body.Description : null,
                ImageUrl: request.body.ImageUrl ? request.body.ImageUrl : null,
                DurationInDays: request.body.DurationInDays ? request.body.DurationInDays : null,
                ModuleSequence: request.body.ModuleSequence ? request.body.ModuleSequence : null,
                LearningPathIds: request.body.LearningPathIds ?? [],
            };
            return model;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (request: express.Request): Promise<CourseUpdateModel> => {
        try {
            const courses = joi.object({
                TenantId: joi.string().max(64).min(0).optional(),
                Name: joi.string().max(64).min(0).optional(),
                Description: joi.string().max(2000).min(0).optional(),
                ImageUrl: joi.string().max(1000).min(0).optional(),
                DurationInDays: joi.number().integer().optional(),
                ModuleSequence: joi.object().pattern(joi.string().uuid(), joi.number().integer().min(1)).optional(),
                LearningPathIds: joi.array().items(joi.string().uuid()).optional(),
            });
            await courses.validateAsync(request.body);

            const model: CourseUpdateModel = {};

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
            if (TypeUtils.hasProperty(request.body, 'ModuleSequence')) {
                model.ModuleSequence = request.body.ModuleSequence;
            }
            if (TypeUtils.hasProperty(request.body, 'LearningPathIds')) {
                model.LearningPathIds = request.body.LearningPathIds ?? [];
            }

            return model;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSearchRequest = async (request: express.Request): Promise<CourseSearchFilters> => {
        try {
            const courses = joi.object({
                tenantId: joi.string().max(64).min(0).optional(),
                name: joi.string().max(64).min(0).optional(),
                description: joi.string().max(2000).min(0).optional(),
                imageUrl: joi.string().max(1000).min(0).optional(),
                durationInDays: joi.number().integer().optional(),
                learningPathId: joi.string().uuid().optional(),
                pageIndex: joi.number().min(0).optional(),
                itemsPerPage: joi.number().min(1).optional(),
                orderBy: joi.string().max(256).optional(),
                order: joi
                    .string()
                    .valid('ascending', 'descending')
                    .optional()
                    .error(() => new Error("order param: 'ascending' and 'descending' are the only valid values.")),
            });
            await courses.validateAsync(request.query);
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

    private getSearchFilters = (query): CourseSearchFilters => {
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
        var learningPathId = query.learningPathId ? query.learningPathId : null;
        if (learningPathId != null) {
            filters['LearningPathId'] = learningPathId;
        }

        return filters;
    };
}
