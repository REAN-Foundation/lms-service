
import { IsString, IsNumber, IsOptional, IsBoolean, IsUUID } from 'class-validator';

export class LearningPathCoursesCreateModel {
    @IsOptional()
    @IsUUID()
    id?: string;  

}

export class LearningPathCoursesUpdateModel {

}

export class LearningPathCoursesSearchParams {
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