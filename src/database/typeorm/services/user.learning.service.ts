import { FindManyOptions, Like, Repository } from 'typeorm';
import { logger } from '../../../logger/logger';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { Source } from '../typeorm.database.connector';
import { BaseService } from './base.service';
import {
    UserLearningCreateModel,
    UserLearningResponseDto,
    UserLearningSearchFilters,
    UserLearningSearchResults,
    UserLearningUpdateModel } from '../../../domain.types/user.learning.types';
import { UserLearningMapper } from '../mappers/user.learning.mapper';
import { Course } from '../models/course.entity';
import { LearningPath } from '../models/learning.path.entity';
import { CourseModule } from '../models/course.module.entity';
import { CourseContent } from '../models/course.content.entity';

import { UserLearning } from '../models/user.learning.entity';

///////////////////////////////////////////////////////////////////////

export class UserLearningService extends BaseService {

    //#region Repositories

    _courseRepository: Repository<Course> = Source.getRepository(Course);

_learningPathRepository: Repository<LearningPath> = Source.getRepository(LearningPath);

_courseModuleRepository: Repository<CourseModule> = Source.getRepository(CourseModule);

_courseContentRepository: Repository<CourseContent> = Source.getRepository(CourseContent);


    _userLearningRepository: Repository<UserLearning> = Source.getRepository(UserLearning);

    //#endregion

    public create = async (createModel: UserLearningCreateModel)
        : Promise<UserLearningResponseDto> => {

        const course = await this.getCourse(createModel.CourseId);
const learningPath = await this.getLearningPath(createModel.LearningPathId);
const courseModule = await this.getCourseModule(createModel.CourseModuleId);
const courseContent = await this.getCourseContent(createModel.CourseContentId);


        const userLearning = this._userLearningRepository.create({
            Course : course,
LearningPath : learningPath,
CourseModule : courseModule,
CourseContent : courseContent,

            UserId : createModel.UserId,
ActionId : createModel.ActionId,
ProgressStatus : createModel.ProgressStatus,
PercentageCompletion : createModel.PercentageCompletion,

        });
        var record = await this._userLearningRepository.save(userLearning);
        return UserLearningMapper.toResponseDto(record);
    };

    public getById = async (id: uuid): Promise<UserLearningResponseDto> => {
        try {
            var userLearning = await this._userLearningRepository.findOne({
                where : {
                    id : id
                },
                relations: {
                    // Client: true
                    Course: true,
LearningPath: true,
CourseModule: true,
CourseContent: true,

                }
            });
            return UserLearningMapper.toResponseDto(userLearning);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: UserLearningSearchFilters)
        : Promise<UserLearningSearchResults> => {
        try {
            var search = this.getSearchObject(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._userLearningRepository.findAndCount(search);
            const searchResults = {
                TotalCount     : count,
                RetrievedCount : list.length,
                PageIndex      : pageIndex,
                ItemsPerPage   : limit,
                Order          : order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy      : orderByColumn,
                Items          : list.map(x => UserLearningMapper.toResponseDto(x)),
            };
            return searchResults;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: UserLearningUpdateModel)
        : Promise<UserLearningResponseDto> => {
        try {
            const userLearning = await this._userLearningRepository.findOne({
                where : {
                    id : id
                }
            });
            if (!userLearning) {
                ErrorHandler.throwNotFoundError('User learning not found!');
            }
            
                if (model.UserId !== undefined && model.UserId != null) {
                    userLearning.UserId = model.UserId;
                }
                
                if (model.ActionId !== undefined && model.ActionId != null) {
                    userLearning.ActionId = model.ActionId;
                }
                
                if (model.ProgressStatus !== undefined && model.ProgressStatus != null) {
                    userLearning.ProgressStatus = model.ProgressStatus;
                }
                
                if (model.PercentageCompletion !== undefined && model.PercentageCompletion != null) {
                    userLearning.PercentageCompletion = model.PercentageCompletion;
                }
                
            
                if (model.CourseId != null) {
                    const course = await this.getCourse(model.CourseId);
                    userLearning.Course = course;
                }
                
                if (model.LearningPathId != null) {
                    const learningPath = await this.getLearningPath(model.LearningPathId);
                    userLearning.LearningPath = learningPath;
                }
                
                if (model.CourseModuleId != null) {
                    const courseModule = await this.getCourseModule(model.CourseModuleId);
                    userLearning.CourseModule = courseModule;
                }
                
                if (model.CourseContentId != null) {
                    const courseContent = await this.getCourseContent(model.CourseContentId);
                    userLearning.CourseContent = courseContent;
                }
                
            // if (model.ClientId != null) {
            //     const client = await this.getClient(model.ClientId);
            //     userLearning.Client = client;
            // }
            var record = await this._userLearningRepository.save(userLearning);
            return UserLearningMapper.toResponseDto(record);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._userLearningRepository.findOne({
                where : {
                    id : id
                }
            });
            var result = await this._userLearningRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchObject = (filters: UserLearningSearchFilters) => {

        var search : FindManyOptions<UserLearning> = {
            relations : {
                // Client: true
                Course: true,
LearningPath: true,
CourseModule: true,
CourseContent: true,

            },
            where : {
            },
            select : {
                id      : true,
                UserId: true,
ActionId: true,
ProgressStatus: true,
PercentageCompletion: true,

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
CourseModule: {
id: true,
Name: true,
Description: true,
ImageUrl: true,
DurationInMins: true,
Sequence: true,
},
CourseContent: {
id: true,
Title: true,
Description: true,
ImageUrl: true,
DurationInMins: true,
ContentType: true,
ResourceLink: true,
ActionTemplateId: true,
Sequence: true,
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
        
                        if (filters.UserId) {
                            search.where['UserId'] = Like(`%${filters.UserId}%`);
                        }
                        
                        if (filters.ActionId) {
                            search.where['ActionId'] = Like(`%${filters.ActionId}%`);
                        }
                        
                        if (filters.ProgressStatus) {
                            search.where['ProgressStatus'] = Like(`%${filters.ProgressStatus}%`);
                        }
                        
                        if (filters.PercentageCompletion) {
                            search.where['PercentageCompletion'] = Like(`%${filters.PercentageCompletion}%`);
                        }
                        

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
                
                private async getCourseModule(courseModuleId: uuid) {
                    const courseModule = await this._courseModuleRepository.findOne({
                        where: {
                            id: courseModuleId
                        }
                    });
                    if (!courseModule) {
                        ErrorHandler.throwNotFoundError('CourseModule cannot be found');
                    }
                    return courseModule;
                }
                
                private async getCourseContent(courseContentId: uuid) {
                    const courseContent = await this._courseContentRepository.findOne({
                        where: {
                            id: courseContentId
                        }
                    });
                    if (!courseContent) {
                        ErrorHandler.throwNotFoundError('CourseContent cannot be found');
                    }
                    return courseContent;
                }
                
}
