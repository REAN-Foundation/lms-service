import { FindManyOptions, Like, Repository } from 'typeorm';
import { logger } from '../../../logger/logger';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { Source } from '../typeorm.database.connector';
import { BaseService } from './base.service';
import {
    CourseModuleCreateModel,
    CourseModuleResponseDto,
    CourseModuleSearchFilters,
    CourseModuleSearchResults,
    CourseModuleUpdateModel } from '../../../domain.types/course.module.types';
import { CourseModuleMapper } from '../mappers/course.module.mapper';
import { CourseContentMapper } from '../mappers/course.content.mapper';
import { Course } from '../models/course.entity';
import { LearningPath } from '../models/learning.path.entity';
import { CourseContent } from '../models/course.content.entity';
import { UserLearning } from '../models/user.learning.entity';

import { CourseModule } from '../models/course.module.entity';

///////////////////////////////////////////////////////////////////////

export class CourseModuleService extends BaseService {

    //#region Repositories

    _courseRepository: Repository<Course> = Source.getRepository(Course);

_learningPathRepository: Repository<LearningPath> = Source.getRepository(LearningPath);

_courseContentRepository: Repository<CourseContent> = Source.getRepository(CourseContent);

_userLearningRepository: Repository<UserLearning> = Source.getRepository(UserLearning);


    _courseModuleRepository: Repository<CourseModule> = Source.getRepository(CourseModule);

    //#endregion

    public create = async (createModel: CourseModuleCreateModel)
        : Promise<CourseModuleResponseDto> => {

        const course = await this.getCourse(createModel.CourseId);
const learningPath = await this.getLearningPath(createModel.LearningPathId);


        const courseModule = this._courseModuleRepository.create({
            Course : course,
LearningPath : learningPath,

            Name : createModel.Name,
Description : createModel.Description,
ImageUrl : createModel.ImageUrl,
DurationInMins : createModel.DurationInMins,
Sequence : createModel.Sequence,

        });
        var record = await this._courseModuleRepository.save(courseModule);
        return CourseModuleMapper.toResponseDto(record);
    };

    public getById = async (id: uuid): Promise<CourseModuleResponseDto> => {
        try {
            var courseModule = await this._courseModuleRepository.findOne({
                where : {
                    id : id
                },
                relations: {
                    // Client: true
                    Course: true,
LearningPath: true,

                }
            });
            if (!courseModule) {
                ErrorHandler.throwNotFoundError('Course module not found!');
            }
            
            // Pipeline: Get contents for module
            const contents = await this._courseContentRepository.find({
                where: { CourseModule: { id: courseModule.id } },
                relations: { Course: true, LearningPath: true, CourseModule: true }
            });
            
            // Enrich module object with contents
            const moduleDto = CourseModuleMapper.toResponseDto(courseModule);
            moduleDto['Contents'] = contents.map(x => CourseContentMapper.toResponseDto(x));
            
            return moduleDto;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: CourseModuleSearchFilters)
        : Promise<CourseModuleSearchResults> => {
        try {
            var search = this.getSearchObject(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._courseModuleRepository.findAndCount(search);
            const searchResults = {
                TotalCount     : count,
                RetrievedCount : list.length,
                PageIndex      : pageIndex,
                ItemsPerPage   : limit,
                Order          : order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy      : orderByColumn,
                Items          : list.map(x => CourseModuleMapper.toResponseDto(x)),
            };
            return searchResults;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: CourseModuleUpdateModel)
        : Promise<CourseModuleResponseDto> => {
        try {
            const courseModule = await this._courseModuleRepository.findOne({
                where : {
                    id : id
                }
            });
            if (!courseModule) {
                ErrorHandler.throwNotFoundError('Course module not found!');
            }
            
                if (model.Name !== undefined && model.Name != null) {
                    courseModule.Name = model.Name;
                }
                
                if (model.Description !== undefined && model.Description != null) {
                    courseModule.Description = model.Description;
                }
                
                if (model.ImageUrl !== undefined && model.ImageUrl != null) {
                    courseModule.ImageUrl = model.ImageUrl;
                }
                
                if (model.DurationInMins !== undefined && model.DurationInMins != null) {
                    courseModule.DurationInMins = model.DurationInMins;
                }
                
                if (model.Sequence !== undefined && model.Sequence != null) {
                    courseModule.Sequence = model.Sequence;
                }
                
            
                if (model.CourseId != null) {
                    const course = await this.getCourse(model.CourseId);
                    courseModule.Course = course;
                }
                
                if (model.LearningPathId != null) {
                    const learningPath = await this.getLearningPath(model.LearningPathId);
                    courseModule.LearningPath = learningPath;
                }
                
            // if (model.ClientId != null) {
            //     const client = await this.getClient(model.ClientId);
            //     courseModule.Client = client;
            // }
            var record = await this._courseModuleRepository.save(courseModule);
            return CourseModuleMapper.toResponseDto(record);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._courseModuleRepository.findOne({
                where : {
                    id : id
                }
            });
            var result = await this._courseModuleRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchObject = (filters: CourseModuleSearchFilters) => {

        var search : FindManyOptions<CourseModule> = {
            relations : {
                // Client: true
                Course: true,
LearningPath: true,

            },
            where : {
            },
            select : {
                id      : true,
                Name: true,
Description: true,
ImageUrl: true,
DurationInMins: true,
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

                // Client       : {
                //     id  : true,
                //     Name: true,
                //     Code: true,
                // },
                CreatedAt  : true,
                UpdatedAt  : true,
            }
        };
        
                        if (filters.Name) {
                            search.where['Name'] = Like(`%${filters.Name}%`);
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
                
}
