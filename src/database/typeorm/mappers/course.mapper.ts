import { Course } from '../models/course.entity';
import { CourseResponseDto } from '../../../domain.types/course.types';

///////////////////////////////////////////////////////////////////////////////////

export class CourseMapper {
    static toResponseDto = (course: Course): CourseResponseDto => {
        if (course == null) {
            return null;
        }
        const dto: CourseResponseDto = {
            id: course.id,
            TenantId: course.TenantId,
            Name: course.Name,
            Description: course.Description,
            ImageUrl: course.ImageUrl,
            DurationInDays: course.DurationInDays,
            ModuleSequence: course.ModuleSequence,
            CreatedAt: course.CreatedAt,
            UpdatedAt: course.UpdatedAt,
        };
        return dto;
    };
}
