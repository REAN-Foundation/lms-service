import { BaseSearchFilters, BaseSearchResults } from './miscellaneous/base.search.types';
import { uuid } from './miscellaneous/system.types';

export interface CertificatesCreateModel {
    UserId: uuid;
    /** @minLength 0 @maxLength 64 */
    CertificateNumber: string;
    /** @minLength 0 @maxLength 64 */
    CertificateName: string;
    /** @minLength 0 @maxLength 64 */
    CertificateType: string;
    /** @minLength 0 @maxLength 64 */
    IssuedDate: string;
    ExpiryDate: Date;
    /** @minLength 0 @maxLength 1000 */
    CertificateUrl: string;
    FinalGrade: number;
    CreditHours: number;
    /** @minLength 0 @maxLength 64 */
    Skills: string;
    IsVerified: boolean;
    /** @minLength 0 @maxLength 1000 */
    VerificationUrl: string;
    IssuedBy: uuid;
    CourseId: uuid;
}

export interface CertificatesUpdateModel {
    UserId?: uuid;
    /** @minLength 0 @maxLength 64 */
    CertificateNumber?: string;
    /** @minLength 0 @maxLength 64 */
    CertificateName?: string;
    /** @minLength 0 @maxLength 64 */
    CertificateType?: string;
    /** @minLength 0 @maxLength 64 */
    IssuedDate?: string;
    ExpiryDate?: Date;
    /** @minLength 0 @maxLength 1000 */
    CertificateUrl?: string;
    FinalGrade?: number;
    CreditHours?: number;
    /** @minLength 0 @maxLength 64 */
    Skills?: string;
    IsVerified?: boolean;
    /** @minLength 0 @maxLength 1000 */
    VerificationUrl?: string;
    IssuedBy?: uuid;
    CourseId?: uuid;
}

export interface CertificatesResponseDto {
    id: uuid;
    UserId: uuid;
    CertificateNumber: string;
    CertificateName: string;
    CertificateType: string;
    IssuedDate: string;
    ExpiryDate: Date;
    CertificateUrl: string;
    FinalGrade: number;
    CreditHours: number;
    Skills: string;
    IsVerified: boolean;
    VerificationUrl: string;
    IssuedBy: uuid;
    CourseId: uuid;
}

export interface CertificatesSearchFilters extends BaseSearchFilters {
    UserId?: uuid;
    /** @minLength 0 @maxLength 64 */
    CertificateNumber?: string;
    /** @minLength 0 @maxLength 64 */
    CertificateName?: string;
    /** @minLength 0 @maxLength 64 */
    CertificateType?: string;
    /** @minLength 0 @maxLength 64 */
    IssuedDate?: string;
    ExpiryDate?: Date;
    /** @minLength 0 @maxLength 1000 */
    CertificateUrl?: string;
    FinalGrade?: number;
    CreditHours?: number;
    /** @minLength 0 @maxLength 64 */
    Skills?: string;
    IsVerified?: boolean;
    /** @minLength 0 @maxLength 1000 */
    VerificationUrl?: string;
    IssuedBy?: uuid;
    courseId?: uuid;
}

export interface CertificatesSearchResults extends BaseSearchResults {
    Items: CertificatesResponseDto[];
}
