
import { IsString, IsNumber, IsOptional, IsBoolean, IsUUID } from 'class-validator';

export class UserLearningCreateModel {
    @IsOptional()
    @IsUUID()
    id?: string;  
    @IsString()
    UserId: string;
    @IsString()
    ActionId: string;
    @IsString()
    ProgressStatus: string;
    @IsNumber()
    PercentageCompletion: number;

}

export class UserLearningUpdateModel {
    @IsOptional()
    @IsString()
    UserId?: string;
    @IsOptional()
    @IsString()
    ActionId?: string;
    @IsOptional()
    @IsString()
    ProgressStatus?: string;
    @IsOptional()
    @IsNumber()
    PercentageCompletion?: number;

}

export class UserLearningSearchParams {
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