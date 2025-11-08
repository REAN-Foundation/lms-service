
using System.Xml;
using FluentValidation;
using lmsservice_db.src.api.learning.path.learning.pathmodel;

namespace lmsservice_db.src.api.learning.path.learning.pathvalidation;
public class LearningPathCreateModelValidator : AbstractValidator<LearningPathCreateModel>
{
    public LearningPathCreateModelValidator()
    {
              RuleFor(x => x.TenantId)
         .NotEmpty().WithMessage("TenantId is required.")
         .NotEmpty().WithMessage("TenantId must be a valid UUID.")
         .Matches("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$").WithMessage("TenantId must be a valid UUID format.");

      RuleFor(x => x.Name)
         .NotEmpty().WithMessage("Name is required.")
         .Length(0, 64).WithMessage("Name must be between 0 and 64 characters.");

      RuleFor(x => x.Description)
         .NotEmpty().WithMessage("Description is required.")
         .Length(0, 64).WithMessage("Description must be between 0 and 64 characters.");

      RuleFor(x => x.ImageUrl)
         .NotEmpty().WithMessage("ImageUrl is required.")
         .Length(0, 64).WithMessage("ImageUrl must be between 0 and 64 characters.");

      RuleFor(x => x.DurationInDays)
         .NotEmpty().WithMessage("DurationInDays is required.")
         .Must(x => x >= 0).WithMessage("DurationInDays must be a valid non-negative number.");

      RuleFor(x => x.PreferenceWeight)
         .NotEmpty().WithMessage("PreferenceWeight is required.")
         .Must(x => x >= 0).WithMessage("PreferenceWeight must be a valid non-negative number.");

      RuleFor(x => x.Enabled)
         .NotEmpty().WithMessage("Enabled is required.")
         .NotNull().WithMessage("Enabled must be true or false.");

       
    }
}

public class LearningPathUpdateModelValidator : AbstractValidator<LearningPathUpdateModel>
{
    public LearningPathUpdateModelValidator()
    {
              RuleFor(x => x.TenantId)
         .NotEmpty().WithMessage("TenantId is required.")
         .NotEmpty().WithMessage("TenantId must be a valid UUID.")
         .Matches("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$").WithMessage("TenantId must be a valid UUID format.");

      RuleFor(x => x.Name)
         .NotEmpty().WithMessage("Name is required.")
         .Length(0, 64).WithMessage("Name must be between 0 and 64 characters.");

      RuleFor(x => x.Description)
         .NotEmpty().WithMessage("Description is required.")
         .Length(0, 64).WithMessage("Description must be between 0 and 64 characters.");

      RuleFor(x => x.ImageUrl)
         .NotEmpty().WithMessage("ImageUrl is required.")
         .Length(0, 64).WithMessage("ImageUrl must be between 0 and 64 characters.");

      RuleFor(x => x.DurationInDays)
         .NotEmpty().WithMessage("DurationInDays is required.")
         .Must(x => x >= 0).WithMessage("DurationInDays must be a valid non-negative number.");

      RuleFor(x => x.PreferenceWeight)
         .NotEmpty().WithMessage("PreferenceWeight is required.")
         .Must(x => x >= 0).WithMessage("PreferenceWeight must be a valid non-negative number.");

      RuleFor(x => x.Enabled)
         .NotEmpty().WithMessage("Enabled is required.")
         .NotNull().WithMessage("Enabled must be true or false.");

       
    }
}

public class LearningPathSearchFiltersValidator : AbstractValidator<LearningPathSearchFilters>
{
    public LearningPathSearchFiltersValidator()
    {
                RuleFor(x => x.TenantId)
           .NotEmpty().WithMessage("TenantId is required.")
           .NotEmpty().WithMessage("TenantId must be a valid UUID.")
           .Matches("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$").WithMessage("TenantId must be a valid UUID format.");

        RuleFor(x => x.Name)
           .NotEmpty().WithMessage("Name is required.")
           .Length(0, 64).WithMessage("Name must be between 0 and 64 characters.");

        RuleFor(x => x.Description)
           .NotEmpty().WithMessage("Description is required.")
           .Length(0, 64).WithMessage("Description must be between 0 and 64 characters.");

        RuleFor(x => x.ImageUrl)
           .NotEmpty().WithMessage("ImageUrl is required.")
           .Length(0, 64).WithMessage("ImageUrl must be between 0 and 64 characters.");

        RuleFor(x => x.DurationInDays)
           .NotEmpty().WithMessage("DurationInDays is required.")
           .Must(x => x >= 0).WithMessage("DurationInDays must be a valid non-negative number.");

        RuleFor(x => x.PreferenceWeight)
           .NotEmpty().WithMessage("PreferenceWeight is required.")
           .Must(x => x >= 0).WithMessage("PreferenceWeight must be a valid non-negative number.");

        RuleFor(x => x.Enabled)
           .NotEmpty().WithMessage("Enabled is required.")
           .NotNull().WithMessage("Enabled must be true or false.");


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
