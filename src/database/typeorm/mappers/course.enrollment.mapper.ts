import { CourseEnrollment } from '../models/course.enrollment.entity';
import { CourseEnrollmentResponseDto } from '../../../domain.types/course.enrollment.types';
import { CourseMapper } from './course.mapper';

///////////////////////////////////////////////////////////////////////////////////

export class CourseEnrollmentMapper {
    static toResponseDto = (enrollment: CourseEnrollment): CourseEnrollmentResponseDto => {
        if (enrollment == null) {
            return null;
        }

        if (!enrollment.Course) {
            throw new Error('Course relation must be loaded for CourseEnrollment');
        }

        const dto: CourseEnrollmentResponseDto = {
            id: enrollment.id,
            UserId: enrollment.UserId,
            CourseId: enrollment.Course.id,
            TenantId: enrollment.TenantId,
            StartDate: enrollment.StartDate,
            ExpectedEndDate: enrollment.ExpectedEndDate,
            CompletedAt: enrollment.CompletedAt,
            IsActive: enrollment.IsActive,
            EnrolledAt: enrollment.EnrolledAt,
            Course: CourseMapper.toResponseDto(enrollment.Course),
            CreatedAt: enrollment.CreatedAt,
            UpdatedAt: enrollment.UpdatedAt,
        };

        return dto;
    };
}

