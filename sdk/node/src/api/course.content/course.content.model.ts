
import { IsString, IsNumber, IsOptional, IsBoolean, IsUUID } from 'class-validator';

export class CourseContentCreateModel {
    @IsOptional()
    @IsUUID()
    id?: string;  
    @IsString()
    Title: string;
    @IsString()
    Description: string;
    @IsString()
    ImageUrl: string;
    @IsNumber()
    DurationInMins: number;
    @IsString()
    ContentType: string;
    @IsString()
    ResourceLink: string;
    @IsString()
    ActionTemplateId: string;
    @IsNumber()
    Sequence: number;

}

export class CourseContentUpdateModel {
    @IsOptional()
    @IsString()
    Title?: string;
    @IsOptional()
    @IsString()
    Description?: string;
    @IsOptional()
    @IsString()
    ImageUrl?: string;
    @IsOptional()
    @IsNumber()
    DurationInMins?: number;
    @IsOptional()
    @IsString()
    ContentType?: string;
    @IsOptional()
    @IsString()
    ResourceLink?: string;
    @IsOptional()
    @IsString()
    ActionTemplateId?: string;
    @IsOptional()
    @IsNumber()
    Sequence?: number;

}

export class CourseContentSearchParams {
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