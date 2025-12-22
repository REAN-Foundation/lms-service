import { FindManyOptions, Repository } from 'typeorm';
import { logger } from '../../../logger/logger';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { Source } from '../typeorm.database.connector';
import { BaseService } from './base.service';
import {
    LearningPathEnrollmentCreateModel,
    LearningPathEnrollmentResponseDto,
    LearningPathEnrollmentSearchFilters,
    LearningPathEnrollmentSearchResults,
} from '../../../domain.types/learning.path.enrollment.types';
import { LearningPathEnrollmentMapper } from '../mappers/learning.path.enrollment.mapper';
import { LearningPath } from '../models/learning.path.entity';
import { LearningPathEnrollment } from '../models/learning.path.enrollment.entity';

export class LearningPathEnrollmentService extends BaseService {
    //#region Repositories

    _learningPathRepository: Repository<LearningPath> = Source.getRepository(LearningPath);

    _enrollmentRepository: Repository<LearningPathEnrollment> = Source.getRepository(LearningPathEnrollment);

    //#endregion

    public enroll = async (model: LearningPathEnrollmentCreateModel): Promise<LearningPathEnrollmentResponseDto> => {
        try {
            const learningPath = await this.getLearningPath(model.LearningPathId);
            await this.ensureNoActiveDuplicate(model.UserId, model.LearningPathId);

            const enrollment = this._enrollmentRepository.create({
                UserId: model.UserId,
                TenantId: model.TenantId ?? learningPath?.TenantId ?? null,
                LearningPath: learningPath,
                StartDate: model.StartDate ?? new Date(),
                ExpectedEndDate: model.ExpectedEndDate ?? null,
                IsActive: true,
                EnrolledAt: new Date(),
            });

            const record = await this._enrollmentRepository.save(enrollment);
            return LearningPathEnrollmentMapper.toResponseDto(record);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public getById = async (id: uuid): Promise<LearningPathEnrollmentResponseDto> => {
        try {
            const enrollment = await this._enrollmentRepository.findOne({
                where: { id: id },
                relations: { LearningPath: true },
            });
            if (!enrollment) {
                ErrorHandler.throwNotFoundError('Learning path enrollment not found!');
            }
            return LearningPathEnrollmentMapper.toResponseDto(enrollment);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (
        filters: LearningPathEnrollmentSearchFilters
    ): Promise<LearningPathEnrollmentSearchResults> => {
        try {
            let search = this.getSearchObject(filters);
            const { search: updatedSearch, pageIndex, limit, order, orderByColumn } =
                this.addSortingAndPagination(search, filters);
            search = updatedSearch;
            const [list, count] = await this._enrollmentRepository.findAndCount(search);
            const items = list.map((x) => LearningPathEnrollmentMapper.toResponseDto(x));
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search learning path enrollments!', error);
        }
    };

    public delete = async (id: uuid): Promise<boolean> => {
        try {
            const enrollment = await this._enrollmentRepository.findOne({
                where: { id: id },
            });
            if (!enrollment) {
                ErrorHandler.throwNotFoundError('Learning path enrollment not found!');
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
    ): Promise<LearningPathEnrollmentResponseDto[]> => {
        try {
            const where: any = {
                UserId: userId,
            };
            if (!includeInactive) {
                where.IsActive = true;
            }
            const enrollments = await this._enrollmentRepository.find({
                where: where,
                relations: { LearningPath: true },
                order: { CreatedAt: 'DESC' },
            });
            return enrollments.map((x) => LearningPathEnrollmentMapper.toResponseDto(x));
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public getUserActiveEnrollments = async (userId: uuid): Promise<LearningPathEnrollmentResponseDto[]> => {
        return this.getUserEnrollments(userId, false);
    };

    public getActiveEnrollmentsByTenant = async (tenantId: uuid): Promise<LearningPathEnrollmentResponseDto[]> => {
        try {
            const enrollments = await this._enrollmentRepository.find({
                where: {
                    TenantId: tenantId,
                    IsActive: true,
                },
                relations: { LearningPath: true },
                order: { CreatedAt: 'DESC' },
            });
            return enrollments.map((x) => LearningPathEnrollmentMapper.toResponseDto(x));
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchObject = (filters: LearningPathEnrollmentSearchFilters): FindManyOptions<LearningPathEnrollment> => {
        const search: FindManyOptions<LearningPathEnrollment> = {
            relations: {
                LearningPath: true,
            },
            where: {},
        };

        if (filters.UserId) {
            search.where['UserId'] = filters.UserId;
        }
        if (filters.LearningPathId) {
            search.where['LearningPath'] = { id: filters.LearningPathId };
        }
        if (filters.IsActive !== undefined && filters.IsActive !== null) {
            search.where['IsActive'] = filters.IsActive;
        }
        if (filters.TenantId) {
            search.where['TenantId'] = filters.TenantId;
        }

        return search;
    };

    private async getLearningPath(learningPathId: uuid): Promise<LearningPath> {
        const learningPath = await this._learningPathRepository.findOne({
            where: { id: learningPathId },
        });
        if (!learningPath) {
            ErrorHandler.throwNotFoundError('Learning path cannot be found');
        }
        return learningPath;
    }

    private async ensureNoActiveDuplicate(userId: uuid, learningPathId: uuid) {
        const existing = await this._enrollmentRepository.findOne({
            where: {
                UserId: userId,
                LearningPath: { id: learningPathId },
                IsActive: true,
            },
        });

        if (existing) {
            ErrorHandler.throwConflictError('User already has an active enrollment for this learning path.');
        }
    }

    //#endregion
}

