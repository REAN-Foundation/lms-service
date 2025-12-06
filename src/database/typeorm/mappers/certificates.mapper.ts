import { Certificates } from '../models/certificates.entity';
import { CertificatesResponseDto } from '../../../domain.types/certificates.types';

///////////////////////////////////////////////////////////////////////////////////

export class CertificatesMapper {
    static toResponseDto = (certificates: Certificates): CertificatesResponseDto => {
        if (certificates == null) {
            return null;
        }
        const dto: CertificatesResponseDto = {
            id: certificates.id,
            UserId: certificates.UserId,
            CertificateNumber: certificates.CertificateNumber,
            CertificateName: certificates.CertificateName,
            CertificateType: certificates.CertificateType,
            IssuedDate: certificates.IssuedDate,
            ExpiryDate: certificates.ExpiryDate,
            CertificateUrl: certificates.CertificateUrl,
            FinalGrade: certificates.FinalGrade,
            CreditHours: certificates.CreditHours,
            Skills: certificates.Skills,
            IsVerified: certificates.IsVerified,
            VerificationUrl: certificates.VerificationUrl,
            IssuedBy: certificates.IssuedBy,
            CourseId: certificates.Course?.id,
            CreatedAt: certificates.CreatedAt,
            UpdatedAt: certificates.UpdatedAt,
        };
        return dto;
    };
}
