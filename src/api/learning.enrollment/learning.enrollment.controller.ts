import express from 'express';
import { ResponseHandler } from '../../common/handlers/response.handler';
import { LearningEnrollmentService } from '../../database/typeorm/services/learning.enrollment.service';
import { LearningEnrollmentValidator } from './learning.enrollment.validator';
import { LearningEnrollmentSearchFilters } from '../../domain.types/learning.enrollment.types';

export class LearningEnrollmentController {
    _service: LearningEnrollmentService = new LearningEnrollmentService();

    _validator: LearningEnrollmentValidator = new LearningEnrollmentValidator();

    enroll = async (request: express.Request, response: express.Response) => {
        try {
            const model = await this._validator.validateEnrollRequest(request);
            const record = await this._service.enroll(model);
            ResponseHandler.success(request, response, 'Enrollment created successfully!', 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            const filters: LearningEnrollmentSearchFilters = await this._validator.validateSearchRequest(request);
            const results = await this._service.search(filters);
            ResponseHandler.success(request, response, 'Learning enrollments retrieved successfully!', 200, {
                LearningEnrollments: results,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response) => {
        try {
            const id = await this._validator.requestParamAsUUID(request, 'id');
            const record = await this._service.getById(id);
            ResponseHandler.success(request, response, 'Learning enrollment retrieved successfully!', 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getUserEnrollments = async (request: express.Request, response: express.Response) => {
        try {
            const { userId } = await this._validator.validateUserContext(request);
            const includeInactiveParam = request.query.includeInactive;
            const includeInactive =
                includeInactiveParam === undefined
                    ? true
                    : includeInactiveParam.toString().toLowerCase() === 'true';
            const enrollments = await this._service.getUserEnrollments(userId, includeInactive);
            ResponseHandler.success(request, response, 'User enrollments retrieved successfully!', 200, {
                Enrollments: enrollments,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getUserActiveEnrollments = async (request: express.Request, response: express.Response) => {
        try {
            const { userId } = await this._validator.validateUserContext(request);
            const enrollments = await this._service.getUserActiveEnrollments(userId);
            ResponseHandler.success(request, response, 'User active enrollments retrieved successfully!', 200, {
                Enrollments: enrollments,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    stop = async (request: express.Request, response: express.Response) => {
        try {
            const { id, status } = await this._validator.validateStopRequest(request);
            const enrollment = await this._service.stop(id, status);
            ResponseHandler.success(request, response, 'Enrollment stopped successfully!', 200, enrollment);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response) => {
        try {
            const id = await this._validator.requestParamAsUUID(request, 'id');
            const deleted = await this._service.delete(id);
            ResponseHandler.success(request, response, 'Enrollment deleted successfully!', 200, { Deleted: deleted });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
}

