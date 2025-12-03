import { BaseSearchFilters, BaseSearchResults } from './miscellaneous/base.search.types';
import { uuid } from './miscellaneous/system.types';
import { ProgressStatus } from './enums/progress.status.enum';

export interface UserLearningCreateModel {
    UserId: uuid;
    ProgressStatus?: ProgressStatus;
    CourseId: uuid;
    LearningPathId: uuid;
    CourseModuleId: uuid;
    CourseContentId: uuid;
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
    UserId: uuid;
    ProgressStatus: ProgressStatus;
    CourseId: uuid;
    LearningPathId: uuid;
    CourseModuleId: uuid;
    CourseContentId: uuid;
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
