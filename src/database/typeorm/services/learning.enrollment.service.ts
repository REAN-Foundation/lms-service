import { FindManyOptions, Repository } from 'typeorm';
import { logger } from '../../../logger/logger';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { ProgressStatus } from '../../../domain.types/enums/progress.status.enum';
import { Source } from '../typeorm.database.connector';
import { BaseService } from './base.service';
import {
    LearningEnrollmentCreateModel,
    LearningEnrollmentResponseDto,
    LearningEnrollmentSearchFilters,
    LearningEnrollmentSearchResults,
    LearningEnrollmentUpdateModel,
} from '../../../domain.types/learning.enrollment.types';
import { LearningEnrollmentMapper } from '../mappers/learning.enrollment.mapper';
import { Course } from '../models/course.entity';
import { LearningPath } from '../models/learning.path.entity';
import { LearningEnrollment } from '../models/learning.enrollment.entity';

export class LearningEnrollmentService extends BaseService {
    //#region Repositories

    _courseRepository: Repository<Course> = Source.getRepository(Course);

    _learningPathRepository: Repository<LearningPath> = Source.getRepository(LearningPath);

    _enrollmentRepository: Repository<LearningEnrollment> = Source.getRepository(LearningEnrollment);

    //#endregion

    public enroll = async (model: LearningEnrollmentCreateModel): Promise<LearningEnrollmentResponseDto> => {
        try {
            if (!model.CourseId && !model.LearningPathId) {
                ErrorHandler.throwInputValidationError(['Either CourseId or LearningPathId must be provided.']);
            }

            const course = model.CourseId ? await this.getCourse(model.CourseId) : null;
            const learningPath = model.LearningPathId ? await this.getLearningPath(model.LearningPathId) : null;

            await this.ensureNoActiveDuplicate(model.UserId, course?.id, learningPath?.id);

            const enrollment = this._enrollmentRepository.create({
                UserId: model.UserId,
                TenantId: model.TenantId ?? course?.TenantId ?? learningPath?.TenantId ?? null,
                Course: course,
                LearningPath: learningPath,
                ProgressStatus: model.ProgressStatus ?? ProgressStatus.InProgress,
                StartDate: model.StartDate ?? new Date(),
                EndDate: model.EndDate ?? null,
                IsActive: true,
                EnrolledAt: new Date(),
            });

            const record = await this._enrollmentRepository.save(enrollment);
            return LearningEnrollmentMapper.toResponseDto(record);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public update = async (
        id: uuid,
        model: LearningEnrollmentUpdateModel
    ): Promise<LearningEnrollmentResponseDto> => {
        try {
            let enrollment = await this._enrollmentRepository.findOne({
                where: { id: id },
                relations: { Course: true, LearningPath: true },
            });
            if (!enrollment) {
                ErrorHandler.throwNotFoundError('Learning enrollment not found!');
            }

            if (model.UserId !== undefined && model.UserId != null) {
                enrollment.UserId = model.UserId;
            }
            if (model.TenantId !== undefined) {
                enrollment.TenantId = model.TenantId;
            }
            if (model.StartDate !== undefined) {
                enrollment.StartDate = model.StartDate;
            }
            if (model.EndDate !== undefined) {
                enrollment.EndDate = model.EndDate;
            }
            if (model.ProgressStatus !== undefined && model.ProgressStatus != null) {
                enrollment.ProgressStatus = model.ProgressStatus;
            }
            if (model.IsActive !== undefined && model.IsActive != null) {
                enrollment.IsActive = model.IsActive;
            }
            if (model.CourseId) {
                enrollment.Course = await this.getCourse(model.CourseId);
            }
            if (model.LearningPathId) {
                enrollment.LearningPath = await this.getLearningPath(model.LearningPathId);
            }

            enrollment = await this._enrollmentRepository.save(enrollment);
            return LearningEnrollmentMapper.toResponseDto(enrollment);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public getById = async (id: uuid): Promise<LearningEnrollmentResponseDto> => {
        try {
            const enrollment = await this._enrollmentRepository.findOne({
                where: { id: id },
                relations: { Course: true, LearningPath: true },
            });
            if (!enrollment) {
                ErrorHandler.throwNotFoundError('Learning enrollment not found!');
            }
            return LearningEnrollmentMapper.toResponseDto(enrollment);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (
        filters: LearningEnrollmentSearchFilters
    ): Promise<LearningEnrollmentSearchResults> => {
        try {
            let search = this.getSearchObject(filters);
            const { search: updatedSearch, pageIndex, limit, order, orderByColumn } =
                this.addSortingAndPagination(search, filters);
            search = updatedSearch;
            const [list, count] = await this._enrollmentRepository.findAndCount(search);
            const items = list.map((x) => LearningEnrollmentMapper.toResponseDto(x));
            return {
                TotalCount: count,
                RetrievedCount: items.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: items,
            };
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search learning enrollments!', error);
        }
    };

    public delete = async (id: uuid): Promise<boolean> => {
        try {
            const enrollment = await this._enrollmentRepository.findOne({
                where: { id: id },
            });
            if (!enrollment) {
                ErrorHandler.throwNotFoundError('Learning enrollment not found!');
            }
            await this._enrollmentRepository.remove(enrollment);
            return true;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public getUserEnrollments = async (
        userId: uuid,
        includeInactive = true
    ): Promise<LearningEnrollmentResponseDto[]> => {
        try {
            const where: any = {
                UserId: userId,
            };
            if (!includeInactive) {
                where.IsActive = true;
            }
            const enrollments = await this._enrollmentRepository.find({
                where: where,
                relations: { Course: true, LearningPath: true },
                order: { CreatedAt: 'DESC' },
            });
            return enrollments.map((x) => LearningEnrollmentMapper.toResponseDto(x));
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public getUserActiveEnrollments = async (userId: uuid): Promise<LearningEnrollmentResponseDto[]> => {
        return this.getUserEnrollments(userId, false);
    };

    public stop = async (id: uuid, status?: ProgressStatus): Promise<LearningEnrollmentResponseDto> => {
        try {
            let enrollment = await this._enrollmentRepository.findOne({
                where: { id: id },
                relations: { Course: true, LearningPath: true },
            });
            if (!enrollment) {
                ErrorHandler.throwNotFoundError('Learning enrollment not found!');
            }
            enrollment.IsActive = false;
            enrollment.ProgressStatus = status ?? ProgressStatus.Cancelled;
            enrollment.EndDate = new Date();
            enrollment.CompletedAt = new Date();
            enrollment = await this._enrollmentRepository.save(enrollment);
            return LearningEnrollmentMapper.toResponseDto(enrollment);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchObject = (filters: LearningEnrollmentSearchFilters): FindManyOptions<LearningEnrollment> => {
        const search: FindManyOptions<LearningEnrollment> = {
            relations: {
                Course: true,
                LearningPath: true,
            },
            where: {},
        };

        if (filters.UserId) {
            search.where['UserId'] = filters.UserId;
        }
        if (filters.CourseId) {
            search.where['Course'] = { id: filters.CourseId };
        }
        if (filters.LearningPathId) {
            search.where['LearningPath'] = { id: filters.LearningPathId };
        }
        if (filters.ProgressStatus) {
            search.where['ProgressStatus'] = filters.ProgressStatus;
        }
        if (filters.IsActive !== undefined && filters.IsActive !== null) {
            search.where['IsActive'] = filters.IsActive;
        }
        if (filters.TenantId) {
            search.where['TenantId'] = filters.TenantId;
        }

        return search;
    };

    private async getCourse(courseId: uuid): Promise<Course> {
        const course = await this._courseRepository.findOne({
            where: { id: courseId },
        });
        if (!course) {
            ErrorHandler.throwNotFoundError('Course cannot be found');
        }
        return course;
    }

    private async getLearningPath(learningPathId: uuid): Promise<LearningPath> {
        const learningPath = await this._learningPathRepository.findOne({
            where: { id: learningPathId },
        });
        if (!learningPath) {
            ErrorHandler.throwNotFoundError('Learning path cannot be found');
        }
        return learningPath;
    }

    private async ensureNoActiveDuplicate(userId: uuid, courseId?: uuid, learningPathId?: uuid) {
        const where: any = {
            UserId: userId,
            IsActive: true,
        };
        if (courseId) {
            where.Course = { id: courseId };
        }
        if (learningPathId) {
            where.LearningPath = { id: learningPathId };
        }

        const existing = await this._enrollmentRepository.findOne({
            where: where,
        });

        if (existing) {
            ErrorHandler.throwConflictError('User already has an active enrollment for this selection.');
        }
    }

    //#endregion
}

