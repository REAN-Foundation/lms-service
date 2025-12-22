import { BaseSearchFilters, BaseSearchResults } from './miscellaneous/base.search.types';
import { uuid } from './miscellaneous/system.types';
import { ProgressStatus } from './enums/progress.status.enum';

export interface UserCreateModel {
    id: uuid;
    UserName: string;
    FirstName?: string;
    LastName?: string;
    ProfileImageUrl?: string;
}

export interface UserUpdateModel {
    UserName?: string;
    FirstName?: string;
    LastName?: string;
    ProfileImageUrl?: string;
}

export interface UserResponseDto {
    id: uuid;
    UserName: string;
    FirstName?: string;
    LastName?: string;
    ProfileImageUrl?: string;
    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface UserSearchFilters extends BaseSearchFilters {
    userName?: string;
    firstName?: string;
    lastName?: string;
    profileImageUrl?: string;
}

export interface UserSearchResults extends BaseSearchResults {
    Items: UserResponseDto[];
}

export interface UserLearningUpdateModel {
    UserId?: uuid;
    ProgressStatus?: ProgressStatus;
    CourseId?: uuid;
    LearningPathId?: uuid;
    CourseModuleId?: uuid;
    CourseContentId?: uuid;
}

export interface UserLearningResponseDto {
    id: uuid;
    UserId?: uuid;
    ProgressStatus?: ProgressStatus;
    PercentageCompletion?: number;
    CourseId?: uuid;
    LearningPathId?: uuid;
    CourseModuleId?: uuid;
    CourseContentId?: uuid;
    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface UserLearningSearchFilters extends BaseSearchFilters {
    UserId?: uuid;
    ProgressStatus?: ProgressStatus;
    CourseId?: uuid;
    LearningPathId?: uuid;
    CourseModuleId?: uuid;
    CourseContentId?: uuid;
}

export interface UserLearningSearchResults extends BaseSearchResults {
    Items: UserLearningResponseDto[];
}
