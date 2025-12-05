import { CourseModule } from '../models/course.module.entity';
import { CourseModuleResponseDto } from '../../../domain.types/course.module.types';

///////////////////////////////////////////////////////////////////////////////////

export class CourseModuleMapper {
    static toResponseDto = (courseModule: CourseModule): CourseModuleResponseDto => {
        if (courseModule == null) {
            return null;
        }
        const dto: CourseModuleResponseDto = {
            id: courseModule.id,
            Name: courseModule.Name,
            Description: courseModule.Description,
            ImageUrl: courseModule.ImageUrl,
            DurationInMins: courseModule.DurationInMins,
            ContentSequence: courseModule.ContentSequence,
            CourseId: courseModule.Course?.id,
            CreatedAt: courseModule.CreatedAt,
            UpdatedAt: courseModule.UpdatedAt,
        };
        return dto;
    };
}
