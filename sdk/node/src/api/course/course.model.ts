
import { IsString, IsNumber, IsOptional, IsBoolean, IsUUID } from 'class-validator';

export class CourseCreateModel {
    @IsOptional()
    @IsUUID()
    id?: string;  
    @IsString()
    TenantId: string;
    @IsString()
    Name: string;
    @IsString()
    Description: string;
    @IsString()
    ImageUrl: string;
    @IsNumber()
    DurationInDays: number;

}

export class CourseUpdateModel {
    @IsOptional()
    @IsString()
    TenantId?: string;
    @IsOptional()
    @IsString()
    Name?: string;
    @IsOptional()
    @IsString()
    Description?: string;
    @IsOptional()
    @IsString()
    ImageUrl?: string;
    @IsOptional()
    @IsNumber()
    DurationInDays?: number;

}

export class CourseSearchParams {
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