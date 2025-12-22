import express from 'express';
import { ResponseHandler } from '../../common/handlers/response.handler';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { CertificatesValidator } from './certificates.validator';
import { CertificatesService } from '../../database/typeorm/services/certificates.service';
import {
    CertificatesCreateModel,
    CertificatesSearchFilters,
    CertificatesUpdateModel,
} from '../../domain.types/certificates.types';

///////////////////////////////////////////////////////////////////////////////////////

export class CertificatesController {
    //#region member variables and constructors

    _service: CertificatesService = new CertificatesService();

    _validator: CertificatesValidator = new CertificatesValidator();

    //#endregion

    create = async (request: express.Request, response: express.Response) => {
        try {
            var model: CertificatesCreateModel = await this._validator.validateCreateRequest(request);
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to add certificates!');
            }
            const message = 'Certificates added successfully!';
            return ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response) => {
        try {
            var id: uuid = await this._validator.requestParamAsUUID(request, 'id');
            const record = await this._service.getById(id);
            const message = 'Certificates retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
            var filters: CertificatesSearchFilters = await this._validator.validateSearchRequest(request);
            const searchResults = await this._service.search(filters);
            const message = 'Certificates records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, { CertificatesRecords: searchResults });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response) => {
        try {
            const id = await this._validator.requestParamAsUUID(request, 'id');
            var model: CertificatesUpdateModel = await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);
            const message = 'Certificates updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            var id: uuid = await this._validator.requestParamAsUUID(request, 'id');
            const result = await this._service.delete(id);
            const message = 'Certificates deleted successfully!';
            ResponseHandler.success(request, response, message, 200, { deleted: result });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    downloadCourseCertificate = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const userId: uuid = request.currentUser.UserId;
            const courseId: uuid = await this._validator.requestParamAsUUID(request, 'courseId');
            const certificate = await this._service.getCertificateForCourse(userId, courseId);
            const message = 'Course certificate retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, certificate);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    downloadLearningPathCertificates = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const userId: uuid = request.currentUser.UserId;
            const learningPathId: uuid = await this._validator.requestParamAsUUID(request, 'learningPathId');
            const certificates = await this._service.getCertificatesForLearningPath(userId, learningPathId);
            const message = 'Learning path certificates retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, { Certificates: certificates });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
}
