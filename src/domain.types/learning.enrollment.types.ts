import { BaseSearchFilters, BaseSearchResults } from './miscellaneous/base.search.types';
import { uuid } from './miscellaneous/system.types';
import { ProgressStatus } from './enums/progress.status.enum';
import { CourseResponseDto } from './course.types';
import { LearningPathResponseDto } from './learning.path.types';

export interface LearningEnrollmentCreateModel {
    UserId: uuid;
    CourseId?: uuid;
    LearningPathId?: uuid;
    TenantId?: uuid;
    StartDate?: Date;
    EndDate?: Date;
    ProgressStatus?: ProgressStatus;
}

export interface LearningEnrollmentUpdateModel {
    UserId?: uuid;
    CourseId?: uuid;
    LearningPathId?: uuid;
    TenantId?: uuid;
    StartDate?: Date;
    EndDate?: Date;
    ProgressStatus?: ProgressStatus;
    IsActive?: boolean;
}

export interface LearningEnrollmentResponseDto {
    id: uuid;
    UserId: uuid;
    CourseId?: uuid;
    LearningPathId?: uuid;
    TenantId?: uuid;
    ProgressStatus: ProgressStatus;
    StartDate?: Date;
    EndDate?: Date;
    CompletedAt?: Date;
    IsActive: boolean;
    EnrolledAt: Date;
    Course?: CourseResponseDto;
    LearningPath?: LearningPathResponseDto;
    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface LearningEnrollmentSearchFilters extends BaseSearchFilters {
    UserId?: uuid;
    CourseId?: uuid;
    LearningPathId?: uuid;
    ProgressStatus?: ProgressStatus;
    IsActive?: boolean;
    TenantId?: uuid;
}

export interface LearningEnrollmentSearchResults extends BaseSearchResults {
    Items: LearningEnrollmentResponseDto[];
}

