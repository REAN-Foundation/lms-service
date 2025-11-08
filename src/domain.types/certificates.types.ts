import { BaseSearchFilters, BaseSearchResults } from "./miscellaneous/base.search.types";
import { uuid } from "./miscellaneous/system.types";


export interface CertificatesCreateModel {
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

export interface CertificatesUpdateModel {
    UserId?: uuid;
    CertificateNumber?: string;
    CertificateName?: string;
    CertificateType?: string;
    IssuedDate?: string;
    ExpiryDate?: Date;
    CertificateUrl?: string;
    FinalGrade?: number;
    CreditHours?: number;
    Skills?: string;
    IsVerified?: boolean;
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
    CertificateNumber?: string;
    CertificateName?: string;
    CertificateType?: string;
    IssuedDate?: string;
    ExpiryDate?: Date;
    CertificateUrl?: string;
    FinalGrade?: number;
    CreditHours?: number;
    Skills?: string;
    IsVerified?: boolean;
    VerificationUrl?: string;
    IssuedBy?: uuid;
courseId?: uuid;
}

export interface CertificatesSearchResults extends BaseSearchResults {
        Items: CertificatesResponseDto[];

}
