
import { IsString, IsNumber, IsOptional, IsBoolean, IsUUID } from 'class-validator';

export class LearningPathCreateModel {
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
    @IsNumber()
    PreferenceWeight: number;
    @IsString()
    Enabled: boolean;

}

export class LearningPathUpdateModel {
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
    @IsOptional()
    @IsNumber()
    PreferenceWeight?: number;
    @IsOptional()
    @IsString()
    Enabled?: boolean;

}

export class LearningPathSearchParams {
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