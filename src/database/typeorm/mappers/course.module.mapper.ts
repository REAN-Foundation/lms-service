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
            Sequence: courseModule.Sequence,
            CourseId: courseModule.Course?.id,
            /*
			Course: courseModule.Course? {
			TenantId: courseModule.Course.TenantId,
			Name: courseModule.Course.Name,
			Description: courseModule.Course.Description,
			ImageUrl: courseModule.Course.ImageUrl,
			DurationInDays: courseModule.Course.DurationInDays,			} : null
*/
        };
        return dto;
    };
}
