import { LearningPathEnrollment } from '../models/learning.path.enrollment.entity';
import { LearningPathEnrollmentResponseDto } from '../../../domain.types/learning.path.enrollment.types';
import { LearningPathMapper } from './learning.path.mapper';

///////////////////////////////////////////////////////////////////////////////////

export class LearningPathEnrollmentMapper {
    static toResponseDto = (enrollment: LearningPathEnrollment): LearningPathEnrollmentResponseDto => {
        if (enrollment == null) {
            return null;
        }

        if (!enrollment.LearningPath) {
            throw new Error('LearningPath relation must be loaded for LearningPathEnrollment');
        }

        const dto: LearningPathEnrollmentResponseDto = {
            id: enrollment.id,
            UserId: enrollment.UserId,
            LearningPathId: enrollment.LearningPath.id,
            TenantId: enrollment.TenantId,
            StartDate: enrollment.StartDate,
            ExpectedEndDate: enrollment.ExpectedEndDate,
            CompletedAt: enrollment.CompletedAt,
            IsActive: enrollment.IsActive,
            EnrolledAt: enrollment.EnrolledAt,
            LearningPath: LearningPathMapper.toResponseDto(enrollment.LearningPath),
            CreatedAt: enrollment.CreatedAt,
            UpdatedAt: enrollment.UpdatedAt,
        };

        return dto;
    };
}

