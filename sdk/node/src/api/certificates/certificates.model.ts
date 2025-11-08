
import { IsString, IsNumber, IsOptional, IsBoolean, IsUUID } from 'class-validator';

export class CertificatesCreateModel {
    @IsOptional()
    @IsUUID()
    id?: string;  
    @IsString()
    UserId: string;
    @IsString()
    CertificateNumber: string;
    @IsString()
    CertificateName: string;
    @IsString()
    CertificateType: string;
    @IsString()
    IssuedDate: string;
    @IsString()
    ExpiryDate: string;
    @IsString()
    CertificateUrl: string;
    @IsNumber()
    FinalGrade: number;
    @IsNumber()
    CreditHours: number;
    @IsString()
    Skills: string;
    @IsString()
    IsVerified: boolean;
    @IsString()
    VerificationUrl: string;
    @IsString()
    IssuedBy: string;

}

export class CertificatesUpdateModel {
    @IsOptional()
    @IsString()
    UserId?: string;
    @IsOptional()
    @IsString()
    CertificateNumber?: string;
    @IsOptional()
    @IsString()
    CertificateName?: string;
    @IsOptional()
    @IsString()
    CertificateType?: string;
    @IsOptional()
    @IsString()
    IssuedDate?: string;
    @IsOptional()
    @IsString()
    ExpiryDate?: string;
    @IsOptional()
    @IsString()
    CertificateUrl?: string;
    @IsOptional()
    @IsNumber()
    FinalGrade?: number;
    @IsOptional()
    @IsNumber()
    CreditHours?: number;
    @IsOptional()
    @IsString()
    Skills?: string;
    @IsOptional()
    @IsString()
    IsVerified?: boolean;
    @IsOptional()
    @IsString()
    VerificationUrl?: string;
    @IsOptional()
    @IsString()
    IssuedBy?: string;

}

export class CertificatesSearchParams {
    @IsString()
    name: string;
}

export class ApiResponse<T> {
    Data: T;

    @IsOptional()
    @IsString()
    Message?: string;

    @IsOptional()
    @IsBoolean()
    Success?: boolean;
}