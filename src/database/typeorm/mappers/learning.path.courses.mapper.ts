import { LearningPathCourses } from '../models/learning.path.courses.entity';
import { LearningPathCoursesResponseDto } from '../../../domain.types/learning.path.courses.types';

///////////////////////////////////////////////////////////////////////////////////

export class LearningPathCoursesMapper {
    static toResponseDto = (learningPathCourses: LearningPathCourses): LearningPathCoursesResponseDto => {
        if (learningPathCourses == null) {
            return null;
        }
        const dto: LearningPathCoursesResponseDto = {
            id: learningPathCourses.id,
            CourseId: learningPathCourses.Course?.id,
            LearningPathId: learningPathCourses.LearningPath?.id,
            /*
			Course: learningPathCourses.Course? {
			TenantId: learningPathCourses.Course.TenantId,
			Name: learningPathCourses.Course.Name,
			Description: learningPathCourses.Course.Description,
			ImageUrl: learningPathCourses.Course.ImageUrl,
			DurationInDays: learningPathCourses.Course.DurationInDays,			} : null,
			LearningPath: learningPathCourses.LearningPath? {
			TenantId: learningPathCourses.LearningPath.TenantId,
			Name: learningPathCourses.LearningPath.Name,
			Description: learningPathCourses.LearningPath.Description,
			ImageUrl: learningPathCourses.LearningPath.ImageUrl,
			DurationInDays: learningPathCourses.LearningPath.DurationInDays,
			PreferenceWeight: learningPathCourses.LearningPath.PreferenceWeight,
			Enabled: learningPathCourses.LearningPath.Enabled,			} : null
*/
        };
        return dto;
    };
}
