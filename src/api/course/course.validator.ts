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
                TenantId: joi.string().max(64).min(0).required(),
                Name: joi.string().max(64).min(0).required(),
                Description: joi.string().max(2000).min(0).required(),
                ImageUrl: joi.string().max(1000).min(0).required(),
                DurationInDays: joi.number().integer().required(),
            });
            await courses.validateAsync(request.body);
            const model: CourseCreateModel = {
                TenantId: request.body.TenantId ? request.body.TenantId : null,
                Name: request.body.Name ? request.body.Name : null,
                Description: request.body.Description ? request.body.Description : null,
                ImageUrl: request.body.ImageUrl ? request.body.ImageUrl : null,
                DurationInDays: request.body.DurationInDays ? request.body.DurationInDays : null,
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

        return filters;
    };
}
