import express from 'express';
import { ResponseHandler } from '../../common/handlers/response.handler';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { CourseModuleValidator } from './course.module.validator';
import { CourseModuleService } from '../../database/typeorm/services/course.module.service'
import { 
    CourseModuleCreateModel, 
    CourseModuleSearchFilters, 
    CourseModuleUpdateModel 
} from '../../domain.types/course.module.types';

///////////////////////////////////////////////////////////////////////////////////////

export class CourseModuleController {

    //#region member variables and constructors

    _service: CourseModuleService = new CourseModuleService();

    _validator: CourseModuleValidator = new CourseModuleValidator();

    //#endregion

    create = async (request: express.Request, response: express.Response) => {
        try {
            var model: CourseModuleCreateModel = await this._validator.validateCreateRequest(request);
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to add course module!');
            }
            const message = 'Course module added successfully!';
            return ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response) => {
        try {
            var id: uuid = await this._validator.requestParamAsUUID(request, 'id');
            const record = await this._service.getById(id);
            const message = 'Course module retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            var filters: CourseModuleSearchFilters = await this._validator.validateSearchRequest(request);
            const searchResults = await this._service.search(filters);
            const message = 'Course module records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200,  { CourseModuleRecords: searchResults});
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response) => {
        try {
            const id = await this._validator.requestParamAsUUID(request, 'id');
            var model: CourseModuleUpdateModel = await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);
            const message = 'Course module updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            var id: uuid = await this._validator.requestParamAsUUID(request, 'id');
            const result = await this._service.delete(id);
            const message = 'Course module deleted successfully!';
            ResponseHandler.success(request, response, message, 200, {deleted: result});
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
