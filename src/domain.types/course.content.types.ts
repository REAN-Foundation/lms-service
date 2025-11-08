import { BaseSearchFilters, BaseSearchResults } from "./miscellaneous/base.search.types";
import { uuid } from "./miscellaneous/system.types";
import { CourseContentType } from './enums/course.content.type.enum';


export interface CourseContentCreateModel {
    Title: string;
    Description: string;
    ImageUrl: string;
    DurationInMins: number;
    ContentType: CourseContentType;
    ResourceLink: string;
    ActionTemplateId: uuid;
    Sequence: number;
CourseId: uuid;
LearningPathId: uuid;
CourseModuleId: uuid;
}

export interface CourseContentUpdateModel {
    Title?: string;
    Description?: string;
    ImageUrl?: string;
    DurationInMins?: number;
    ContentType?: CourseContentType;
    ResourceLink?: string;
    ActionTemplateId?: uuid;
    Sequence?: number;
CourseId?: uuid;
LearningPathId?: uuid;
CourseModuleId?: uuid;
}

export interface CourseContentResponseDto {
    id: uuid;
    Title: string;
    Description: string;
    ImageUrl: string;
    DurationInMins: number;
    ContentType: CourseContentType;
    ResourceLink: string;
    ActionTemplateId: uuid;
    Sequence: number;
CourseId: uuid;
LearningPathId: uuid;
CourseModuleId: uuid;
}

export interface CourseContentSearchFilters extends BaseSearchFilters {
    Title?: string;
    Description?: string;
    ImageUrl?: string;
    DurationInMins?: number;
    ContentType?: CourseContentType;
    ResourceLink?: string;
    ActionTemplateId?: uuid;
    Sequence?: number;
courseId?: uuid;
learningPathId?: uuid;
courseModuleId?: uuid;
}

export interface CourseContentSearchResults extends BaseSearchResults {
        Items: CourseContentResponseDto[];

}
