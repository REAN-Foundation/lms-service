import { FindManyOptions, In, Like, Repository } from 'typeorm';
import { logger } from '../../../logger/logger';
import { ErrorHandler } from '../../../common/error.handling/error.handler';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { Source } from '../typeorm.database.connector';
import { BaseService } from './base.service';
import {
    CertificatesCreateModel,
    CertificatesResponseDto,
    CertificatesSearchFilters,
    CertificatesSearchResults,
    CertificatesUpdateModel,
} from '../../../domain.types/certificates.types';
import { CertificatesMapper } from '../mappers/certificates.mapper';
import { Course } from '../models/course.entity';
import { Certificates } from '../models/certificates.entity';
import { UserLearningService } from './user.learning.service';
import { LearningPathCourses } from '../models/learning.path.courses.entity';

///////////////////////////////////////////////////////////////////////

export class CertificatesService extends BaseService {
    //#region Repositories

    _courseRepository: Repository<Course> = Source.getRepository(Course);

    _certificatesRepository: Repository<Certificates> = Source.getRepository(Certificates);

    _learningPathCoursesRepository: Repository<LearningPathCourses> = Source.getRepository(LearningPathCourses);

    _userLearningService: UserLearningService = new UserLearningService();

    //#endregion

    public create = async (createModel: CertificatesCreateModel): Promise<CertificatesResponseDto> => {
        const course = await this.getCourse(createModel.CourseId);

        const certificates = this._certificatesRepository.create({
            Course: course,

            UserId: createModel.UserId,
            CertificateNumber: createModel.CertificateNumber,
            CertificateName: createModel.CertificateName,
            CertificateType: createModel.CertificateType,
            IssuedDate: createModel.IssuedDate,
            ExpiryDate: createModel.ExpiryDate,
            CertificateUrl: createModel.CertificateUrl,
            FinalGrade: createModel.FinalGrade,
            CreditHours: createModel.CreditHours,
            Skills: createModel.Skills,
            IsVerified: createModel.IsVerified,
            VerificationUrl: createModel.VerificationUrl,
            IssuedBy: createModel.IssuedBy,
        });
        var record = await this._certificatesRepository.save(certificates);
        return CertificatesMapper.toResponseDto(record);
    };

