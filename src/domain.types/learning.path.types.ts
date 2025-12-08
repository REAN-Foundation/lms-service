import { BaseSearchFilters, BaseSearchResults } from './miscellaneous/base.search.types';
import { uuid } from './miscellaneous/system.types';

export interface LearningPathCreateModel {
    TenantId: uuid;
    /** @minLength 0 @maxLength 64 */
    Name: string;
    /** @minLength 0 @maxLength 2000 */
    Description?: string;
    /** @minLength 0 @maxLength 1000 */
    ImageUrl?: string;
    DurationInDays?: number;
    PreferenceWeight?: number;
    Enabled?: boolean;
    /** JSON object: { "course-uuid": sequence_number } */
    CourseSequence?: Record<string, number>;
}

export interface LearningPathUpdateModel {
    TenantId?: uuid;
    /** @minLength 0 @maxLength 64 */
    Name?: string;
    /** @minLength 0 @maxLength 2000 */
    Description?: string;
    /** @minLength 0 @maxLength 1000 */
    ImageUrl?: string;
    DurationInDays?: number;
    PreferenceWeight?: number;
    Enabled?: boolean;
    /** JSON object: { "course-uuid": sequence_number } */
    CourseSequence?: Record<string, number>;
}

export interface LearningPathResponseDto {
    id: uuid;
    TenantId?: uuid;
    Name?: string;
    Description?: string;
    ImageUrl?: string;
    DurationInDays?: number;
    PreferenceWeight?: number;
    Enabled?: boolean;
    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface LearningPathSearchFilters extends BaseSearchFilters {
    TenantId?: uuid;
    /** @minLength 0 @maxLength 64 */
    Name?: string;
    /** @minLength 0 @maxLength 2000 */
    Description?: string;
    /** @minLength 0 @maxLength 1000 */
    ImageUrl?: string;
    DurationInDays?: number;
    PreferenceWeight?: number;
    Enabled?: boolean;
}

export interface LearningPathSearchResults extends BaseSearchResults {
    Items: LearningPathResponseDto[];
}
