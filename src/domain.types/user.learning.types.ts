import { BaseSearchFilters, BaseSearchResults } from "./miscellaneous/base.search.types";
import { uuid } from "./miscellaneous/system.types";
import { ProgressStatus } from './enums/progress.status.enum';


export interface UserLearningCreateModel {
    UserId: uuid;
    ActionId: uuid;
    ProgressStatus: ProgressStatus;
    PercentageCompletion: number;
CourseId: uuid;
LearningPathId: uuid;
CourseModuleId: uuid;
CourseContentId: uuid;
}

export interface UserLearningUpdateModel {
    UserId?: uuid;
    ActionId?: uuid;
    ProgressStatus?: ProgressStatus;
    PercentageCompletion?: number;
CourseId?: uuid;
LearningPathId?: uuid;
CourseModuleId?: uuid;
CourseContentId?: uuid;
}

export interface UserLearningResponseDto {
    id: uuid;
    UserId: uuid;
    ActionId: uuid;
    ProgressStatus: ProgressStatus;
    PercentageCompletion: number;
CourseId: uuid;
LearningPathId: uuid;
CourseModuleId: uuid;
CourseContentId: uuid;
}

export interface UserLearningSearchFilters extends BaseSearchFilters {
    UserId?: uuid;
    ActionId?: uuid;
    ProgressStatus?: ProgressStatus;
    PercentageCompletion?: number;
courseId?: uuid;
learningPathId?: uuid;
courseModuleId?: uuid;
courseContentId?: uuid;
}

export interface UserLearningSearchResults extends BaseSearchResults {
        Items: UserLearningResponseDto[];

}
