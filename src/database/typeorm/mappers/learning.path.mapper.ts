import { LearningPath } from '../models/learning.path.entity';
import { LearningPathResponseDto } from '../../../domain.types/learning.path.types';

///////////////////////////////////////////////////////////////////////////////////

export class LearningPathMapper {
    static toResponseDto = (learningPath: LearningPath): LearningPathResponseDto => {
        if (learningPath == null) {
            return null;
        }
        const dto: LearningPathResponseDto = {
            id: learningPath.id,
            TenantId: learningPath.TenantId,
            Name: learningPath.Name,
            Description: learningPath.Description,
            ImageUrl: learningPath.ImageUrl,
            DurationInDays: learningPath.DurationInDays,
            PreferenceWeight: learningPath.PreferenceWeight,
            Enabled: learningPath.Enabled,
        };
        return dto;
    };
}
