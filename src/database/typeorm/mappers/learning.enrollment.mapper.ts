import { LearningEnrollment } from '../models/learning.enrollment.entity';
import { LearningEnrollmentResponseDto } from '../../../domain.types/learning.enrollment.types';
import { CourseMapper } from './course.mapper';
import { LearningPathMapper } from './learning.path.mapper';

///////////////////////////////////////////////////////////////////////////////////

export class LearningEnrollmentMapper {
    static toResponseDto = (enrollment: LearningEnrollment): LearningEnrollmentResponseDto => {
        if (enrollment == null) {
            return null;
        }

        const dto: LearningEnrollmentResponseDto = {
            id: enrollment.id,
            UserId: enrollment.UserId,
            CourseId: enrollment.Course?.id,
            LearningPathId: enrollment.LearningPath?.id,
            TenantId: enrollment.TenantId,
            ProgressStatus: enrollment.ProgressStatus,
            StartDate: enrollment.StartDate,
            EndDate: enrollment.EndDate,
            CompletedAt: enrollment.CompletedAt,
            IsActive: enrollment.IsActive,
            EnrolledAt: enrollment.EnrolledAt,
            Course: enrollment.Course ? CourseMapper.toResponseDto(enrollment.Course) : null,
            LearningPath: enrollment.LearningPath ? LearningPathMapper.toResponseDto(enrollment.LearningPath) : null,
            CreatedAt: enrollment.CreatedAt,
            UpdatedAt: enrollment.UpdatedAt,
        };

        return dto;
    };
}

