import { FindManyOptions, Like, Repository } from 'typeorm';
import { logger } from '../../../logger/logger';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { Source } from '../typeorm.database.connector';
import { BaseService } from './base.service';
import {
    LearningPathCreateModel,
    LearningPathResponseDto,
    LearningPathSearchFilters,
    LearningPathSearchResults,
    LearningPathUpdateModel,
} from '../../../domain.types/learning.path.types';
import { LearningPathMapper } from '../mappers/learning.path.mapper';
import { CourseMapper } from '../mappers/course.mapper';
import { LearningPathCourses } from '../models/learning.path.courses.entity';
import { Course } from '../models/course.entity';

import { LearningPath } from '../models/learning.path.entity';

///////////////////////////////////////////////////////////////////////

export class LearningPathService extends BaseService {
    //#region Repositories

    _learningPathCoursesRepository: Repository<LearningPathCourses> = Source.getRepository(LearningPathCourses);

    _learningPathRepository: Repository<LearningPath> = Source.getRepository(LearningPath);

    _courseRepository: Repository<Course> = Source.getRepository(Course);

    //#endregion

    public create = async (createModel: LearningPathCreateModel): Promise<LearningPathResponseDto> => {
        const learningPath = this._learningPathRepository.create({
            TenantId: createModel.TenantId,
            Name: createModel.Name,
            Description: createModel.Description,
            ImageUrl: createModel.ImageUrl,
            DurationInDays: createModel.DurationInDays,
            PreferenceWeight: createModel.PreferenceWeight,
            Enabled: createModel.Enabled,
        });
        var record = await this._learningPathRepository.save(learningPath);
        
        // Add courses via junction table
        await this.addCourses(record.id, createModel.CourseIds);
        
        return LearningPathMapper.toResponseDto(record);
    };

    public getById = async (id: uuid): Promise<LearningPathResponseDto> => {
        try {
            var learningPath = await this._learningPathRepository.findOne({
                where: {
                    id: id,
                },
                relations: {
                    // Client: true
                },
            });
            if (!learningPath) {
                ErrorHandler.throwNotFoundError('Learning path not found!');
            }

            // Pipeline: Get courses for learning path
            const learningPathCourses = await this._learningPathCoursesRepository.find({
                where: { LearningPath: { id: learningPath.id } },
                relations: { Course: true },
            });
            const courses = learningPathCourses.map((lpc) => lpc.Course);

            // Enrich learning path object
            const learningPathDto = LearningPathMapper.toResponseDto(learningPath);
            learningPathDto['Courses'] = courses.map((x) => CourseMapper.toResponseDto(x));

            return learningPathDto;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: LearningPathSearchFilters): Promise<LearningPathSearchResults> => {
        try {
            var search = this.getSearchObject(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._learningPathRepository.findAndCount(search);
            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map((x) => LearningPathMapper.toResponseDto(x)),
            };
            return searchResults;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: LearningPathUpdateModel): Promise<LearningPathResponseDto> => {
        try {
            const learningPath = await this._learningPathRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (!learningPath) {
                ErrorHandler.throwNotFoundError('Learning path not found!');
            }

            if (model.TenantId !== undefined && model.TenantId != null) {
                learningPath.TenantId = model.TenantId;
            }

            if (model.Name !== undefined && model.Name != null) {
                learningPath.Name = model.Name;
            }

            if (model.Description !== undefined && model.Description != null) {
                learningPath.Description = model.Description;
            }

            if (model.ImageUrl !== undefined && model.ImageUrl != null) {
                learningPath.ImageUrl = model.ImageUrl;
            }

            if (model.DurationInDays !== undefined && model.DurationInDays != null) {
                learningPath.DurationInDays = model.DurationInDays;
            }

            if (model.PreferenceWeight !== undefined && model.PreferenceWeight != null) {
                learningPath.PreferenceWeight = model.PreferenceWeight;
            }

            if (model.Enabled !== undefined && model.Enabled != null) {
                learningPath.Enabled = model.Enabled;
            }

            // if (model.ClientId != null) {
            //     const client = await this.getClient(model.ClientId);
            //     learningPath.Client = client;
            // }
            var record = await this._learningPathRepository.save(learningPath);

            // Update courses via junction table
            if (model.CourseIds !== undefined) {
                await this.addCourses(record.id, model.CourseIds);
            }

            // Pipeline: Enrich DTO with courses (matching reancare-service updateDto pattern)
            const dto = LearningPathMapper.toResponseDto(record);
            const enrichedDto = await this.updateDto(dto);
            return enrichedDto;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._learningPathRepository.findOne({
                where: {
                    id: id,
                },
            });
            var result = await this._learningPathRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchObject = (filters: LearningPathSearchFilters) => {
        var search: FindManyOptions<LearningPath> = {
            relations: {
                // Client: true
            },
            where: {},
            select: {
                id: true,
                TenantId: true,
                Name: true,
                Description: true,
                ImageUrl: true,
                DurationInDays: true,
                PreferenceWeight: true,
                Enabled: true,

                // Client       : {
                //     id  : true,
                //     Name: true,
                //     Code: true,
                // },
                CreatedAt: true,
                UpdatedAt: true,
            },
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

        if (filters.PreferenceWeight) {
            search.where['PreferenceWeight'] = Like(`%${filters.PreferenceWeight}%`);
        }

        if (filters.Enabled) {
            search.where['Enabled'] = Like(`%${filters.Enabled}%`);
        }

        return search;
    };

    //#endregion

    // Pipeline helper method (matching reancare-service updateDto pattern)
    private updateDto = async (dto: LearningPathResponseDto): Promise<LearningPathResponseDto> => {
        if (dto == null) {
            return null;
        }
        // Get courses for learning path
        const learningPathCourses = await this._learningPathCoursesRepository.find({
            where: { LearningPath: { id: dto.id } },
            relations: { Course: true },
        });
        const courses = learningPathCourses.map((lpc) => lpc.Course);
        dto['Courses'] = courses.map((x) => CourseMapper.toResponseDto(x));
        return dto;
    };

    private async addCourses(learningPathId: uuid, courseIds: uuid[]) {
        if (courseIds && courseIds.length > 0) {
            for (const courseId of courseIds) {
                await this.addCourse(learningPathId, courseId);
            }
        }
    }

    private async addCourse(learningPathId: uuid, courseId: uuid): Promise<boolean> {
        try {
            // Check if course exists
            const course = await this._courseRepository.findOne({
                where: { id: courseId },
            });
            if (!course) {
                ErrorHandler.throwNotFoundError(`Course with id ${courseId} not found`);
            }

            // Check if association already exists
            const existingAssociation = await this._learningPathCoursesRepository.findOne({
                where: {
                    LearningPath: { id: learningPathId },
                    Course: { id: courseId },
                },
            });

            if (existingAssociation) {
                return false; // Already exists, skip
            }

            // Create new association
            const association = this._learningPathCoursesRepository.create({
                LearningPath: { id: learningPathId } as any,
                Course: { id: courseId } as any,
            });
            await this._learningPathCoursesRepository.save(association);
            return true;
        } catch (error) {
            logger.error(error.message);
            throw error;
        }
    }
}
