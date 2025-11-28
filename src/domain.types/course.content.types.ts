import { BaseSearchFilters, BaseSearchResults } from './miscellaneous/base.search.types';
import { uuid } from './miscellaneous/system.types';
import { CourseContentType } from './enums/course.content.type.enum';

export interface CourseContentCreateModel {
    /** @minLength 0 @maxLength 64 */
    Title: string;
    /** @minLength 0 @maxLength 2000 */
    Description?: string;
    /** @minLength 0 @maxLength 1000 */
    ImageUrl?: string;
    DurationInMins?: number;
    ContentType: CourseContentType;
    /** @minLength 0 @maxLength 1000 */
    ResourceLink?: string;
    ActionTemplateId?: uuid;
    Sequence?: number;
    CourseId: uuid;
    CourseModuleId: uuid;
}

export interface CourseContentUpdateModel {
    /** @minLength 0 @maxLength 64 */
    Title?: string;
    /** @minLength 0 @maxLength 2000 */
    Description?: string;
    /** @minLength 0 @maxLength 1000 */
    ImageUrl?: string;
    DurationInMins?: number;
    ContentType?: CourseContentType;
    /** @minLength 0 @maxLength 1000 */
    ResourceLink?: string;
    ActionTemplateId?: uuid;
    Sequence?: number;
    CourseId?: uuid;
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
    CourseModuleId: uuid;
}

export interface CourseContentSearchFilters extends BaseSearchFilters {
    /** @minLength 0 @maxLength 64 */
    Title?: string;
    /** @minLength 0 @maxLength 2000 */
    Description?: string;
    /** @minLength 0 @maxLength 1000 */
    ImageUrl?: string;
    DurationInMins?: number;
    ContentType?: CourseContentType;
    /** @minLength 0 @maxLength 1000 */
    ResourceLink?: string;
    ActionTemplateId?: uuid;
    Sequence?: number;
    courseId?: uuid;
    courseModuleId?: uuid;
}

export interface CourseContentSearchResults extends BaseSearchResults {
    Items: CourseContentResponseDto[];
}
