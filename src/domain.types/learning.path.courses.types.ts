import { BaseSearchFilters, BaseSearchResults } from "./miscellaneous/base.search.types";
import { uuid } from "./miscellaneous/system.types";


export interface LearningPathCoursesCreateModel {
CourseId: uuid;
LearningPathId: uuid;
}

export interface LearningPathCoursesUpdateModel {
CourseId?: uuid;
LearningPathId?: uuid;
}

export interface LearningPathCoursesResponseDto {
    id: uuid;
CourseId: uuid;
LearningPathId: uuid;
}

export interface LearningPathCoursesSearchFilters extends BaseSearchFilters {
courseId?: uuid;
learningPathId?: uuid;
}

export interface LearningPathCoursesSearchResults extends BaseSearchResults {
        Items: LearningPathCoursesResponseDto[];

}
