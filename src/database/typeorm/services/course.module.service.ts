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
    CourseModuleUpdateModel,
} from '../../../domain.types/course.module.types';
import { CourseModuleMapper } from '../mappers/course.module.mapper';
import { CourseContentMapper } from '../mappers/course.content.mapper';
import { Course } from '../models/course.entity';
import { CourseContent } from '../models/course.content.entity';
import { UserLearning } from '../models/user.learning.entity';

import { CourseModule } from '../models/course.module.entity';

///////////////////////////////////////////////////////////////////////

export class CourseModuleService extends BaseService {
    //#region Repositories

    _courseRepository: Repository<Course> = Source.getRepository(Course);

    _courseContentRepository: Repository<CourseContent> = Source.getRepository(CourseContent);

    _userLearningRepository: Repository<UserLearning> = Source.getRepository(UserLearning);

    _courseModuleRepository: Repository<CourseModule> = Source.getRepository(CourseModule);

    //#endregion

    public create = async (createModel: CourseModuleCreateModel): Promise<CourseModuleResponseDto> => {
        const course = await this.getCourse(createModel.CourseId);

        const courseModule = this._courseModuleRepository.create({
            Course: course,

            Name: createModel.Name,
            Description: createModel.Description,
            ImageUrl: createModel.ImageUrl,
            DurationInMins: createModel.DurationInMins,
            // ContentSequence: createModel.ContentSequence, // Will be computed automatically when contents are added
        });
        var record = await this._courseModuleRepository.save(courseModule);
        
        // Update course's ModuleSequence field
        await this.updateCourseModuleSequence(course.id);
        
        return CourseModuleMapper.toResponseDto(record);
    };

    public getById = async (id: uuid): Promise<CourseModuleResponseDto> => {
        try {
            var courseModule = await this._courseModuleRepository.findOne({
                where: {
                    id: id,
                },
                relations: {
                    // Client: true
                    Course: true,
                },
            });
            if (!courseModule) {
                ErrorHandler.throwNotFoundError('Course module not found!');
            }

            // Pipeline: Get contents for module
            const contents = await this._courseContentRepository.find({
                where: { CourseModule: { id: courseModule.id } },
                relations: { Course: true, CourseModule: true },
            });

            // Enrich module object with contents
            const moduleDto = CourseModuleMapper.toResponseDto(courseModule);
            moduleDto['Contents'] = contents.map((x) => CourseContentMapper.toResponseDto(x));

            return moduleDto;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: CourseModuleSearchFilters): Promise<CourseModuleSearchResults> => {
        try {
            var search = this.getSearchObject(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._courseModuleRepository.findAndCount(search);
            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map((x) => CourseModuleMapper.toResponseDto(x)),
            };
            return searchResults;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: CourseModuleUpdateModel): Promise<CourseModuleResponseDto> => {
        try {
            const courseModule = await this._courseModuleRepository.findOne({
                where: {
                    id: id,
                },
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

            // if (model.ContentSequence !== undefined && model.ContentSequence != null) {
            //     courseModule.ContentSequence = model.ContentSequence;
            // }

            if (model.CourseId != null) {
                const course = await this.getCourse(model.CourseId);
                courseModule.Course = course;
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
                where: {
                    id: id,
                },
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
        var search: FindManyOptions<CourseModule> = {
            relations: {
                // Client: true
                Course: true,
            },
            where: {},
            select: {
                id: true,
                Name: true,
                Description: true,
                ImageUrl: true,
                DurationInMins: true,
                ContentSequence: true,

                Course: {
                    id: true,
                    TenantId: true,
                    Name: true,
                    Description: true,
                    ImageUrl: true,
                    DurationInDays: true,
                    ModuleSequence: true,
                },

                // Client       : {
                //     id  : true,
                //     Name: true,
                //     Code: true,
                // },
                CreatedAt: true,
                UpdatedAt: true,
            },
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

        if (filters.courseId) {
            search.where['Course'] = { id: filters.courseId };
        }

        return search;
    };

    //#endregion

    private async getCourse(courseId: uuid) {
        const course = await this._courseRepository.findOne({
            where: {
                id: courseId,
            },
        });
        if (!course) {
            ErrorHandler.throwNotFoundError('Course cannot be found');
        }
        return course;
    }

    private async updateCourseModuleSequence(courseId: uuid): Promise<void> {
        try {
            // Get all modules for this course, ordered by creation time (oldest first)
            const modules = await this._courseModuleRepository.find({
                where: { Course: { id: courseId } },
                order: { CreatedAt: 'ASC' },
            });

            // Create ModuleSequence object: { "module-uuid": sequence_number }
            // Sequence is assigned based on creation order (1, 2, 3, 4, ...)
            const moduleSequence: Record<string, number> = {};
            modules.forEach((module, index) => {
                moduleSequence[module.id] = index + 1;
            });

            // Update the course's ModuleSequence field
            await this._courseRepository.update(courseId, {
                ModuleSequence: moduleSequence,
            });
        } catch (error) {
            logger.error(`Error updating ModuleSequence for course ${courseId}: ${error.message}`);
            // Don't throw error, just log it - module creation should still succeed
        }
    }

}