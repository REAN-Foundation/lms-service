import { BaseSearchFilters, BaseSearchResults } from './miscellaneous/base.search.types';
import { uuid } from './miscellaneous/system.types';

export interface CourseModuleCreateModel {
    /** @minLength 0 @maxLength 64 */
    Name: string;
    /** @minLength 0 @maxLength 2000 */
    Description?: string;
    /** @minLength 0 @maxLength 1000 */
    ImageUrl?: string;
    DurationInMins?: number;
    /** JSON object: { "content-uuid": sequence_number } */
    ContentSequence?: Record<string, number>;
    CourseId: uuid;
}

export interface CourseModuleUpdateModel {
    /** @minLength 0 @maxLength 64 */
    Name?: string;
    /** @minLength 0 @maxLength 2000 */
    Description?: string;
    /** @minLength 0 @maxLength 1000 */
    ImageUrl?: string;
    DurationInMins?: number;
    /** JSON object: { "content-uuid": sequence_number } */
    ContentSequence?: Record<string, number>;
    CourseId?: uuid;
}

export interface CourseModuleResponseDto {
    id: uuid;
    Name: string;
    Description?: string;
    ImageUrl?: string;
    DurationInMins?: number;
    /** JSON object: { "content-uuid": sequence_number } */
    ContentSequence?: Record<string, number>;
    CourseId: uuid;
    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface CourseModuleSearchFilters extends BaseSearchFilters {
    /** @minLength 0 @maxLength 64 */
    Name?: string;
    /** @minLength 0 @maxLength 2000 */
    Description?: string;
    /** @minLength 0 @maxLength 1000 */
    ImageUrl?: string;
    DurationInMins?: number;
    courseId?: uuid;
}

export interface CourseModuleSearchResults extends BaseSearchResults {
    Items: CourseModuleResponseDto[];
}
