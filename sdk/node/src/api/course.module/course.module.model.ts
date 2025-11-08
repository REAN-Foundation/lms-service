
import { IsString, IsNumber, IsOptional, IsBoolean, IsUUID } from 'class-validator';

export class CourseModuleCreateModel {
    @IsOptional()
    @IsUUID()
    id?: string;  
    @IsString()
    Name: string;
    @IsString()
    Description: string;
    @IsString()
    ImageUrl: string;
    @IsNumber()
    DurationInMins: number;
    @IsNumber()
    Sequence: number;

}

export class CourseModuleUpdateModel {
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
    DurationInMins?: number;
    @IsOptional()
    @IsNumber()
    Sequence?: number;

}

export class CourseModuleSearchParams {
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