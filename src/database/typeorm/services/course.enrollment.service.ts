import { FindManyOptions, Repository } from 'typeorm';
import { logger } from '../../../logger/logger';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { Source } from '../typeorm.database.connector';
import { BaseService } from './base.service';
import {
    CourseEnrollmentCreateModel,
    CourseEnrollmentResponseDto,
    CourseEnrollmentSearchFilters,
    CourseEnrollmentSearchResults,
} from '../../../domain.types/course.enrollment.types';
import { CourseEnrollmentMapper } from '../mappers/course.enrollment.mapper';
import { Course } from '../models/course.entity';
import { CourseEnrollment } from '../models/course.enrollment.entity';

export class CourseEnrollmentService extends BaseService {
    //#region Repositories

    _courseRepository: Repository<Course> = Source.getRepository(Course);

    _enrollmentRepository: Repository<CourseEnrollment> = Source.getRepository(CourseEnrollment);

    //#endregion

    public enroll = async (model: CourseEnrollmentCreateModel): Promise<CourseEnrollmentResponseDto> => {
        try {
            const course = await this.getCourse(model.CourseId);
            await this.ensureNoActiveDuplicate(model.UserId, model.CourseId);

            const enrollment = this._enrollmentRepository.create({
                UserId: model.UserId,
                TenantId: model.TenantId ?? course?.TenantId ?? null,
                Course: course,
                StartDate: model.StartDate ?? new Date(),
                ExpectedEndDate: model.ExpectedEndDate ?? null,
                IsActive: true,
                EnrolledAt: new Date(),
            });

            const record = await this._enrollmentRepository.save(enrollment);
            return CourseEnrollmentMapper.toResponseDto(record);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public getById = async (id: uuid): Promise<CourseEnrollmentResponseDto> => {
        try {
            const enrollment = await this._enrollmentRepository.findOne({
                where: { id: id },
                relations: { Course: true },
            });
            if (!enrollment) {
                ErrorHandler.throwNotFoundError('Course enrollment not found!');
            }
            return CourseEnrollmentMapper.toResponseDto(enrollment);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (
        filters: CourseEnrollmentSearchFilters
    ): Promise<CourseEnrollmentSearchResults> => {
        try {
            let search = this.getSearchObject(filters);
            const { search: updatedSearch, pageIndex, limit, order, orderByColumn } =
                this.addSortingAndPagination(search, filters);
            search = updatedSearch;
            const [list, count] = await this._enrollmentRepository.findAndCount(search);
            const items = list.map((x) => CourseEnrollmentMapper.toResponseDto(x));
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search course enrollments!', error);
        }
    };

    public delete = async (id: uuid): Promise<boolean> => {
        try {
            const enrollment = await this._enrollmentRepository.findOne({
                where: { id: id },
            });
            if (!enrollment) {
                ErrorHandler.throwNotFoundError('Course enrollment not found!');
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
    ): Promise<CourseEnrollmentResponseDto[]> => {
        try {
            const where: any = {
                UserId: userId,
            };
            if (!includeInactive) {
                where.IsActive = true;
            }
            const enrollments = await this._enrollmentRepository.find({
                where: where,
                relations: { Course: true },
                order: { CreatedAt: 'DESC' },
            });
            return enrollments.map((x) => CourseEnrollmentMapper.toResponseDto(x));
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public getUserActiveEnrollments = async (userId: uuid): Promise<CourseEnrollmentResponseDto[]> => {
        return this.getUserEnrollments(userId, false);
    };

    public getActiveEnrollmentsByTenant = async (tenantId: uuid): Promise<CourseEnrollmentResponseDto[]> => {
        try {
            const enrollments = await this._enrollmentRepository.find({
                where: {
                    TenantId: tenantId,
                    IsActive: true,
                },
                relations: { Course: true },
                order: { CreatedAt: 'DESC' },
            });
            return enrollments.map((x) => CourseEnrollmentMapper.toResponseDto(x));
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchObject = (filters: CourseEnrollmentSearchFilters): FindManyOptions<CourseEnrollment> => {
        const search: FindManyOptions<CourseEnrollment> = {
            relations: {
                Course: true,
            },
            where: {},
        };

        if (filters.UserId) {
            search.where['UserId'] = filters.UserId;
        }
        if (filters.CourseId) {
            search.where['Course'] = { id: filters.CourseId };
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

    private async ensureNoActiveDuplicate(userId: uuid, courseId: uuid) {
        const existing = await this._enrollmentRepository.findOne({
            where: {
                UserId: userId,
                Course: { id: courseId },
                IsActive: true,
            },
        });

        if (existing) {
            ErrorHandler.throwConflictError('User already has an active enrollment for this course.');
        }
    }

    //#endregion
}

