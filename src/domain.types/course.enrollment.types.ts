import { BaseSearchFilters, BaseSearchResults } from './miscellaneous/base.search.types';
import { uuid } from './miscellaneous/system.types';
import { CourseResponseDto } from './course.types';

export interface CourseEnrollmentCreateModel {
    UserId: uuid;
    CourseId: uuid;
    TenantId?: uuid;
    StartDate?: Date;
    ExpectedEndDate?: Date;
}

export interface CourseEnrollmentUpdateModel {
    UserId?: uuid;
    CourseId?: uuid;
    TenantId?: uuid;
    StartDate?: Date;
    ExpectedEndDate?: Date;
    IsActive?: boolean;
}

export interface CourseEnrollmentResponseDto {
    id: uuid;
    UserId: uuid;
    CourseId: uuid;
    TenantId?: uuid;
    StartDate?: Date;
    ExpectedEndDate?: Date;
    CompletedAt?: Date;
    IsActive: boolean;
    EnrolledAt: Date;
    Course?: CourseResponseDto;
    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface CourseEnrollmentSearchFilters extends BaseSearchFilters {
    UserId?: uuid;
    CourseId?: uuid;
    IsActive?: boolean;
    TenantId?: uuid;
}

export interface CourseEnrollmentSearchResults extends BaseSearchResults {
    Items: CourseEnrollmentResponseDto[];
}

