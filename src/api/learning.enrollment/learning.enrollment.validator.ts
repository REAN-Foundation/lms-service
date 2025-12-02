import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import BaseValidator from '../base.validator';
import {
    LearningEnrollmentCreateModel,
    LearningEnrollmentSearchFilters,
} from '../../domain.types/learning.enrollment.types';
import { ProgressStatus } from '../../domain.types/enums/progress.status.enum';
import { uuid } from '../../domain.types/miscellaneous/system.types';

export class LearningEnrollmentValidator extends BaseValidator {
    public validateEnrollRequest = async (
        request: express.Request
    ): Promise<LearningEnrollmentCreateModel> => {
        try {
            const userId = await this.requestParamAsUUID(request, 'userId');
            const schema = joi
                .object({
                    CourseId: joi.string().uuid().optional(),
                    LearningPathId: joi.string().uuid().optional(),
                    TenantId: joi.string().uuid().optional(),
                    StartDate: joi.date().iso().optional(),
                    EndDate: joi.date().iso().optional(),
                    ProgressStatus: joi
                        .string()
                        .valid(...Object.values(ProgressStatus))
                        .optional(),
                })
                .or('CourseId', 'LearningPathId');
            await schema.validateAsync(request.body);

            const model: LearningEnrollmentCreateModel = {
                UserId: userId,
                CourseId: request.body.CourseId ?? null,
                LearningPathId: request.body.LearningPathId ?? null,
                TenantId: request.body.TenantId ?? null,
                StartDate: request.body.StartDate ? new Date(request.body.StartDate) : undefined,
                EndDate: request.body.EndDate ? new Date(request.body.EndDate) : undefined,
                ProgressStatus: request.body.ProgressStatus ?? null,
            };

            return model;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSearchRequest = async (
        request: express.Request
    ): Promise<LearningEnrollmentSearchFilters> => {
        try {
            const schema = joi.object({
                userId: joi.string().uuid().optional(),
                courseId: joi.string().uuid().optional(),
                learningPathId: joi.string().uuid().optional(),
                progressStatus: joi
                    .string()
                    .valid(...Object.values(ProgressStatus))
                    .optional(),
                isActive: joi.boolean().optional(),
                tenantId: joi.string().uuid().optional(),
            });
            await schema.validateAsync(request.query);
            const baseFilters = this.getBaseSearchFilters(request);
            const filters = this.getSearchFilters(request.query);
            return {
                ...baseFilters,
                ...filters,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateStopRequest = async (
        request: express.Request
    ): Promise<{ id: uuid; status?: ProgressStatus }> => {
        const id = await this.requestParamAsUUID(request, 'id');
        const schema = joi.object({
            ProgressStatus: joi
                .string()
                .valid(...Object.values(ProgressStatus))
                .optional(),
        });
        await schema.validateAsync(request.body ?? {});
        return {
            id,
            status: request.body?.ProgressStatus,
        };
    };

    public async validateUserContext(request: express.Request): Promise<{ userId: uuid }> {
        const userId = await this.requestParamAsUUID(request, 'userId');
        return { userId };
    }

    private getSearchFilters(query): LearningEnrollmentSearchFilters {
        const filters: LearningEnrollmentSearchFilters = {};

        if (query.userId) {
            filters.UserId = query.userId;
        }
        if (query.courseId) {
            filters.CourseId = query.courseId;
        }
        if (query.learningPathId) {
            filters.LearningPathId = query.learningPathId;
        }
        if (query.progressStatus) {
            filters.ProgressStatus = query.progressStatus;
        }
        if (query.isActive !== undefined) {
            filters.IsActive = query.isActive === 'true' || query.isActive === true;
        }
        if (query.tenantId) {
            filters.TenantId = query.tenantId;
        }

        return filters;
    }
}

