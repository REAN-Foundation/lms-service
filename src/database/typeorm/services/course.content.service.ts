import { FindManyOptions, Like, Repository } from 'typeorm';
import { logger } from '../../../logger/logger';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { Source } from '../typeorm.database.connector';
import { BaseService } from './base.service';
import {
    CourseContentCreateModel,
    CourseContentResponseDto,
    CourseContentSearchFilters,
    CourseContentSearchResults,
    CourseContentUpdateModel } from '../../../domain.types/course.content.types';
import { CourseContentMapper } from '../mappers/course.content.mapper';
import { Course } from '../models/course.entity';
import { LearningPath } from '../models/learning.path.entity';
import { CourseModule } from '../models/course.module.entity';
import { UserLearning } from '../models/user.learning.entity';

import { CourseContent } from '../models/course.content.entity';

///////////////////////////////////////////////////////////////////////

export class CourseContentService extends BaseService {

    //#region Repositories

    _courseRepository: Repository<Course> = Source.getRepository(Course);

_learningPathRepository: Repository<LearningPath> = Source.getRepository(LearningPath);

_courseModuleRepository: Repository<CourseModule> = Source.getRepository(CourseModule);

_userLearningRepository: Repository<UserLearning> = Source.getRepository(UserLearning);


    _courseContentRepository: Repository<CourseContent> = Source.getRepository(CourseContent);

    //#endregion

    public create = async (createModel: CourseContentCreateModel)
        : Promise<CourseContentResponseDto> => {

        const course = await this.getCourse(createModel.CourseId);
const learningPath = await this.getLearningPath(createModel.LearningPathId);
const courseModule = await this.getCourseModule(createModel.CourseModuleId);


        const courseContent = this._courseContentRepository.create({
            Course : course,
LearningPath : learningPath,
CourseModule : courseModule,

            Title : createModel.Title,
Description : createModel.Description,
ImageUrl : createModel.ImageUrl,
DurationInMins : createModel.DurationInMins,
ContentType : createModel.ContentType,
ResourceLink : createModel.ResourceLink,
ActionTemplateId : createModel.ActionTemplateId,
Sequence : createModel.Sequence,

        });
        var record = await this._courseContentRepository.save(courseContent);
        return CourseContentMapper.toResponseDto(record);
    };

    public getById = async (id: uuid): Promise<CourseContentResponseDto> => {
        try {
            var courseContent = await this._courseContentRepository.findOne({
                where : {
                    id : id
                },
                relations: {
                    // Client: true
                    Course: true,
LearningPath: true,
CourseModule: true,

                }
            });
            return CourseContentMapper.toResponseDto(courseContent);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: CourseContentSearchFilters)
        : Promise<CourseContentSearchResults> => {
        try {
            var search = this.getSearchObject(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._courseContentRepository.findAndCount(search);
            const searchResults = {
                TotalCount     : count,
                RetrievedCount : list.length,
                PageIndex      : pageIndex,
                ItemsPerPage   : limit,
                Order          : order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy      : orderByColumn,
                Items          : list.map(x => CourseContentMapper.toResponseDto(x)),
            };
            return searchResults;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: CourseContentUpdateModel)
        : Promise<CourseContentResponseDto> => {
        try {
            const courseContent = await this._courseContentRepository.findOne({
                where : {
                    id : id
                }
            });
            if (!courseContent) {
                ErrorHandler.throwNotFoundError('Course content not found!');
            }
            
                if (model.Title !== undefined && model.Title != null) {
                    courseContent.Title = model.Title;
                }
                
                if (model.Description !== undefined && model.Description != null) {
                    courseContent.Description = model.Description;
                }
                
                if (model.ImageUrl !== undefined && model.ImageUrl != null) {
                    courseContent.ImageUrl = model.ImageUrl;
                }
                
                if (model.DurationInMins !== undefined && model.DurationInMins != null) {
                    courseContent.DurationInMins = model.DurationInMins;
                }
                
                if (model.ContentType !== undefined && model.ContentType != null) {
                    courseContent.ContentType = model.ContentType;
                }
                
                if (model.ResourceLink !== undefined && model.ResourceLink != null) {
                    courseContent.ResourceLink = model.ResourceLink;
                }
                
                if (model.ActionTemplateId !== undefined && model.ActionTemplateId != null) {
                    courseContent.ActionTemplateId = model.ActionTemplateId;
                }
                
                if (model.Sequence !== undefined && model.Sequence != null) {
                    courseContent.Sequence = model.Sequence;
                }
                
            
                if (model.CourseId != null) {
                    const course = await this.getCourse(model.CourseId);
                    courseContent.Course = course;
                }
                
                if (model.LearningPathId != null) {
                    const learningPath = await this.getLearningPath(model.LearningPathId);
                    courseContent.LearningPath = learningPath;
                }
                
                if (model.CourseModuleId != null) {
                    const courseModule = await this.getCourseModule(model.CourseModuleId);
                    courseContent.CourseModule = courseModule;
                }
                
            // if (model.ClientId != null) {
            //     const client = await this.getClient(model.ClientId);
            //     courseContent.Client = client;
            // }
            var record = await this._courseContentRepository.save(courseContent);
            return CourseContentMapper.toResponseDto(record);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._courseContentRepository.findOne({
                where : {
                    id : id
                }
            });
            var result = await this._courseContentRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchObject = (filters: CourseContentSearchFilters) => {

        var search : FindManyOptions<CourseContent> = {
            relations : {
                // Client: true
                Course: true,
LearningPath: true,
CourseModule: true,

            },
            where : {
            },
            select : {
                id      : true,
                Title: true,
Description: true,
ImageUrl: true,
DurationInMins: true,
ContentType: true,
ResourceLink: true,
ActionTemplateId: true,
Sequence: true,

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

                // Client       : {
                //     id  : true,
                //     Name: true,
                //     Code: true,
                // },
                CreatedAt  : true,
                UpdatedAt  : true,
            }
        };
        
                        if (filters.Title) {
                            search.where['Title'] = Like(`%${filters.Title}%`);
                        }
                        
                        if (filters.Description) {
                            search.where['Description'] = Like(`%${filters.Description}%`);
                        }
                        
                        if (filters.ImageUrl) {
                            search.where['ImageUrl'] = Like(`%${filters.ImageUrl}%`);
                        }
                        
                        if (filters.DurationInMins) {
                            search.where['DurationInMins'] = Like(`%${filters.DurationInMins}%`);
                        }
                        
                        if (filters.ContentType) {
                            search.where['ContentType'] = Like(`%${filters.ContentType}%`);
                        }
                        
                        if (filters.ResourceLink) {
                            search.where['ResourceLink'] = Like(`%${filters.ResourceLink}%`);
                        }
                        
                        if (filters.ActionTemplateId) {
                            search.where['ActionTemplateId'] = Like(`%${filters.ActionTemplateId}%`);
                        }
                        
                        if (filters.Sequence) {
                            search.where['Sequence'] = Like(`%${filters.Sequence}%`);
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
                
}
