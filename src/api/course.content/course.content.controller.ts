import express from 'express';
import { ResponseHandler } from '../../common/handlers/response.handler';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { CourseContentValidator } from './course.content.validator';
import { CourseContentService } from '../../database/typeorm/services/course.content.service';
import {
    CourseContentCreateModel,
    CourseContentSearchFilters,
    CourseContentUpdateModel,
} from '../../domain.types/course.content.types';

///////////////////////////////////////////////////////////////////////////////////////

export class CourseContentController {
    //#region member variables and constructors

    _service: CourseContentService = new CourseContentService();

    _validator: CourseContentValidator = new CourseContentValidator();

    //#endregion

    create = async (request: express.Request, response: express.Response) => {
        try {
            var model: CourseContentCreateModel = await this._validator.validateCreateRequest(request);
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to add course content!');
            }
            const message = 'Course content added successfully!';
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
                ErrorHandler.throwNotFoundError('Course content not found.');
            }
            const message = 'Course content retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, { CourseContent: record });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            var filters: CourseContentSearchFilters = await this._validator.validateSearchRequest(request);
            const searchResults = await this._service.search(filters);
            const message = 'Course content records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, { CourseContentRecords: searchResults });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response) => {
        try {
            const id = await this._validator.requestParamAsUUID(request, 'id');
            var model: CourseContentUpdateModel = await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);
            const message = 'Course content updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            var id: uuid = await this._validator.requestParamAsUUID(request, 'id');
            const result = await this._service.delete(id);
            const message = 'Course content deleted successfully!';
            ResponseHandler.success(request, response, message, 200, { deleted: result });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getContentsForCourse = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const courseId: uuid = await this._validator.requestParamAsUUID(request, 'courseId');
            const courseContents = await this._service.getContentsForCourse(courseId);
            if (courseContents == null) {
                ErrorHandler.throwNotFoundError('Course contents not found.');
            }
            const message = 'Course contents for course retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, { CourseContents: courseContents });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    // getContentsForLearningPath = async (request: express.Request, response: express.Response): Promise<void> => {
    //     try {
    //         const learningPathId: uuid = await this._validator.requestParamAsUUID(request, 'learningPathId');
    //         const courseContents = await this._service.getContentsForLearningPath(learningPathId);
    //         if (courseContents == null) {
    //             ErrorHandler.throwNotFoundError('Course contents not found.');
    //         }
    //         ResponseHandler.success(
    //             request,
    //             response,
    //             'Course contents for learning path retrieved successfully!',
    //             200,
    //             {
    //                 CourseContents: courseContents,
    //             }
    //         );
    //     } catch (error) {
    //         ResponseHandler.handleError(request, response, error);
    //     }
    // };
}
