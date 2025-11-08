import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import BaseValidator from '../base.validator';
import { TypeUtils } from '../../common/utilities/type.utils';
import { 
    LearningPathCoursesCreateModel, 
    LearningPathCoursesUpdateModel, 
    LearningPathCoursesSearchFilters 
} from '../../domain.types/learning.path.courses.types';


///////////////////////////////////////////////////////////////////////////////////////////////

export class LearningPathCoursesValidator extends BaseValidator {

    public validateCreateRequest = async (request: express.Request)
        : Promise<LearningPathCoursesCreateModel> => {
        try {
            const learning_path_courses = joi.object({
                                CourseId: joi.string().uuid().required(),
                LearningPathId: joi.string().uuid().required()
            });
            await learning_path_courses.validateAsync(request.body);
            const model: LearningPathCoursesCreateModel = {
                            CourseId: request.body.CourseId,
            LearningPathId: request.body.LearningPathId,
            };
            return model;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (request: express.Request)
        : Promise<LearningPathCoursesUpdateModel> => {
        try {
            const learning_path_courses = joi.object({
                                CourseId: joi.string().uuid().optional(),
                LearningPathId: joi.string().uuid().optional()
            });
            await learning_path_courses.validateAsync(request.body);
            
            const model: LearningPathCoursesUpdateModel = {};


            if (TypeUtils.hasProperty(request.body, 'CourseId')) {
                model.CourseId = request.body.CourseId;
            }
            if (TypeUtils.hasProperty(request.body, 'LearningPathId')) {
                model.LearningPathId = request.body.LearningPathId;
            }

            return model;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSearchRequest = async (request: express.Request)
        : Promise<LearningPathCoursesSearchFilters> => {
        try {
            const learning_path_courses = joi.object({
                                courseId: joi.string().uuid().optional(),
                learningPathId: joi.string().uuid().optional()
            });
            await learning_path_courses.validateAsync(request.query);
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

    private getSearchFilters = (query): LearningPathCoursesSearchFilters => {

        var filters = {};

        
        var courseId = query.courseId ? query.courseId : null;
        if (courseId != null) {
             filters['CourseId'] = courseId;
        }
        var learningPathId = query.learningPathId ? query.learningPathId : null;
        if (learningPathId != null) {
             filters['LearningPathId'] = learningPathId;
        }

        return filters;
    };

}
