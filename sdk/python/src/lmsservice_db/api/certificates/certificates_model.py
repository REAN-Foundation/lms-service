
from dataclasses import dataclass, field
from typing import Optional, Dict

@dataclass
class CertificatesCreateModel:
    UserId: str = field(metadata={"min_length": 0, "max_length": 64})
    CertificateNumber: str = field(metadata={"min_length": 0, "max_length": 64})
    CertificateName: str = field(metadata={"min_length": 0, "max_length": 64})
    CertificateType: str = field(metadata={"min_length": 0, "max_length": 64})
    IssuedDate: str = field(metadata={"min_length": 0, "max_length": 64})
    ExpiryDate: str = field(metadata={"min_length": 0, "max_length": 64})
    CertificateUrl: str = field(metadata={"min_length": 0, "max_length": 64})
    FinalGrade: str = field(metadata={"min_length": 0, "max_length": 64})
    CreditHours: str = field(metadata={"min_length": 0, "max_length": 64})
    Skills: str = field(metadata={"min_length": 0, "max_length": 64})
    IsVerified: str = field(metadata={"min_length": 0, "max_length": 64})
    VerificationUrl: str = field(metadata={"min_length": 0, "max_length": 64})
    IssuedBy: str = field(metadata={"min_length": 0, "max_length": 64})


@dataclass
class CertificatesUpdateModel:
    UserId: str = field(metadata={"min_length": 0, "max_length": 64})
    CertificateNumber: str = field(metadata={"min_length": 0, "max_length": 64})
    CertificateName: str = field(metadata={"min_length": 0, "max_length": 64})
    CertificateType: str = field(metadata={"min_length": 0, "max_length": 64})
    IssuedDate: str = field(metadata={"min_length": 0, "max_length": 64})
    ExpiryDate: str = field(metadata={"min_length": 0, "max_length": 64})
    CertificateUrl: str = field(metadata={"min_length": 0, "max_length": 64})
    FinalGrade: str = field(metadata={"min_length": 0, "max_length": 64})
    CreditHours: str = field(metadata={"min_length": 0, "max_length": 64})
    Skills: str = field(metadata={"min_length": 0, "max_length": 64})
    IsVerified: str = field(metadata={"min_length": 0, "max_length": 64})
    VerificationUrl: str = field(metadata={"min_length": 0, "max_length": 64})
    IssuedBy: str = field(metadata={"min_length": 0, "max_length": 64})


@dataclass
class CertificatesSearchParams:
    UserId: str = field(metadata={"min_length": 0, "max_length": 64})
    CertificateNumber: str = field(metadata={"min_length": 0, "max_length": 64})
    CertificateName: str = field(metadata={"min_length": 0, "max_length": 64})
    CertificateType: str = field(metadata={"min_length": 0, "max_length": 64})
    IssuedDate: str = field(metadata={"min_length": 0, "max_length": 64})
    ExpiryDate: str = field(metadata={"min_length": 0, "max_length": 64})
    CertificateUrl: str = field(metadata={"min_length": 0, "max_length": 64})
    FinalGrade: str = field(metadata={"min_length": 0, "max_length": 64})
    CreditHours: str = field(metadata={"min_length": 0, "max_length": 64})
    Skills: str = field(metadata={"min_length": 0, "max_length": 64})
    IsVerified: str = field(metadata={"min_length": 0, "max_length": 64})
    VerificationUrl: str = field(metadata={"min_length": 0, "max_length": 64})
    IssuedBy: str = field(metadata={"min_length": 0, "max_length": 64})


@dataclass
class ApiResponse:
    Data: Dict
    Message: Optional[str] = field(default=None, metadata={"min_length": 2, "max_length": 500})
    Success: Optional[bool] = None
