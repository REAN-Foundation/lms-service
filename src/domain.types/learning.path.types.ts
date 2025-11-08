import { BaseSearchFilters, BaseSearchResults } from "./miscellaneous/base.search.types";
import { uuid } from "./miscellaneous/system.types";


export interface LearningPathCreateModel {
    TenantId: uuid;
    Name: string;
    Description: string;
    ImageUrl: string;
    DurationInDays: number;
    PreferenceWeight: number;
    Enabled: boolean;
}

export interface LearningPathUpdateModel {
    TenantId?: uuid;
    Name?: string;
    Description?: string;
    ImageUrl?: string;
    DurationInDays?: number;
    PreferenceWeight?: number;
    Enabled?: boolean;
}

export interface LearningPathResponseDto {
    id: uuid;
    TenantId: uuid;
    Name: string;
    Description: string;
    ImageUrl: string;
    DurationInDays: number;
    PreferenceWeight: number;
    Enabled: boolean;
}

export interface LearningPathSearchFilters extends BaseSearchFilters {
    TenantId?: uuid;
    Name?: string;
    Description?: string;
    ImageUrl?: string;
    DurationInDays?: number;
    PreferenceWeight?: number;
    Enabled?: boolean;
}

export interface LearningPathSearchResults extends BaseSearchResults {
        Items: LearningPathResponseDto[];

}
