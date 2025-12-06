import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import BaseValidator from '../base.validator';
import {
    CourseEnrollmentCreateModel,
    CourseEnrollmentSearchFilters,
} from '../../domain.types/course.enrollment.types';
import {
    LearningPathEnrollmentCreateModel,
    LearningPathEnrollmentSearchFilters,
} from '../../domain.types/learning.path.enrollment.types';
import { uuid } from '../../domain.types/miscellaneous/system.types';

export class LearningEnrollmentValidator extends BaseValidator {

    public validateEnrollToLearningPathRequest = async (
        request: express.Request
    ): Promise<LearningPathEnrollmentCreateModel> => {
        try {
            const userId = await this.requestParamAsUUID(request, 'userId');
            const learningPathId = await this.requestParamAsUUID(request, 'learningPathId');
            const schema = joi
                .object({
                    StartDate: joi.date().iso().optional(),
                    ExpectedEndDate: joi.date().iso().optional(),
                });
            await schema.validateAsync(request.body);

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

    public validateEnrollToCourseRequest = async (
        request: express.Request
    ): Promise<CourseEnrollmentCreateModel> => {
        try {
            const userId = await this.requestParamAsUUID(request, 'userId');
            const courseId = await this.requestParamAsUUID(request, 'courseId');
            const schema = joi
                .object({
                    StartDate: joi.date().iso().optional(),
                    ExpectedEndDate: joi.date().iso().optional(),
                });
            await schema.validateAsync(request.body);

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
    ): Promise<{ courseFilters?: CourseEnrollmentSearchFilters; learningPathFilters?: LearningPathEnrollmentSearchFilters }> => {
        try {
            const schema = joi.object({
                userId: joi.string().uuid().optional(),
                courseId: joi.string().uuid().optional(),
                learningPathId: joi.string().uuid().optional(),
                isActive: joi.boolean().optional(),
                tenantId: joi.string().uuid().optional(),
            });
            await schema.validateAsync(request.query);
            const baseFilters = this.getBaseSearchFilters(request);
            
            const courseFilters: CourseEnrollmentSearchFilters = {
                ...baseFilters,
            };
            if (request.query.userId) courseFilters.UserId = request.query.userId as uuid;
            if (request.query.courseId) courseFilters.CourseId = request.query.courseId as uuid;
            if (request.query.isActive !== undefined) {
                const isActiveValue = String(request.query.isActive);
                courseFilters.IsActive = isActiveValue === 'true' || isActiveValue === '1';
            }
            if (request.query.tenantId) courseFilters.TenantId = request.query.tenantId as uuid;

            const learningPathFilters: LearningPathEnrollmentSearchFilters = {
                ...baseFilters,
            };
            if (request.query.userId) learningPathFilters.UserId = request.query.userId as uuid;
            if (request.query.learningPathId) learningPathFilters.LearningPathId = request.query.learningPathId as uuid;
            if (request.query.isActive !== undefined) {
                const isActiveValue = String(request.query.isActive);
                learningPathFilters.IsActive = isActiveValue === 'true' || isActiveValue === '1';
            }
            if (request.query.tenantId) learningPathFilters.TenantId = request.query.tenantId as uuid;

            return { courseFilters, learningPathFilters };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
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

