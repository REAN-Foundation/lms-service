import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import BaseValidator from '../base.validator';
import { CourseEnrollmentCreateModel, CourseEnrollmentSearchFilters } from '../../domain.types/course.enrollment.types';
import {
    LearningPathEnrollmentCreateModel,
    LearningPathEnrollmentSearchFilters,
} from '../../domain.types/learning.path.enrollment.types';
import { uuid } from '../../domain.types/miscellaneous/system.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class LearningEnrollmentValidator extends BaseValidator {
    public validateEnrollToLearningPathRequest = async (
        request: express.Request
    ): Promise<LearningPathEnrollmentCreateModel> => {
        try {
            const userId = await this.requestParamAsUUID(request, 'userId');
            const learningPathId = await this.requestParamAsUUID(request, 'learningPathId');
            const learning_path_enrollments = joi.object({
                StartDate: joi.date().iso().optional(),
                ExpectedEndDate: joi.date().iso().optional(),
            });
            await learning_path_enrollments.validateAsync(request.body);

            const model: LearningPathEnrollmentCreateModel = {
                UserId: userId,
                LearningPathId: learningPathId,
                StartDate: request.body.StartDate ? new Date(request.body.StartDate) : undefined,
                ExpectedEndDate: request.body.ExpectedEndDate ? new Date(request.body.ExpectedEndDate) : undefined,
            };

            return model;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateEnrollToCourseRequest = async (request: express.Request): Promise<CourseEnrollmentCreateModel> => {
        try {
            const userId = await this.requestParamAsUUID(request, 'userId');
            const courseId = await this.requestParamAsUUID(request, 'courseId');
            const course_enrollments = joi.object({
                StartDate: joi.date().iso().optional(),
                ExpectedEndDate: joi.date().iso().optional(),
            });
            await course_enrollments.validateAsync(request.body);

            const model: CourseEnrollmentCreateModel = {
                UserId: userId,
                CourseId: courseId,
                StartDate: request.body.StartDate ? new Date(request.body.StartDate) : undefined,
                ExpectedEndDate: request.body.ExpectedEndDate ? new Date(request.body.ExpectedEndDate) : undefined,
            };

            return model;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSearchRequest = async (
        request: express.Request
    ): Promise<{
        courseFilters?: CourseEnrollmentSearchFilters;
        learningPathFilters?: LearningPathEnrollmentSearchFilters;
    }> => {
        try {
            const enrollments = joi.object({
                userId: joi.string().uuid().optional(),
                courseId: joi.string().uuid().optional(),
                learningPathId: joi.string().uuid().optional(),
                isActive: joi.boolean().optional(),
                tenantId: joi.string().uuid().optional(),
                pageIndex: joi.number().min(0).optional(),
                itemsPerPage: joi.number().min(1).optional(),
                orderBy: joi.string().max(256).optional(),
                order: joi
                    .string()
                    .valid('ascending', 'descending')
                    .optional()
                    .error(() => new Error("order param: 'ascending' and 'descending' are the only valid values.")),
            });
            await enrollments.validateAsync(request.query);

            const courseFilters = this.getCourseEnrollmentSearchFilters(request.query);
            const learningPathFilters = this.getLearningPathEnrollmentSearchFilters(request.query);
            const baseFilters = await this.getBaseSearchFilters(request);

            return {
                courseFilters: {
                    ...baseFilters,
                    ...courseFilters,
                },
                learningPathFilters: {
                    ...baseFilters,
                    ...learningPathFilters,
                },
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    private getCourseEnrollmentSearchFilters = (query): CourseEnrollmentSearchFilters => {
        var filters = {};

        var userId = query.userId ? query.userId : null;
        if (userId != null) {
            filters['UserId'] = userId;
        }

        var courseId = query.courseId ? query.courseId : null;
        if (courseId != null) {
            filters['CourseId'] = courseId;
        }

        if (query.isActive !== undefined) {
            const isActiveValue = String(query.isActive);
            filters['IsActive'] = isActiveValue === 'true' || isActiveValue === '1';
        }

        var tenantId = query.tenantId ? query.tenantId : null;
        if (tenantId != null) {
            filters['TenantId'] = tenantId;
        }

        return filters;
    };

    private getLearningPathEnrollmentSearchFilters = (query): LearningPathEnrollmentSearchFilters => {
        var filters = {};

        var userId = query.userId ? query.userId : null;
        if (userId != null) {
            filters['UserId'] = userId;
        }

        var learningPathId = query.learningPathId ? query.learningPathId : null;
        if (learningPathId != null) {
            filters['LearningPathId'] = learningPathId;
        }

        if (query.isActive !== undefined) {
            const isActiveValue = String(query.isActive);
            filters['IsActive'] = isActiveValue === 'true' || isActiveValue === '1';
        }

        var tenantId = query.tenantId ? query.tenantId : null;
        if (tenantId != null) {
            filters['TenantId'] = tenantId;
        }

        return filters;
    };

    public async validateUserContext(request: express.Request): Promise<{ userId: uuid }> {
        const userId = await this.requestParamAsUUID(request, 'userId');
        return { userId };
    }

    public async validateTenantContext(request: express.Request): Promise<{ tenantId: uuid }> {
        const tenantId = await this.requestParamAsUUID(request, 'tenantId');
        return { tenantId };
    }
}
