import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import BaseValidator from '../base.validator';
import { TypeUtils } from '../../common/utilities/type.utils';
import {
    CourseModuleCreateModel,
    CourseModuleUpdateModel,
    CourseModuleSearchFilters,
} from '../../domain.types/course.module.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class CourseModuleValidator extends BaseValidator {
    public validateCreateRequest = async (request: express.Request): Promise<CourseModuleCreateModel> => {
        try {
            const course_modules = joi.object({
                Name: joi.string().max(64).min(0).required(),
                Description: joi.string().max(2000).min(0).optional(),
                ImageUrl: joi.string().max(1000).min(0).optional(),
                DurationInMins: joi.number().integer().optional(),
                ContentSequence: joi.object().pattern(joi.string().uuid(), joi.number().integer().min(1)).optional(),
                CourseId: joi.string().uuid().required(),
            });
            await course_modules.validateAsync(request.body);
            const model: CourseModuleCreateModel = {
                Name: request.body.Name ? request.body.Name : null,
                Description: request.body.Description ? request.body.Description : null,
                ImageUrl: request.body.ImageUrl ? request.body.ImageUrl : null,
                DurationInMins: request.body.DurationInMins ? request.body.DurationInMins : null,
                ContentSequence: request.body.ContentSequence ? request.body.ContentSequence : null,
                CourseId: request.body.CourseId,
            };
            return model;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (request: express.Request): Promise<CourseModuleUpdateModel> => {
        try {
            const course_modules = joi.object({
                Name: joi.string().max(64).min(0).optional(),
                Description: joi.string().max(2000).min(0).optional(),
                ImageUrl: joi.string().max(1000).min(0).optional(),
                DurationInMins: joi.number().integer().optional(),
                ContentSequence: joi.object().pattern(joi.string().uuid(), joi.number().integer().min(1)).optional(),
                CourseId: joi.string().uuid().optional(),
            });
            await course_modules.validateAsync(request.body);

            const model: CourseModuleUpdateModel = {};

            if (TypeUtils.hasProperty(request.body, 'Name')) {
                model.Name = request.body.Name;
            }
            if (TypeUtils.hasProperty(request.body, 'Description')) {
                model.Description = request.body.Description;
            }
            if (TypeUtils.hasProperty(request.body, 'ImageUrl')) {
                model.ImageUrl = request.body.ImageUrl;
            }
            if (TypeUtils.hasProperty(request.body, 'DurationInMins')) {
                model.DurationInMins = request.body.DurationInMins;
            }
            if (TypeUtils.hasProperty(request.body, 'ContentSequence')) {
                model.ContentSequence = request.body.ContentSequence;
            }
            if (TypeUtils.hasProperty(request.body, 'CourseId')) {
                model.CourseId = request.body.CourseId;
            }

            return model;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSearchRequest = async (request: express.Request): Promise<CourseModuleSearchFilters> => {
        try {
            const course_modules = joi.object({
                name: joi.string().max(64).min(0).optional(),
                description: joi.string().max(2000).min(0).optional(),
                imageUrl: joi.string().max(1000).min(0).optional(),
                durationInMins: joi.number().integer().optional(),
                courseId: joi.string().uuid().optional(),
                pageIndex    : joi.number().min(0).optional(),
                itemsPerPage : joi.number().min(1).optional(),
                orderBy      : joi.string().max(256).optional(),
                order        : joi
                                    .string()
                                    .valid('ascending', 'descending')
                                    .optional()
                                    .error(() => new Error("order param: 'ascending' and 'descending' are the only valid values.")),
                        
                            
            });
            await course_modules.validateAsync(request.query);
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

    private getSearchFilters = (query): CourseModuleSearchFilters => {
        var filters = {};

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
        var durationInMins = query.durationInMins ? query.durationInMins : null;
        if (durationInMins != null) {
            filters['DurationInMins'] = durationInMins;
        }
        var courseId = query.courseId ? query.courseId : null;
        if (courseId != null) {
            filters['CourseId'] = courseId;
        }

        return filters;
    };
}