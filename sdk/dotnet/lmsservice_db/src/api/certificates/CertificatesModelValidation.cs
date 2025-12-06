
using System.Xml;
using FluentValidation;
using lmsservice_db.src.api.certificates.certificatesmodel;

namespace lmsservice_db.src.api.certificates.certificatesvalidation;
public class CertificatesCreateModelValidator : AbstractValidator<CertificatesCreateModel>
{
    public CertificatesCreateModelValidator()
    {
              RuleFor(x => x.UserId)
         .NotEmpty().WithMessage("UserId is required.")
         .NotEmpty().WithMessage("UserId must be a valid UUID.")
         .Matches("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$").WithMessage("UserId must be a valid UUID format.");

      RuleFor(x => x.CertificateNumber)
         .NotEmpty().WithMessage("CertificateNumber is required.")
         .Length(0, 64).WithMessage("CertificateNumber must be between 0 and 64 characters.");

      RuleFor(x => x.CertificateName)
         .NotEmpty().WithMessage("CertificateName is required.")
         .Length(0, 64).WithMessage("CertificateName must be between 0 and 64 characters.");

      RuleFor(x => x.CertificateType)
         .NotEmpty().WithMessage("CertificateType is required.")
         .Length(0, 64).WithMessage("CertificateType must be between 0 and 64 characters.");

      RuleFor(x => x.IssuedDate)
         .NotEmpty().WithMessage("IssuedDate is required.")
         .Length(0, 64).WithMessage("IssuedDate must be between 0 and 64 characters.");

      RuleFor(x => x.ExpiryDate)
         .NotEmpty().WithMessage("ExpiryDate is required.")
         .Must(date => date != default).WithMessage("ExpiryDate must be a valid date.");

      RuleFor(x => x.CertificateUrl)
         .NotEmpty().WithMessage("CertificateUrl is required.")
         .Length(0, 64).WithMessage("CertificateUrl must be between 0 and 64 characters.");

      RuleFor(x => x.FinalGrade)
         .NotEmpty().WithMessage("FinalGrade is required.")
         .Must(x => x >= 0).WithMessage("FinalGrade must be a valid non-negative decimal number.");

      RuleFor(x => x.CreditHours)
         .NotEmpty().WithMessage("CreditHours is required.")
         .Must(x => x >= 0).WithMessage("CreditHours must be a valid non-negative number.");

      RuleFor(x => x.Skills)
         .NotEmpty().WithMessage("Skills is required.")
         .Length(0, 64).WithMessage("Skills must be between 0 and 64 characters.");

      RuleFor(x => x.IsVerified)
         .NotEmpty().WithMessage("IsVerified is required.")
         .NotNull().WithMessage("IsVerified must be true or false.");

      RuleFor(x => x.VerificationUrl)
         .NotEmpty().WithMessage("VerificationUrl is required.")
         .Length(0, 64).WithMessage("VerificationUrl must be between 0 and 64 characters.");

      RuleFor(x => x.IssuedBy)
         .NotEmpty().WithMessage("IssuedBy is required.")
         .NotEmpty().WithMessage("IssuedBy must be a valid UUID.")
         .Matches("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$").WithMessage("IssuedBy must be a valid UUID format.");

       
    }
}

public class CertificatesUpdateModelValidator : AbstractValidator<CertificatesUpdateModel>
{
    public CertificatesUpdateModelValidator()
    {
              RuleFor(x => x.UserId)
         .NotEmpty().WithMessage("UserId is required.")
         .NotEmpty().WithMessage("UserId must be a valid UUID.")
         .Matches("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$").WithMessage("UserId must be a valid UUID format.");

      RuleFor(x => x.CertificateNumber)
         .NotEmpty().WithMessage("CertificateNumber is required.")
         .Length(0, 64).WithMessage("CertificateNumber must be between 0 and 64 characters.");

      RuleFor(x => x.CertificateName)
         .NotEmpty().WithMessage("CertificateName is required.")
         .Length(0, 64).WithMessage("CertificateName must be between 0 and 64 characters.");

      RuleFor(x => x.CertificateType)
         .NotEmpty().WithMessage("CertificateType is required.")
         .Length(0, 64).WithMessage("CertificateType must be between 0 and 64 characters.");

      RuleFor(x => x.IssuedDate)
         .NotEmpty().WithMessage("IssuedDate is required.")
         .Length(0, 64).WithMessage("IssuedDate must be between 0 and 64 characters.");

      RuleFor(x => x.ExpiryDate)
         .NotEmpty().WithMessage("ExpiryDate is required.")
         .Must(date => date != default).WithMessage("ExpiryDate must be a valid date.");

      RuleFor(x => x.CertificateUrl)
         .NotEmpty().WithMessage("CertificateUrl is required.")
         .Length(0, 64).WithMessage("CertificateUrl must be between 0 and 64 characters.");

      RuleFor(x => x.FinalGrade)
         .NotEmpty().WithMessage("FinalGrade is required.")
         .Must(x => x >= 0).WithMessage("FinalGrade must be a valid non-negative decimal number.");

      RuleFor(x => x.CreditHours)
         .NotEmpty().WithMessage("CreditHours is required.")
         .Must(x => x >= 0).WithMessage("CreditHours must be a valid non-negative number.");

      RuleFor(x => x.Skills)
         .NotEmpty().WithMessage("Skills is required.")
         .Length(0, 64).WithMessage("Skills must be between 0 and 64 characters.");

      RuleFor(x => x.IsVerified)
         .NotEmpty().WithMessage("IsVerified is required.")
         .NotNull().WithMessage("IsVerified must be true or false.");

      RuleFor(x => x.VerificationUrl)
         .NotEmpty().WithMessage("VerificationUrl is required.")
         .Length(0, 64).WithMessage("VerificationUrl must be between 0 and 64 characters.");

      RuleFor(x => x.IssuedBy)
         .NotEmpty().WithMessage("IssuedBy is required.")
         .NotEmpty().WithMessage("IssuedBy must be a valid UUID.")
         .Matches("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$").WithMessage("IssuedBy must be a valid UUID format.");

       
    }
}

