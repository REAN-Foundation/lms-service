import { BaseSearchFilters, BaseSearchResults } from "./miscellaneous/base.search.types";
import { uuid } from "./miscellaneous/system.types";


export interface CourseModuleCreateModel {
    Name: string;
    Description: string;
    ImageUrl: string;
    DurationInMins: number;
    Sequence: number;
CourseId: uuid;
LearningPathId: uuid;
}

export interface CourseModuleUpdateModel {
    Name?: string;
    Description?: string;
    ImageUrl?: string;
    DurationInMins?: number;
    Sequence?: number;
CourseId?: uuid;
LearningPathId?: uuid;
}

export interface CourseModuleResponseDto {
    id: uuid;
    Name: string;
    Description: string;
    ImageUrl: string;
    DurationInMins: number;
    Sequence: number;
CourseId: uuid;
LearningPathId: uuid;
}

export interface CourseModuleSearchFilters extends BaseSearchFilters {
    Name?: string;
    Description?: string;
    ImageUrl?: string;
    DurationInMins?: number;
    Sequence?: number;
courseId?: uuid;
learningPathId?: uuid;
}

export interface CourseModuleSearchResults extends BaseSearchResults {
        Items: CourseModuleResponseDto[];

}
