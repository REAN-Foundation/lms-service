import { UserLearning } from '../models/user.learning.entity';
import { UserLearningResponseDto } from '../../../domain.types/user.learning.types';

///////////////////////////////////////////////////////////////////////////////////

export class UserLearningMapper {
    static toResponseDto = (userLearning: UserLearning): UserLearningResponseDto => {
        if (userLearning == null) {
            return null;
        }
        const dto: UserLearningResponseDto = {
            id: userLearning.id,
            UserId: userLearning.UserId,
            ProgressStatus: userLearning.ProgressStatus,
            CourseId: userLearning.Course?.id,
            LearningPathId: userLearning.LearningPath?.id,
            CourseModuleId: userLearning.CourseModule?.id,
            CourseContentId: userLearning.CourseContent?.id,
            /*
			Course: userLearning.Course? {
			TenantId: userLearning.Course.TenantId,
			Name: userLearning.Course.Name,
			Description: userLearning.Course.Description,
			ImageUrl: userLearning.Course.ImageUrl,
			DurationInDays: userLearning.Course.DurationInDays,			} : null,
			LearningPath: userLearning.LearningPath? {
			TenantId: userLearning.LearningPath.TenantId,
			Name: userLearning.LearningPath.Name,
			Description: userLearning.LearningPath.Description,
			ImageUrl: userLearning.LearningPath.ImageUrl,
			DurationInDays: userLearning.LearningPath.DurationInDays,
			PreferenceWeight: userLearning.LearningPath.PreferenceWeight,
			Enabled: userLearning.LearningPath.Enabled,			} : null,
			CourseModule: userLearning.CourseModule? {
			Name: userLearning.CourseModule.Name,
			Description: userLearning.CourseModule.Description,
			ImageUrl: userLearning.CourseModule.ImageUrl,
			DurationInMins: userLearning.CourseModule.DurationInMins,
			Sequence: userLearning.CourseModule.Sequence,
			CourseId: userLearning.CourseModule.Course?.id,
			LearningPathId: userLearning.CourseModule.LearningPath?.id,			} : null,
			CourseContent: userLearning.CourseContent? {
			Title: userLearning.CourseContent.Title,
			Description: userLearning.CourseContent.Description,
			ImageUrl: userLearning.CourseContent.ImageUrl,
			DurationInMins: userLearning.CourseContent.DurationInMins,
			ContentType: userLearning.CourseContent.ContentType,
			ResourceLink: userLearning.CourseContent.ResourceLink,
			ActionTemplateId: userLearning.CourseContent.ActionTemplateId,
			Sequence: userLearning.CourseContent.Sequence,
			CourseId: userLearning.CourseContent.Course?.id,
			LearningPathId: userLearning.CourseContent.LearningPath?.id,
			CourseModuleId: userLearning.CourseContent.CourseModule?.id,			} : null
*/
        };
        return dto;
    };
}
