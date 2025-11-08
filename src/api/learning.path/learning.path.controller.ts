import express from 'express';
import { ResponseHandler } from '../../common/handlers/response.handler';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { LearningPathValidator } from './learning.path.validator';
import { LearningPathService } from '../../database/typeorm/services/learning.path.service'
import { 
    LearningPathCreateModel, 
    LearningPathSearchFilters, 
    LearningPathUpdateModel 
} from '../../domain.types/learning.path.types';

///////////////////////////////////////////////////////////////////////////////////////

export class LearningPathController {

    //#region member variables and constructors

    _service: LearningPathService = new LearningPathService();

    _validator: LearningPathValidator = new LearningPathValidator();

    //#endregion

    create = async (request: express.Request, response: express.Response) => {
        try {
            var model: LearningPathCreateModel = await this._validator.validateCreateRequest(request);
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to add learning path!');
            }
            const message = 'Learning path added successfully!';
            return ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response) => {
        try {
            var id: uuid = await this._validator.requestParamAsUUID(request, 'id');
            const record = await this._service.getById(id);
            const message = 'Learning path retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            var filters: LearningPathSearchFilters = await this._validator.validateSearchRequest(request);
            const searchResults = await this._service.search(filters);
            const message = 'Learning path records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200,  { LearningPathRecords: searchResults});
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response) => {
        try {
            const id = await this._validator.requestParamAsUUID(request, 'id');
            var model: LearningPathUpdateModel = await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);
            const message = 'Learning path updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            var id: uuid = await this._validator.requestParamAsUUID(request, 'id');
            const result = await this._service.delete(id);
            const message = 'Learning path deleted successfully!';
            ResponseHandler.success(request, response, message, 200, {deleted: result});
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
