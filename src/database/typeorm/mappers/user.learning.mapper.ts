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
            PercentageCompletion: userLearning.PercentageCompletion,
            CourseId: userLearning.Course?.id,
            LearningPathId: userLearning.LearningPath?.id,
            CourseModuleId: userLearning.CourseModule?.id,
            CourseContentId: userLearning.CourseContent?.id,
            CreatedAt: userLearning.CreatedAt,
            UpdatedAt: userLearning.UpdatedAt,
        };
        return dto;
    };
}
