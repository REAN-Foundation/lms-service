import express from 'express';
import { ResponseHandler } from '../../common/handlers/response.handler';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { UserLearningValidator } from './user.learning.validator';
import { UserLearningService } from '../../database/typeorm/services/user.learning.service';
import {
    UserLearningCreateModel,
    UserLearningSearchFilters,
    UserLearningUpdateModel,
} from '../../domain.types/user.learning.types';

///////////////////////////////////////////////////////////////////////////////////////

export class UserLearningController {
    //#region member variables and constructors

    _service: UserLearningService = new UserLearningService();

    _validator: UserLearningValidator = new UserLearningValidator();

    //#endregion

    create = async (request: express.Request, response: express.Response) => {
        try {
            var model: UserLearningCreateModel = await this._validator.validateCreateRequest(request);
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to add user learning!');
            }
            const message = 'User learning added successfully!';
            return ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response) => {
        try {
            var id: uuid = await this._validator.requestParamAsUUID(request, 'id');
            const record = await this._service.getById(id);
            if (record == null) {
                ErrorHandler.throwNotFoundError('User learning not found.');
            }
            const message = 'User learning retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, { UserLearning: record });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            var filters: UserLearningSearchFilters = await this._validator.validateSearchRequest(request);
            const searchResults = await this._service.search(filters);
            const message = 'User learning records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, { UserLearningRecords: searchResults });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response) => {
        try {
            const id = await this._validator.requestParamAsUUID(request, 'id');
            var model: UserLearningUpdateModel = await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);
            const message = 'User learning updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            var id: uuid = await this._validator.requestParamAsUUID(request, 'id');
            const result = await this._service.delete(id);
            const message = 'User learning deleted successfully!';
            ResponseHandler.success(request, response, message, 200, { deleted: result });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    updateUserLearning = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const model = await this._validator.validateUpdateUserLearning(request);
            const userLearning = await this._service.updateUserLearning(
                model.UserId,
                model.ContentId,
                model.LearningPathId ?? null,
                model.CourseId ?? null,
                model.ModuleId ?? null,
                model.ProgressStatus ?? null,
            );
            if (userLearning == null) {
                ErrorHandler.throwInternalServerError('Can not update user learning!');
            }
            const message = 'User learning updated successfully!';
            ResponseHandler.success(request, response, message, 201, { courseContent: userLearning });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getUserLearningPaths = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const userId: uuid = await this._validator.requestParamAsUUID(request, 'userId');
            const paths = await this._service.getUserLearningPaths(userId);
            if (paths == null) {
                ErrorHandler.throwNotFoundError('User learning paths cannot be retrieved.');
            }
            for await (var path of paths) {
                const percentageCompletion = await this._service.getLearningPathProgress(userId, path.id);
                path['PercentageCompletion'] = percentageCompletion;
            }
            const message = 'User learning paths retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, { UserLearningPaths: paths });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getUserCourseContents = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const userId: uuid = await this._validator.requestParamAsUUID(request, 'userId');
            const learningPathId: uuid = (request.query['learningPathId'] as string) ?? null;
            const contents = await this._service.getUserCourseContents(userId, learningPathId);
            if (contents == null) {
                ErrorHandler.throwNotFoundError('User course contents cannot be retrieved.');
            }
            for await (var content of contents) {
                const percentageCompletion = await this._service.getContentProgress(userId, content.ContentId);
                content['PercentageCompletion'] = percentageCompletion;
            }
            const message = 'User course contents retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, { UserCourseContents: contents });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getLearningPathProgress = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const userId: uuid = await this._validator.requestParamAsUUID(request, 'userId');
            const learningPathId: uuid = await this._validator.requestParamAsUUID(request, 'learningPathId');
            const progress = await this._service.getLearningPathProgress(userId, learningPathId);
            if (progress == null) {
                ErrorHandler.throwNotFoundError('Learning path progress cannot be retrieved.');
            }
            const message = 'Learning path progress retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, { LearningPathProgress: progress });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getCourseProgress = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const userId: uuid = await this._validator.requestParamAsUUID(request, 'userId');
            const courseId: uuid = await this._validator.requestParamAsUUID(request, 'courseId');
            const progress = await this._service.getCourseProgress(userId, courseId);
            if (progress == null) {
                ErrorHandler.throwNotFoundError('Course progress cannot be retrieved.');
            }
            const message = 'Course progress retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, { CourseProgress: progress });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getModuleProgress = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const userId: uuid = await this._validator.requestParamAsUUID(request, 'userId');
            const moduleId: uuid = await this._validator.requestParamAsUUID(request, 'moduleId');
            const progress = await this._service.getModuleProgress(userId, moduleId);
            if (progress == null) {
                ErrorHandler.throwNotFoundError('Course module progress cannot be retrieved.');
            }
            const message = 'Course module progress retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, { CourseModule: progress });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getContentProgress = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const userId: uuid = await this._validator.requestParamAsUUID(request, 'userId');
            const contentId: uuid = await this._validator.requestParamAsUUID(request, 'contentId');
            const progress = await this._service.getContentProgress(userId, contentId);
            if (progress == null) {
                ErrorHandler.throwNotFoundError('Course content progress cannot be retrieved.');
            }
            const message = 'Course content progress retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, { ContentProgress: progress });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
}
