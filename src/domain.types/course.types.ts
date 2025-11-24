import { BaseSearchFilters, BaseSearchResults } from './miscellaneous/base.search.types';
import { uuid } from './miscellaneous/system.types';

export interface CourseCreateModel {
    /** @minLength 0 @maxLength 64 */
    TenantId: string;
    /** @minLength 0 @maxLength 64 */
    Name: string;
    /** @minLength 0 @maxLength 2000 */
    Description: string;
    /** @minLength 0 @maxLength 1000 */
    ImageUrl: string;
    DurationInDays: number;
}

export interface CourseUpdateModel {
    /** @minLength 0 @maxLength 64 */
    TenantId?: string;
    /** @minLength 0 @maxLength 64 */
    Name?: string;
    /** @minLength 0 @maxLength 2000 */
    Description?: string;
    /** @minLength 0 @maxLength 1000 */
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
    /** @minLength 0 @maxLength 64 */
    TenantId?: string;
    /** @minLength 0 @maxLength 64 */
    Name?: string;
    /** @minLength 0 @maxLength 2000 */
    Description?: string;
    /** @minLength 0 @maxLength 1000 */
    ImageUrl?: string;
    DurationInDays?: number;
}

export interface CourseSearchResults extends BaseSearchResults {
    Items: CourseResponseDto[];
}
