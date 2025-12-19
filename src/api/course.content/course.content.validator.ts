import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import BaseValidator from '../base.validator';
import { TypeUtils } from '../../common/utilities/type.utils';
import {
    CourseContentCreateModel,
    CourseContentUpdateModel,
    CourseContentSearchFilters,
} from '../../domain.types/course.content.types';
import { CourseContentType } from '../../domain.types/enums/course.content.type.enum';

///////////////////////////////////////////////////////////////////////////////////////////////

export class CourseContentValidator extends BaseValidator {
    public validateCreateRequest = async (request: express.Request): Promise<CourseContentCreateModel> => {
        try {
            const courseContents = joi.object({
                Title: joi.string().max(64).min(0).required(),
                Description: joi.string().max(2000).min(0).optional(),
                ImageUrl: joi.string().max(1000).min(0).optional(),
                DurationInMins: joi.number().integer().optional(),
                ContentType: joi
                    .string()
                    .valid(...Object.values(CourseContentType))
                    .required(),
                ResourceLink: joi.string().max(1000).min(0).optional(),
                ActionTemplateId: joi.string().uuid().optional(),
                Sequence: joi.number().integer().optional(),
                CourseId: joi.string().uuid().optional(),
                CourseModuleId: joi.string().uuid().required(),
            });
            await courseContents.validateAsync(request.body);
            const model: CourseContentCreateModel = {
                Title: request.body.Title ? request.body.Title : null,
                Description: request.body.Description ? request.body.Description : null,
                ImageUrl: request.body.ImageUrl ? request.body.ImageUrl : null,
                DurationInMins: request.body.DurationInMins ? request.body.DurationInMins : null,
                ContentType: request.body.ContentType ? request.body.ContentType : null,
                ResourceLink: request.body.ResourceLink ? request.body.ResourceLink : null,
                ActionTemplateId: request.body.ActionTemplateId ? request.body.ActionTemplateId : null,
                Sequence: request.body.Sequence ? request.body.Sequence : null,
                CourseId: request.body.CourseId,
                CourseModuleId: request.body.CourseModuleId,
            };
            return model;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (request: express.Request): Promise<CourseContentUpdateModel> => {
        try {
            const courseContents = joi.object({
                Title: joi.string().max(64).min(0).optional(),
                Description: joi.string().max(2000).min(0).optional(),
                ImageUrl: joi.string().max(1000).min(0).optional(),
                DurationInMins: joi.number().integer().optional(),
                ContentType: joi
                    .string()
                    .valid(...Object.values(CourseContentType))
                    .optional(),
                ResourceLink: joi.string().max(1000).min(0).optional(),
                ActionTemplateId: joi.string().uuid().optional(),
                Sequence: joi.number().integer().optional(),
                CourseId: joi.string().uuid().optional(),
                CourseModuleId: joi.string().uuid().optional(),
            });
            await courseContents.validateAsync(request.body);

            const model: CourseContentUpdateModel = {};

            if (TypeUtils.hasProperty(request.body, 'Title')) {
                model.Title = request.body.Title;
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
            if (TypeUtils.hasProperty(request.body, 'ContentType')) {
                model.ContentType = request.body.ContentType;
            }
            if (TypeUtils.hasProperty(request.body, 'ResourceLink')) {
                model.ResourceLink = request.body.ResourceLink;
            }
            if (TypeUtils.hasProperty(request.body, 'ActionTemplateId')) {
                model.ActionTemplateId = request.body.ActionTemplateId;
            }
            if (TypeUtils.hasProperty(request.body, 'Sequence')) {
                model.Sequence = request.body.Sequence;
            }
            if (TypeUtils.hasProperty(request.body, 'CourseId')) {
                model.CourseId = request.body.CourseId;
            }
            if (TypeUtils.hasProperty(request.body, 'CourseModuleId')) {
                model.CourseModuleId = request.body.CourseModuleId;
            }

            return model;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSearchRequest = async (request: express.Request): Promise<CourseContentSearchFilters> => {
        try {
            const courseContents = joi.object({
                title: joi.string().max(64).min(0).optional(),
                description: joi.string().max(2000).min(0).optional(),
                imageUrl: joi.string().max(1000).min(0).optional(),
                durationInMins: joi.number().integer().optional(),
                contentType: joi
                    .string()
                    .valid(...Object.values(CourseContentType))
                    .optional(),
                resourceLink: joi.string().max(1000).min(0).optional(),
                actionTemplateId: joi.string().uuid().optional(),
                sequence: joi.number().integer().optional(),
                courseId: joi.string().uuid().optional(),
                courseModuleId: joi.string().uuid().optional(),
                pageIndex: joi.number().min(0).optional(),
                itemsPerPage: joi.number().min(1).optional(),
                orderBy: joi.string().max(256).optional(),
                order: joi
                    .string()
                    .valid('ascending', 'descending')
                    .optional()
                    .error(() => new Error("order param: 'ascending' and 'descending' are the only valid values.")),
            });
            await courseContents.validateAsync(request.query);
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

    private getSearchFilters = (query): CourseContentSearchFilters => {
        var filters = {};

        var title = query.title ? query.title : null;
        if (title != null) {
            filters['Title'] = title;
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
        var contentType = query.contentType ? query.contentType : null;
        if (contentType != null) {
            filters['ContentType'] = contentType;
        }
        var resourceLink = query.resourceLink ? query.resourceLink : null;
        if (resourceLink != null) {
            filters['ResourceLink'] = resourceLink;
        }
        var actionTemplateId = query.actionTemplateId ? query.actionTemplateId : null;
        if (actionTemplateId != null) {
            filters['ActionTemplateId'] = actionTemplateId;
        }
        var sequence = query.sequence ? query.sequence : null;
        if (sequence != null) {
            filters['Sequence'] = sequence;
        }
        var courseId = query.courseId ? query.courseId : null;
        if (courseId != null) {
            filters['CourseId'] = courseId;
        }
        var courseModuleId = query.courseModuleId ? query.courseModuleId : null;
        if (courseModuleId != null) {
            filters['CourseModuleId'] = courseModuleId;
        }

        return filters;
    };
}
