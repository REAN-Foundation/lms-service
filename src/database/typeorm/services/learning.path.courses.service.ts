import { FindManyOptions, Like, Repository } from 'typeorm';
import { logger } from '../../../logger/logger';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { Source } from '../typeorm.database.connector';
import { BaseService } from './base.service';
import {
    LearningPathCoursesCreateModel,
    LearningPathCoursesResponseDto,
    LearningPathCoursesSearchFilters,
    LearningPathCoursesSearchResults,
    LearningPathCoursesUpdateModel } from '../../../domain.types/learning.path.courses.types';
import { LearningPathCoursesMapper } from '../mappers/learning.path.courses.mapper';
import { Course } from '../models/course.entity';
import { LearningPath } from '../models/learning.path.entity';

import { LearningPathCourses } from '../models/learning.path.courses.entity';

///////////////////////////////////////////////////////////////////////

export class LearningPathCoursesService extends BaseService {

    //#region Repositories

    _courseRepository: Repository<Course> = Source.getRepository(Course);

_learningPathRepository: Repository<LearningPath> = Source.getRepository(LearningPath);


    _learningPathCoursesRepository: Repository<LearningPathCourses> = Source.getRepository(LearningPathCourses);

    //#endregion

    public create = async (createModel: LearningPathCoursesCreateModel)
        : Promise<LearningPathCoursesResponseDto> => {

        const course = await this.getCourse(createModel.CourseId);
const learningPath = await this.getLearningPath(createModel.LearningPathId);


        const learningPathCourses = this._learningPathCoursesRepository.create({
            Course : course,
LearningPath : learningPath,

            
        });
        var record = await this._learningPathCoursesRepository.save(learningPathCourses);
        return LearningPathCoursesMapper.toResponseDto(record);
    };

    public getById = async (id: uuid): Promise<LearningPathCoursesResponseDto> => {
        try {
            var learningPathCourses = await this._learningPathCoursesRepository.findOne({
                where : {
                    id : id
                },
                relations: {
                    // Client: true
                    Course: true,
LearningPath: true,

                }
            });
            return LearningPathCoursesMapper.toResponseDto(learningPathCourses);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: LearningPathCoursesSearchFilters)
        : Promise<LearningPathCoursesSearchResults> => {
        try {
            var search = this.getSearchObject(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._learningPathCoursesRepository.findAndCount(search);
            const searchResults = {
                TotalCount     : count,
                RetrievedCount : list.length,
                PageIndex      : pageIndex,
                ItemsPerPage   : limit,
                Order          : order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy      : orderByColumn,
                Items          : list.map(x => LearningPathCoursesMapper.toResponseDto(x)),
            };
            return searchResults;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: LearningPathCoursesUpdateModel)
        : Promise<LearningPathCoursesResponseDto> => {
        try {
            const learningPathCourses = await this._learningPathCoursesRepository.findOne({
                where : {
                    id : id
                }
            });
            if (!learningPathCourses) {
                ErrorHandler.throwNotFoundError('Learning path courses not found!');
            }
            
            
                if (model.CourseId != null) {
                    const course = await this.getCourse(model.CourseId);
                    learningPathCourses.Course = course;
                }
                
                if (model.LearningPathId != null) {
                    const learningPath = await this.getLearningPath(model.LearningPathId);
                    learningPathCourses.LearningPath = learningPath;
                }
                
            // if (model.ClientId != null) {
            //     const client = await this.getClient(model.ClientId);
            //     learningPathCourses.Client = client;
            // }
            var record = await this._learningPathCoursesRepository.save(learningPathCourses);
            return LearningPathCoursesMapper.toResponseDto(record);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._learningPathCoursesRepository.findOne({
                where : {
                    id : id
                }
            });
            var result = await this._learningPathCoursesRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchObject = (filters: LearningPathCoursesSearchFilters) => {

        var search : FindManyOptions<LearningPathCourses> = {
            relations : {
                // Client: true
                Course: true,
LearningPath: true,

            },
            where : {
            },
            select : {
                id      : true,
                
                Course: {
id: true,
TenantId: true,
Name: true,
Description: true,
ImageUrl: true,
DurationInDays: true,
},
LearningPath: {
id: true,
TenantId: true,
Name: true,
Description: true,
ImageUrl: true,
DurationInDays: true,
PreferenceWeight: true,
Enabled: true,
},

                // Client       : {
                //     id  : true,
                //     Name: true,
                //     Code: true,
                // },
                CreatedAt  : true,
                UpdatedAt  : true,
            }
        };
        

        return search;
    };

    //#endregion

                private async getCourse(courseId: uuid) {
                    const course = await this._courseRepository.findOne({
                        where: {
                            id: courseId
                        }
                    });
                    if (!course) {
                        ErrorHandler.throwNotFoundError('Course cannot be found');
                    }
                    return course;
                }
                
                private async getLearningPath(learningPathId: uuid) {
                    const learningPath = await this._learningPathRepository.findOne({
                        where: {
                            id: learningPathId
                        }
                    });
                    if (!learningPath) {
                        ErrorHandler.throwNotFoundError('LearningPath cannot be found');
                    }
                    return learningPath;
                }
                
}
