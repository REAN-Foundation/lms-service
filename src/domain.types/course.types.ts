import { BaseSearchFilters, BaseSearchResults } from "./miscellaneous/base.search.types";
import { uuid } from "./miscellaneous/system.types";


export interface CourseCreateModel {
    TenantId: string;
    Name: string;
    Description: string;
    ImageUrl: string;
    DurationInDays: number;
}

export interface CourseUpdateModel {
    TenantId?: string;
    Name?: string;
    Description?: string;
    ImageUrl?: string;
    DurationInDays?: number;
}

export interface CourseResponseDto {
    id: uuid;
    TenantId: string;
    Name: string;
    Description: string;
    ImageUrl: string;
    DurationInDays: number;
}

export interface CourseSearchFilters extends BaseSearchFilters {
    TenantId?: string;
    Name?: string;
    Description?: string;
    ImageUrl?: string;
    DurationInDays?: number;
}

export interface CourseSearchResults extends BaseSearchResults {
        Items: CourseResponseDto[];

}
