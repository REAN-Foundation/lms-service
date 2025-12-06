import { BaseSearchFilters, BaseSearchResults } from './miscellaneous/base.search.types';
import { uuid } from './miscellaneous/system.types';
import { LearningPathResponseDto } from './learning.path.types';

export interface LearningPathEnrollmentCreateModel {
    UserId: uuid;
    LearningPathId: uuid;
    TenantId?: uuid;
    StartDate?: Date;
    ExpectedEndDate?: Date;
}

export interface LearningPathEnrollmentUpdateModel {
    UserId?: uuid;
    LearningPathId?: uuid;
    TenantId?: uuid;
    StartDate?: Date;
    ExpectedEndDate?: Date;
    IsActive?: boolean;
}

export interface LearningPathEnrollmentResponseDto {
    id: uuid;
    UserId: uuid;
    LearningPathId: uuid;
    TenantId?: uuid;
    StartDate?: Date;
    ExpectedEndDate?: Date;
    CompletedAt?: Date;
    IsActive: boolean;
    EnrolledAt: Date;
    LearningPath?: LearningPathResponseDto;
    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface LearningPathEnrollmentSearchFilters extends BaseSearchFilters {
    UserId?: uuid;
    LearningPathId?: uuid;
    IsActive?: boolean;
    TenantId?: uuid;
}

export interface LearningPathEnrollmentSearchResults extends BaseSearchResults {
    Items: LearningPathEnrollmentResponseDto[];
}