public class CertificatesSearchFiltersValidator : AbstractValidator<CertificatesSearchFilters>
{
    public CertificatesSearchFiltersValidator()
    {
                RuleFor(x => x.UserId)
           .NotEmpty().WithMessage("UserId is required.")
           .NotEmpty().WithMessage("UserId must be a valid UUID.")
           .Matches("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$").WithMessage("UserId must be a valid UUID format.");

        RuleFor(x => x.CertificateNumber)
           .NotEmpty().WithMessage("CertificateNumber is required.")
           .Length(0, 64).WithMessage("CertificateNumber must be between 0 and 64 characters.");

        RuleFor(x => x.CertificateName)
           .NotEmpty().WithMessage("CertificateName is required.")
           .Length(0, 64).WithMessage("CertificateName must be between 0 and 64 characters.");

        RuleFor(x => x.CertificateType)
           .NotEmpty().WithMessage("CertificateType is required.")
           .Length(0, 64).WithMessage("CertificateType must be between 0 and 64 characters.");

        RuleFor(x => x.IssuedDate)
           .NotEmpty().WithMessage("IssuedDate is required.")
           .Length(0, 64).WithMessage("IssuedDate must be between 0 and 64 characters.");

        RuleFor(x => x.ExpiryDate)
           .NotEmpty().WithMessage("ExpiryDate is required.")
           .Must(date => date != default).WithMessage("ExpiryDate must be a valid date.");

        RuleFor(x => x.CertificateUrl)
           .NotEmpty().WithMessage("CertificateUrl is required.")
           .Length(0, 64).WithMessage("CertificateUrl must be between 0 and 64 characters.");

        RuleFor(x => x.FinalGrade)
           .NotEmpty().WithMessage("FinalGrade is required.")
           .Must(x => x >= 0).WithMessage("FinalGrade must be a valid non-negative decimal number.");

        RuleFor(x => x.CreditHours)
           .NotEmpty().WithMessage("CreditHours is required.")
           .Must(x => x >= 0).WithMessage("CreditHours must be a valid non-negative number.");

        RuleFor(x => x.Skills)
           .NotEmpty().WithMessage("Skills is required.")
           .Length(0, 64).WithMessage("Skills must be between 0 and 64 characters.");

        RuleFor(x => x.IsVerified)
           .NotEmpty().WithMessage("IsVerified is required.")
           .NotNull().WithMessage("IsVerified must be true or false.");

        RuleFor(x => x.VerificationUrl)
           .NotEmpty().WithMessage("VerificationUrl is required.")
           .Length(0, 64).WithMessage("VerificationUrl must be between 0 and 64 characters.");

        RuleFor(x => x.IssuedBy)
           .NotEmpty().WithMessage("IssuedBy is required.")
           .NotEmpty().WithMessage("IssuedBy must be a valid UUID.")
           .Matches("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$").WithMessage("IssuedBy must be a valid UUID format.");


    }
}

public class ApiResponseValidator : AbstractValidator<ApiResponse>
{
    public ApiResponseValidator()
    {
        RuleFor(x => x.Data)
            .NotNull().WithMessage("Data is required.");

        RuleFor(x => x.Message)
            .MaximumLength(500).WithMessage("Message cannot exceed 500 characters.")
            .When(x => x.Message != null);

        RuleFor(x => x.Success)
            .NotNull().WithMessage("Success flag is required.");
    }
}
