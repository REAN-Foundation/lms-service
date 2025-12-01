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
            /*
			Course: courseContent.Course? {
			TenantId: courseContent.Course.TenantId,
			Name: courseContent.Course.Name,
			Description: courseContent.Course.Description,
			ImageUrl: courseContent.Course.ImageUrl,
			DurationInDays: courseContent.Course.DurationInDays,			} : null,
			CourseModule: courseContent.CourseModule? {
			Name: courseContent.CourseModule.Name,
			Description: courseContent.CourseModule.Description,
			ImageUrl: courseContent.CourseModule.ImageUrl,
			DurationInMins: courseContent.CourseModule.DurationInMins,
			Sequence: courseContent.CourseModule.Sequence,
			CourseId: courseContent.CourseModule.Course?.id,			} : null
*/
        };
        return dto;
    };
}
