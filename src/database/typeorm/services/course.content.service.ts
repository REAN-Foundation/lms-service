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
    CourseContentUpdateModel,
} from '../../../domain.types/course.content.types';
import { CourseContentMapper } from '../mappers/course.content.mapper';
import { Course } from '../models/course.entity';
import { CourseModule } from '../models/course.module.entity';
import { UserLearning } from '../models/user.learning.entity';

import { CourseContent } from '../models/course.content.entity';

///////////////////////////////////////////////////////////////////////

export class CourseContentService extends BaseService {
    //#region Repositories

    _courseRepository: Repository<Course> = Source.getRepository(Course);

    _courseModuleRepository: Repository<CourseModule> = Source.getRepository(CourseModule);

    _userLearningRepository: Repository<UserLearning> = Source.getRepository(UserLearning);

    _courseContentRepository: Repository<CourseContent> = Source.getRepository(CourseContent);

    //#endregion

    public create = async (createModel: CourseContentCreateModel): Promise<CourseContentResponseDto> => {
        const course = await this.getCourse(createModel.CourseId);
        const courseModule = await this.getCourseModule(createModel.CourseModuleId);

        const courseContent = this._courseContentRepository.create({
            Course: course,
            CourseModule: courseModule,

            Title: createModel.Title,
            Description: createModel.Description,
            ImageUrl: createModel.ImageUrl,
            DurationInMins: createModel.DurationInMins,
            ContentType: createModel.ContentType,
            ResourceLink: createModel.ResourceLink,
            ActionTemplateId: createModel.ActionTemplateId,
            Sequence: createModel.Sequence,
        });
        var record = await this._courseContentRepository.save(courseContent);
        
        // Update module's ContentSequence field
        await this.updateModuleContentSequence(courseModule.id);
        
        return CourseContentMapper.toResponseDto(record);
    };

    public getById = async (id: uuid): Promise<CourseContentResponseDto> => {
        try {
            var courseContent = await this._courseContentRepository.findOne({
                where: {
                    id: id,
                },
                relations: {
                    // Client: true
                    Course: true,
                    CourseModule: true,
                },
            });
            if (!courseContent) {
                ErrorHandler.throwNotFoundError('Course content not found!');
            }
            return CourseContentMapper.toResponseDto(courseContent);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: CourseContentSearchFilters): Promise<CourseContentSearchResults> => {
        try {
            var search = this.getSearchObject(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._courseContentRepository.findAndCount(search);
            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map((x) => CourseContentMapper.toResponseDto(x)),
            };
            return searchResults;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: CourseContentUpdateModel): Promise<CourseContentResponseDto> => {
        try {
            const courseContent = await this._courseContentRepository.findOne({
                where: {
                    id: id,
                },
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
                where: {
                    id: id,
                },
            });
            var result = await this._courseContentRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public getContentsForCourse = async (courseId: uuid): Promise<CourseContentResponseDto[]> => {
        try {
            const contents = await this._courseContentRepository.find({
                where: { Course: { id: courseId } },
                relations: { Course: true, CourseModule: true },
            });
            return contents.map((x) => CourseContentMapper.toResponseDto(x));
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    // getContentsForLearningPath = async (learningPathId: string): Promise<CourseContentResponseDto[]> => {
    //     try {
    //         const contents = await this._courseContentRepository.find({
    //             where: { Course: { LearningPathId: learningPathId } },
    //             relationns: { Course: true, CourseModule: true },
    //         });
    //         return contents.map((x) => CourseContentMapper.toResponseDto(x));
    //     } catch (error) {
    //         logger.error(error.message);
    //         ErrorHandler.throwInternalServerError(error.message, error);
    //     }
    // };

    //#region Privates

    private getSearchObject = (filters: CourseContentSearchFilters) => {
        var search: FindManyOptions<CourseContent> = {
            relations: {
                // Client: true
                Course: true,
                CourseModule: true,
            },
            where: {},
            select: {
                id: true,
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
                    ModuleSequence: true,
                },
                CourseModule: {
                    id: true,
                    Name: true,
                    Description: true,
                    ImageUrl: true,
                    DurationInMins: true,
                    ContentSequence: true,
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

        if (filters.courseId) {
            search.where['Course'] = { id: filters.courseId };
        }

        if (filters.courseModuleId) {
            search.where['CourseModule'] = { id: filters.courseModuleId };
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

    private async getCourseModule(courseModuleId: uuid) {
        const courseModule = await this._courseModuleRepository.findOne({
            where: {
                id: courseModuleId,
            },
        });
        if (!courseModule) {
            ErrorHandler.throwNotFoundError('CourseModule cannot be found');
        }
        return courseModule;
    }

    private async updateModuleContentSequence(moduleId: uuid): Promise<void> {
        try {
            // Get all contents for this module, ordered by creation time (oldest first)
            const contents = await this._courseContentRepository.find({
                where: { CourseModule: { id: moduleId } },
                order: { CreatedAt: 'ASC' },
            });

            // Create ContentSequence object: { "content-uuid": sequence_number }
            // Sequence is assigned based on creation order (1, 2, 3, 4, ...)
            const contentSequence: Record<string, number> = {};
            contents.forEach((content, index) => {
                contentSequence[content.id] = index + 1;
            });

            // Update the module's ContentSequence field
            await this._courseModuleRepository.update(moduleId, {
                ContentSequence: contentSequence,
            });
        } catch (error) {
            logger.error(`Error updating ContentSequence for module ${moduleId}: ${error.message}`);
            // Don't throw error, just log it - content creation should still succeed
        }
    }
}