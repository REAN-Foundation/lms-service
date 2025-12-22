import express from 'express';
import { ResponseHandler } from '../../common/handlers/response.handler';
import { CourseEnrollmentService } from '../../database/typeorm/services/course.enrollment.service';
import { LearningPathEnrollmentService } from '../../database/typeorm/services/learning.path.enrollment.service';
import { UserService } from '../../database/typeorm/services/user.service';
import { LearningEnrollmentValidator } from './learning.enrollment.validator';

export class LearningEnrollmentController {
    _courseEnrollmentService: CourseEnrollmentService = new CourseEnrollmentService();
    _learningPathEnrollmentService: LearningPathEnrollmentService = new LearningPathEnrollmentService();
    _userService: UserService = new UserService();
    _validator: LearningEnrollmentValidator = new LearningEnrollmentValidator();

    enrollToCourse = async (request: express.Request, response: express.Response) => {
        try {
            const userId = await this._validator.requestParamAsUUID(request, 'userId');
            
            const userExists = await this._userService.userExists(userId);
            if (!userExists) {
                const authHeader = request.headers['authorization'];
                const accessToken = authHeader && authHeader.split(' ')[1];
                await this._userService.fetchAndSyncUser(userId, accessToken);
            }

            const model = await this._validator.validateEnrollToCourseRequest(request);
            const record = await this._courseEnrollmentService.enroll(model);
            ResponseHandler.success(request, response, 'Course enrollment created successfully!', 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    enrollToLearningPath = async (request: express.Request, response: express.Response) => {
        try {
            const userId = await this._validator.requestParamAsUUID(request, 'userId');
            
            const userExists = await this._userService.userExists(userId);
            if (!userExists) {
                const authHeader = request.headers['authorization'];
                const accessToken = authHeader && authHeader.split(' ')[1];
                await this._userService.fetchAndSyncUser(userId, accessToken);
            }

            const model = await this._validator.validateEnrollToLearningPathRequest(request);
            const record = await this._learningPathEnrollmentService.enroll(model);
            ResponseHandler.success(request, response, 'Learning path enrollment created successfully!', 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            const { courseFilters, learningPathFilters } = await this._validator.validateSearchRequest(request);
            const courseResults = courseFilters ? await this._courseEnrollmentService.search(courseFilters) : null;
            const learningPathResults = learningPathFilters ? await this._learningPathEnrollmentService.search(learningPathFilters) : null;
            
            ResponseHandler.success(request, response, 'Enrollments retrieved successfully!', 200, {
                CourseEnrollments: courseResults,
                LearningPathEnrollments: learningPathResults,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response) => {
        try {
            const id = await this._validator.requestParamAsUUID(request, 'id');
            
            // Try course enrollment first
            let record = null;
            try {
                record = await this._courseEnrollmentService.getById(id);
                if (record) {
                    ResponseHandler.success(request, response, 'Course enrollment retrieved successfully!', 200, record);
                    return;
                }
            } catch (error) {
                // If not found, try learning path enrollment
            }
            
            // Try learning path enrollment
            record = await this._learningPathEnrollmentService.getById(id);
            ResponseHandler.success(request, response, 'Learning path enrollment retrieved successfully!', 200, record);
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
            
            const courseEnrollments = await this._courseEnrollmentService.getUserEnrollments(userId, includeInactive);
            const learningPathEnrollments = await this._learningPathEnrollmentService.getUserEnrollments(userId, includeInactive);
            
            ResponseHandler.success(request, response, 'User enrollments retrieved successfully!', 200, {
                CourseEnrollments: courseEnrollments,
                LearningPathEnrollments: learningPathEnrollments,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getUserActiveEnrollments = async (request: express.Request, response: express.Response) => {
        try {
            const { userId } = await this._validator.validateUserContext(request);
            const courseEnrollments = await this._courseEnrollmentService.getUserActiveEnrollments(userId);
            const learningPathEnrollments = await this._learningPathEnrollmentService.getUserActiveEnrollments(userId);
            
            ResponseHandler.success(request, response, 'User active enrollments retrieved successfully!', 200, {
                CourseEnrollments: courseEnrollments,
                LearningPathEnrollments: learningPathEnrollments,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getActiveEnrollments = async (request: express.Request, response: express.Response) => {
        try {
            const { tenantId } = await this._validator.validateTenantContext(request);
            const courseEnrollments = await this._courseEnrollmentService.getActiveEnrollmentsByTenant(tenantId);
            const learningPathEnrollments = await this._learningPathEnrollmentService.getActiveEnrollmentsByTenant(tenantId);
            
            ResponseHandler.success(request, response, 'Active enrollments retrieved successfully!', 200, {
                CourseEnrollments: courseEnrollments,
                LearningPathEnrollments: learningPathEnrollments,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response) => {
        try {
            const id = await this._validator.requestParamAsUUID(request, 'id');
            
            // Try course enrollment first
            let deleted = false;
            try {
                deleted = await this._courseEnrollmentService.delete(id);
                if (deleted) {
                    ResponseHandler.success(request, response, 'Course enrollment deleted successfully!', 200, { Deleted: deleted });
                    return;
                }
            } catch (error) {
                // If not found, try learning path enrollment
            }
            
            // Try learning path enrollment
            deleted = await this._learningPathEnrollmentService.delete(id);
            ResponseHandler.success(request, response, 'Learning path enrollment deleted successfully!', 200, { Deleted: deleted });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
}