    public getById = async (id: uuid): Promise<CertificatesResponseDto> => {
        try {
            var certificates = await this._certificatesRepository.findOne({
                where: {
                    id: id,
                },
                relations: {
                    // Client: true
                    Course: true,
                },
            });
            return CertificatesMapper.toResponseDto(certificates);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public search = async (filters: CertificatesSearchFilters): Promise<CertificatesSearchResults> => {
        try {
            var search = this.getSearchObject(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._certificatesRepository.findAndCount(search);
            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map((x) => CertificatesMapper.toResponseDto(x)),
            };
            return searchResults;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    public update = async (id: uuid, model: CertificatesUpdateModel): Promise<CertificatesResponseDto> => {
        try {
            const certificates = await this._certificatesRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (!certificates) {
                ErrorHandler.throwNotFoundError('Certificates not found!');
            }

            if (model.UserId !== undefined && model.UserId != null) {
                certificates.UserId = model.UserId;
            }

            if (model.CertificateNumber !== undefined && model.CertificateNumber != null) {
                certificates.CertificateNumber = model.CertificateNumber;
            }

            if (model.CertificateName !== undefined && model.CertificateName != null) {
                certificates.CertificateName = model.CertificateName;
            }

            if (model.CertificateType !== undefined && model.CertificateType != null) {
                certificates.CertificateType = model.CertificateType;
            }

            if (model.IssuedDate !== undefined && model.IssuedDate != null) {
                certificates.IssuedDate = model.IssuedDate;
            }

            if (model.ExpiryDate !== undefined && model.ExpiryDate != null) {
                certificates.ExpiryDate = model.ExpiryDate;
            }

            if (model.CertificateUrl !== undefined && model.CertificateUrl != null) {
                certificates.CertificateUrl = model.CertificateUrl;
            }

            if (model.FinalGrade !== undefined && model.FinalGrade != null) {
                certificates.FinalGrade = model.FinalGrade;
            }

            if (model.CreditHours !== undefined && model.CreditHours != null) {
                certificates.CreditHours = model.CreditHours;
            }

            if (model.Skills !== undefined && model.Skills != null) {
                certificates.Skills = model.Skills;
            }

            if (model.IsVerified !== undefined && model.IsVerified != null) {
                certificates.IsVerified = model.IsVerified;
            }

            if (model.VerificationUrl !== undefined && model.VerificationUrl != null) {
                certificates.VerificationUrl = model.VerificationUrl;
            }

            if (model.IssuedBy !== undefined && model.IssuedBy != null) {
                certificates.IssuedBy = model.IssuedBy;
            }

            if (model.CourseId != null) {
                const course = await this.getCourse(model.CourseId);
                certificates.Course = course;
            }

            // if (model.ClientId != null) {
            //     const client = await this.getClient(model.ClientId);
            //     certificates.Client = client;
            // }
            var record = await this._certificatesRepository.save(certificates);
            return CertificatesMapper.toResponseDto(record);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._certificatesRepository.findOne({
                where: {
                    id: id,
                },
            });
            var result = await this._certificatesRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    //#region Privates

    private getSearchObject = (filters: CertificatesSearchFilters) => {
        var search: FindManyOptions<Certificates> = {
            relations: {
                // Client: true
                Course: true,
            },
            where: {},
            select: {
                id: true,
                UserId: true,
                CertificateNumber: true,
                CertificateName: true,
                CertificateType: true,
                IssuedDate: true,
                ExpiryDate: true,
                CertificateUrl: true,
                FinalGrade: true,
                CreditHours: true,
                Skills: true,
                IsVerified: true,
                VerificationUrl: true,
                IssuedBy: true,

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

        if (filters.UserId) {
            search.where['UserId'] = Like(`%${filters.UserId}%`);
        }

        if (filters.CertificateNumber) {
            search.where['CertificateNumber'] = Like(`%${filters.CertificateNumber}%`);
        }

        if (filters.CertificateName) {
            search.where['CertificateName'] = Like(`%${filters.CertificateName}%`);
        }

        if (filters.CertificateType) {
            search.where['CertificateType'] = Like(`%${filters.CertificateType}%`);
        }

        if (filters.IssuedDate) {
            search.where['IssuedDate'] = Like(`%${filters.IssuedDate}%`);
        }

        if (filters.ExpiryDate) {
            search.where['ExpiryDate'] = Like(`%${filters.ExpiryDate}%`);
        }

        if (filters.CertificateUrl) {
            search.where['CertificateUrl'] = Like(`%${filters.CertificateUrl}%`);
        }

        if (filters.FinalGrade) {
            search.where['FinalGrade'] = Like(`%${filters.FinalGrade}%`);
        }

        if (filters.CreditHours) {
            search.where['CreditHours'] = Like(`%${filters.CreditHours}%`);
        }

        if (filters.Skills) {
            search.where['Skills'] = Like(`%${filters.Skills}%`);
        }

        if (filters.IsVerified) {
            search.where['IsVerified'] = Like(`%${filters.IsVerified}%`);
        }

        if (filters.VerificationUrl) {
            search.where['VerificationUrl'] = Like(`%${filters.VerificationUrl}%`);
        }

        if (filters.IssuedBy) {
            search.where['IssuedBy'] = Like(`%${filters.IssuedBy}%`);
        }

        return search;
    };

    //#endregion

    public getCertificateForCourse = async (userId: uuid, courseId: uuid): Promise<CertificatesResponseDto> => {
        try {
            // Check if course is completed
            const completionState = await this._userLearningService.getCourseCompletionState(userId, courseId);
            if (!completionState.IsCompleted) {
                ErrorHandler.throwFailedPreconditionError('Course is not completed. Certificate can only be downloaded for completed courses.');
            }

            // Find certificate for this course and user
            const certificate = await this._certificatesRepository.findOne({
                where: {
                    UserId: userId,
                    Course: { id: courseId },
                },
                relations: {
                    Course: true,
                },
            });

            if (!certificate) {
                ErrorHandler.throwNotFoundError('Certificate not found for this completed course.');
            }

            return CertificatesMapper.toResponseDto(certificate);
        } catch (error) {
            logger.error(error.message);
            if (error.statusCode) {
                throw error;
            }
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

    public getCertificatesForLearningPath = async (userId: uuid, learningPathId: uuid): Promise<CertificatesResponseDto[]> => {
        try {
            // Check if learning path is completed
            const completionState = await this._userLearningService.getLearningPathCompletionState(userId, learningPathId);
            if (!completionState.IsCompleted) {
                ErrorHandler.throwFailedPreconditionError('Learning path is not completed. Certificates can only be downloaded for completed learning paths.');
            }

            // Get all courses in the learning path
            const learningPathCourses = await this._learningPathCoursesRepository.find({
                where: {
                    LearningPath: { id: learningPathId },
                },
                relations: {
                    Course: true,
                },
            });

            if (learningPathCourses.length === 0) {
                ErrorHandler.throwNotFoundError('No courses found in this learning path.');
            }

            const courseIds = learningPathCourses.map((lpc) => lpc.Course.id);

            // Get all certificates for courses in this learning path
            const certificates = await this._certificatesRepository.find({
                where: {
                    UserId: userId,
                    Course: { id: In(courseIds) },
                },
                relations: {
                    Course: true,
                },
            });

            if (certificates.length === 0) {
                ErrorHandler.throwNotFoundError('No certificates found for courses in this completed learning path.');
            }

            return certificates.map((cert) => CertificatesMapper.toResponseDto(cert));
        } catch (error) {
            logger.error(error.message);
            if (error.statusCode) {
                throw error;
            }
            ErrorHandler.throwInternalServerError(error.message, error);
        }
    };

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
}
