import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import BaseValidator from '../base.validator';
import { TypeUtils } from '../../common/utilities/type.utils';
import { 
    CertificatesCreateModel, 
    CertificatesUpdateModel, 
    CertificatesSearchFilters 
} from '../../domain.types/certificates.types';


///////////////////////////////////////////////////////////////////////////////////////////////

export class CertificatesValidator extends BaseValidator {

    public validateCreateRequest = async (request: express.Request)
        : Promise<CertificatesCreateModel> => {
        try {
            const certificates = joi.object({
                                UserId: joi.string().uuid().required(),
                CertificateNumber: joi.string().max(64).min(0).required(),
                CertificateName: joi.string().max(64).min(0).required(),
                CertificateType: joi.string().max(64).min(0).required(),
                IssuedDate: joi.string().max(64).min(0).required(),
                ExpiryDate: joi.date().iso().required(),
                CertificateUrl: joi.string().max(64).min(0).required(),
                FinalGrade: joi.number().required(),
                CreditHours: joi.number().integer().required(),
                Skills: joi.string().max(64).min(0).required(),
                IsVerified: joi.boolean().required(),
                VerificationUrl: joi.string().max(64).min(0).required(),
                IssuedBy: joi.string().uuid().required(),
                CourseId: joi.string().uuid().required()
            });
            await certificates.validateAsync(request.body);
            const model: CertificatesCreateModel = {
                            UserId: request.body.UserId ? request.body.UserId : null,
            CertificateNumber: request.body.CertificateNumber ? request.body.CertificateNumber : null,
            CertificateName: request.body.CertificateName ? request.body.CertificateName : null,
            CertificateType: request.body.CertificateType ? request.body.CertificateType : null,
            IssuedDate: request.body.IssuedDate ? request.body.IssuedDate : null,
            ExpiryDate: request.body.ExpiryDate ? request.body.ExpiryDate : null,
            CertificateUrl: request.body.CertificateUrl ? request.body.CertificateUrl : null,
            FinalGrade: request.body.FinalGrade ? request.body.FinalGrade : null,
            CreditHours: request.body.CreditHours ? request.body.CreditHours : null,
            Skills: request.body.Skills ? request.body.Skills : null,
            IsVerified: request.body.IsVerified ? request.body.IsVerified : null,
            VerificationUrl: request.body.VerificationUrl ? request.body.VerificationUrl : null,
            IssuedBy: request.body.IssuedBy ? request.body.IssuedBy : null,
            CourseId: request.body.CourseId,
            };
            return model;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (request: express.Request)
        : Promise<CertificatesUpdateModel> => {
        try {
            const certificates = joi.object({
                                UserId: joi.string().uuid().optional(),
                CertificateNumber: joi.string().max(64).min(0).optional(),
                CertificateName: joi.string().max(64).min(0).optional(),
                CertificateType: joi.string().max(64).min(0).optional(),
                IssuedDate: joi.string().max(64).min(0).optional(),
                ExpiryDate: joi.date().iso().optional(),
                CertificateUrl: joi.string().max(64).min(0).optional(),
                FinalGrade: joi.number().optional(),
                CreditHours: joi.number().integer().optional(),
                Skills: joi.string().max(64).min(0).optional(),
                IsVerified: joi.boolean().optional(),
                VerificationUrl: joi.string().max(64).min(0).optional(),
                IssuedBy: joi.string().uuid().optional(),
                CourseId: joi.string().uuid().optional()
            });
            await certificates.validateAsync(request.body);
            
            const model: CertificatesUpdateModel = {};


            if (TypeUtils.hasProperty(request.body, 'UserId')) {
                model.UserId = request.body.UserId;
            }
            if (TypeUtils.hasProperty(request.body, 'CertificateNumber')) {
                model.CertificateNumber = request.body.CertificateNumber;
            }
            if (TypeUtils.hasProperty(request.body, 'CertificateName')) {
                model.CertificateName = request.body.CertificateName;
            }
            if (TypeUtils.hasProperty(request.body, 'CertificateType')) {
                model.CertificateType = request.body.CertificateType;
            }
            if (TypeUtils.hasProperty(request.body, 'IssuedDate')) {
                model.IssuedDate = request.body.IssuedDate;
            }
            if (TypeUtils.hasProperty(request.body, 'ExpiryDate')) {
                model.ExpiryDate = request.body.ExpiryDate;
            }
            if (TypeUtils.hasProperty(request.body, 'CertificateUrl')) {
                model.CertificateUrl = request.body.CertificateUrl;
            }
            if (TypeUtils.hasProperty(request.body, 'FinalGrade')) {
                model.FinalGrade = request.body.FinalGrade;
            }
            if (TypeUtils.hasProperty(request.body, 'CreditHours')) {
                model.CreditHours = request.body.CreditHours;
            }
            if (TypeUtils.hasProperty(request.body, 'Skills')) {
                model.Skills = request.body.Skills;
            }
            if (TypeUtils.hasProperty(request.body, 'IsVerified')) {
                model.IsVerified = request.body.IsVerified;
            }
            if (TypeUtils.hasProperty(request.body, 'VerificationUrl')) {
                model.VerificationUrl = request.body.VerificationUrl;
            }
            if (TypeUtils.hasProperty(request.body, 'IssuedBy')) {
                model.IssuedBy = request.body.IssuedBy;
            }
            if (TypeUtils.hasProperty(request.body, 'CourseId')) {
                model.CourseId = request.body.CourseId;
            }

            return model;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSearchRequest = async (request: express.Request)
        : Promise<CertificatesSearchFilters> => {
        try {
            const certificates = joi.object({
                                userId: joi.string().uuid().optional(),
                certificateNumber: joi.string().max(64).min(0).optional(),
                certificateName: joi.string().max(64).min(0).optional(),
                certificateType: joi.string().max(64).min(0).optional(),
                issuedDate: joi.string().max(64).min(0).optional(),
                expiryDate: joi.date().iso().optional(),
                certificateUrl: joi.string().max(64).min(0).optional(),
                finalGrade: joi.number().optional(),
                creditHours: joi.number().integer().optional(),
                skills: joi.string().max(64).min(0).optional(),
                isVerified: joi.boolean().optional(),
                verificationUrl: joi.string().max(64).min(0).optional(),
                issuedBy: joi.string().uuid().optional(),
                courseId: joi.string().uuid().optional()
            });
            await certificates.validateAsync(request.query);
            const filters = this.getSearchFilters(request.query);
            const baseFilters = await this.getBaseSearchFilters(request);
            return {
                ...baseFilters,
                ...filters
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    private getSearchFilters = (query): CertificatesSearchFilters => {

        var filters = {};

        
        var userId = query.userId ? query.userId : null;
        if (userId != null) {
             filters['UserId'] = userId;
        }
        var certificateNumber = query.certificateNumber ? query.certificateNumber : null;
        if (certificateNumber != null) {
             filters['CertificateNumber'] = certificateNumber;
        }
        var certificateName = query.certificateName ? query.certificateName : null;
        if (certificateName != null) {
             filters['CertificateName'] = certificateName;
        }
        var certificateType = query.certificateType ? query.certificateType : null;
        if (certificateType != null) {
             filters['CertificateType'] = certificateType;
        }
        var issuedDate = query.issuedDate ? query.issuedDate : null;
        if (issuedDate != null) {
             filters['IssuedDate'] = issuedDate;
        }
        var expiryDate = query.expiryDate ? query.expiryDate : null;
        if (expiryDate != null) {
             filters['ExpiryDate'] = expiryDate;
        }
        var certificateUrl = query.certificateUrl ? query.certificateUrl : null;
        if (certificateUrl != null) {
             filters['CertificateUrl'] = certificateUrl;
        }
        var finalGrade = query.finalGrade ? query.finalGrade : null;
        if (finalGrade != null) {
             filters['FinalGrade'] = finalGrade;
        }
        var creditHours = query.creditHours ? query.creditHours : null;
        if (creditHours != null) {
             filters['CreditHours'] = creditHours;
        }
        var skills = query.skills ? query.skills : null;
        if (skills != null) {
             filters['Skills'] = skills;
        }
        var isVerified = query.isVerified ? query.isVerified : null;
        if (isVerified != null) {
             filters['IsVerified'] = isVerified;
        }
        var verificationUrl = query.verificationUrl ? query.verificationUrl : null;
        if (verificationUrl != null) {
             filters['VerificationUrl'] = verificationUrl;
        }
        var issuedBy = query.issuedBy ? query.issuedBy : null;
        if (issuedBy != null) {
             filters['IssuedBy'] = issuedBy;
        }
        var courseId = query.courseId ? query.courseId : null;
        if (courseId != null) {
             filters['CourseId'] = courseId;
        }

        return filters;
    };

}
