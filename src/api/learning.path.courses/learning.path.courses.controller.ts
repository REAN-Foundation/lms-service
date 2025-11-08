import express from 'express';
import { ResponseHandler } from '../../common/handlers/response.handler';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { LearningPathCoursesValidator } from './learning.path.courses.validator';
import { LearningPathCoursesService } from '../../database/typeorm/services/learning.path.courses.service'
import { 
    LearningPathCoursesCreateModel, 
    LearningPathCoursesSearchFilters, 
    LearningPathCoursesUpdateModel 
} from '../../domain.types/learning.path.courses.types';

///////////////////////////////////////////////////////////////////////////////////////

export class LearningPathCoursesController {

    //#region member variables and constructors

    _service: LearningPathCoursesService = new LearningPathCoursesService();

    _validator: LearningPathCoursesValidator = new LearningPathCoursesValidator();

    //#endregion

    create = async (request: express.Request, response: express.Response) => {
        try {
            var model: LearningPathCoursesCreateModel = await this._validator.validateCreateRequest(request);
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to add learning path courses!');
            }
            const message = 'Learning path courses added successfully!';
            return ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response) => {
        try {
            var id: uuid = await this._validator.requestParamAsUUID(request, 'id');
            const record = await this._service.getById(id);
            const message = 'Learning path courses retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            var filters: LearningPathCoursesSearchFilters = await this._validator.validateSearchRequest(request);
            const searchResults = await this._service.search(filters);
            const message = 'Learning path courses records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200,  { LearningPathCoursesRecords: searchResults});
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response) => {
        try {
            const id = await this._validator.requestParamAsUUID(request, 'id');
            var model: LearningPathCoursesUpdateModel = await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);
            const message = 'Learning path courses updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            var id: uuid = await this._validator.requestParamAsUUID(request, 'id');
            const result = await this._service.delete(id);
            const message = 'Learning path courses deleted successfully!';
            ResponseHandler.success(request, response, message, 200, {deleted: result});
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
