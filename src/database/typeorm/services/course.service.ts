import { FindManyOptions, Like, Repository } from 'typeorm';
import { logger } from '../../../logger/logger';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { Source } from '../typeorm.database.connector';
import { BaseService } from './base.service';
import {
    CourseCreateModel,
    CourseResponseDto,
    CourseSearchFilters,
    CourseSearchResults,
    CourseUpdateModel } from '../../../domain.types/course.types';
import { CourseMapper } from '../mappers/course.mapper';
import { CourseModuleMapper } from '../mappers/course.module.mapper';
import { CourseContentMapper } from '../mappers/course.content.mapper';
import { LearningPathMapper } from '../mappers/learning.path.mapper';
import { CourseModule } from '../models/course.module.entity';
import { LearningPathCourses } from '../models/learning.path.courses.entity';
import { CourseContent } from '../models/course.content.entity';
import { UserLearning } from '../models/user.learning.entity';
import { Certificates } from '../models/certificates.entity';
import { LearningPath } from '../models/learning.path.entity';

import { Course } from '../models/course.entity';

///////////////////////////////////////////////////////////////////////

export class CourseService extends BaseService {

    //#region Repositories

    _courseModuleRepository: Repository<CourseModule> = Source.getRepository(CourseModule);

_learningPathCoursesRepository: Repository<LearningPathCourses> = Source.getRepository(LearningPathCourses);

_courseContentRepository: Repository<CourseContent> = Source.getRepository(CourseContent);

_userLearningRepository: Repository<UserLearning> = Source.getRepository(UserLearning);

_certificatesRepository: Repository<Certificates> = Source.getRepository(Certificates);

_learningPathRepository: Repository<LearningPath> = Source.getRepository(LearningPath);

    _courseRepository: Repository<Course> = Source.getRepository(Course);

    //#endregion

    public create = async (createModel: CourseCreateModel)
        : Promise<CourseResponseDto> => {

        

        const course = this._courseRepository.create({
            
            TenantId : createModel.TenantId,
Name : createModel.Name,
Description : createModel.Description,
ImageUrl : createModel.ImageUrl,
DurationInDays : createModel.DurationInDays,

        });
        var record = await this._courseRepository.save(course);
        return CourseMapper.toResponseDto(record);
    };

    public getById = async (id: uuid): Promise<CourseResponseDto> => {
        try {
            var course = await this._courseRepository.findOne({
                where : {
                    id : id
                },
                relations: {
                    // Client: true
                    
                }
            });
            if (!course) {
                ErrorHandler.throwNotFoundError('Course not found!');
            }
            
            // Pipeline: Get modules for course
            const modules = await this._courseModuleRepository.find({
                where: { Course: { id: course.id } },
                relations: { Course: true, LearningPath: true }
            });
            
            // Pipeline: For each module, get contents
            for (const module of modules) {
                const contents = await this._courseContentRepository.find({
                    where: { CourseModule: { id: module.id } },
                    relations: { Course: true, LearningPath: true, CourseModule: true }
                });
                module['Contents'] = contents.map(x => CourseContentMapper.toResponseDto(x));
            }
            
            // Pipeline: Get learning paths for course
            const learningPathCourses = await this._learningPathCoursesRepository.find({
                where: { Course: { id: course.id } },
                relations: { LearningPath: true }
            });
            const learningPaths = learningPathCourses.map(lpc => lpc.LearningPath);
            
            // Enrich course object
            const courseDto = CourseMapper.toResponseDto(course);
            courseDto['Modules'] = modules.map(x => CourseModuleMapper.toResponseDto(x));
            courseDto['LearningPaths'] = learningPaths.map(x => LearningPathMapper.toResponseDto(x));
            
            return courseDto;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: CourseSearchFilters)
        : Promise<CourseSearchResults> => {
        try {
            var search = this.getSearchObject(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._courseRepository.findAndCount(search);
            const searchResults = {
                TotalCount     : count,
                RetrievedCount : list.length,
                PageIndex      : pageIndex,
                ItemsPerPage   : limit,
                Order          : order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy      : orderByColumn,
                Items          : list.map(x => CourseMapper.toResponseDto(x)),
            };
            return searchResults;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: CourseUpdateModel)
        : Promise<CourseResponseDto> => {
        try {
            const course = await this._courseRepository.findOne({
                where : {
                    id : id
                }
            });
            if (!course) {
                ErrorHandler.throwNotFoundError('Course not found!');
            }
            
                if (model.TenantId !== undefined && model.TenantId != null) {
                    course.TenantId = model.TenantId;
                }
                
                if (model.Name !== undefined && model.Name != null) {
                    course.Name = model.Name;
                }
                
                if (model.Description !== undefined && model.Description != null) {
                    course.Description = model.Description;
                }
                
                if (model.ImageUrl !== undefined && model.ImageUrl != null) {
                    course.ImageUrl = model.ImageUrl;
                }
                
                if (model.DurationInDays !== undefined && model.DurationInDays != null) {
                    course.DurationInDays = model.DurationInDays;
                }
                
            
            // if (model.ClientId != null) {
            //     const client = await this.getClient(model.ClientId);
            //     course.Client = client;
            // }
            var record = await this._courseRepository.save(course);
            return CourseMapper.toResponseDto(record);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._courseRepository.findOne({
                where : {
                    id : id
                }
            });
            var result = await this._courseRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchObject = (filters: CourseSearchFilters) => {

        var search : FindManyOptions<Course> = {
            relations : {
                // Client: true
                
            },
            where : {
            },
            select : {
                id      : true,
                TenantId: true,
Name: true,
Description: true,
ImageUrl: true,
DurationInDays: true,

                
                // Client       : {
                //     id  : true,
                //     Name: true,
                //     Code: true,
                // },
                CreatedAt  : true,
                UpdatedAt  : true,
            }
        };
        
                        if (filters.TenantId) {
                            search.where['TenantId'] = Like(`%${filters.TenantId}%`);
                        }
                        
                        if (filters.Name) {
                            search.where['Name'] = Like(`%${filters.Name}%`);
                        }
                        
                        if (filters.Description) {
                            search.where['Description'] = Like(`%${filters.Description}%`);
                        }
                        
                        if (filters.ImageUrl) {
                            search.where['ImageUrl'] = Like(`%${filters.ImageUrl}%`);
                        }
                        
                        if (filters.DurationInDays) {
                            search.where['DurationInDays'] = Like(`%${filters.DurationInDays}%`);
                        }
                        

        return search;
    };

    //#endregion

}
