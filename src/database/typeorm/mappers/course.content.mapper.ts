import { CourseContent } from '../models/course.content.entity';
import { CourseContentResponseDto } from '../../../domain.types/course.content.types';

///////////////////////////////////////////////////////////////////////////////////

export class CourseContentMapper {
    static toResponseDto = (courseContent: CourseContent): CourseContentResponseDto => {
        if (courseContent == null) {
            return null;
        }
        const dto: CourseContentResponseDto = {
            id: courseContent.id,
            Title: courseContent.Title,
            Description: courseContent.Description,
            ImageUrl: courseContent.ImageUrl,
            DurationInMins: courseContent.DurationInMins,
            ContentType: courseContent.ContentType,
            ResourceLink: courseContent.ResourceLink,
            ActionTemplateId: courseContent.ActionTemplateId,
            Sequence: courseContent.Sequence,
            CourseId: courseContent.Course?.id,
            CourseModuleId: courseContent.CourseModule?.id,
            CreatedAt: courseContent.CreatedAt,
            UpdatedAt: courseContent.UpdatedAt,
        };
        return dto;
    };
}
