import express from 'express';
import { ResponseHandler } from '../../common/handlers/response.handler';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { UserLearningValidator } from './user.learning.validator';
import { UserLearningService } from '../../database/typeorm/services/user.learning.service'
import { 
    UserLearningCreateModel, 
    UserLearningSearchFilters, 
    UserLearningUpdateModel 
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
            const message = 'User learning retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            var filters: UserLearningSearchFilters = await this._validator.validateSearchRequest(request);
            const searchResults = await this._service.search(filters);
            const message = 'User learning records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200,  { UserLearningRecords: searchResults});
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

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            var id: uuid = await this._validator.requestParamAsUUID(request, 'id');
            const result = await this._service.delete(id);
            const message = 'User learning deleted successfully!';
            ResponseHandler.success(request, response, message, 200, {deleted: result});
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
