
using System.Xml;
using FluentValidation;
using lmsservice_db.src.api.course.coursemodel;

namespace lmsservice_db.src.api.course.coursevalidation;
public class CourseCreateModelValidator : AbstractValidator<CourseCreateModel>
{
    public CourseCreateModelValidator()
    {
              RuleFor(x => x.TenantId)
         .NotEmpty().WithMessage("TenantId is required.")
         .Length(0, 64).WithMessage("TenantId must be between 0 and 64 characters.");

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

       
    }
}

public class CourseUpdateModelValidator : AbstractValidator<CourseUpdateModel>
{
    public CourseUpdateModelValidator()
    {
              RuleFor(x => x.TenantId)
         .NotEmpty().WithMessage("TenantId is required.")
         .Length(0, 64).WithMessage("TenantId must be between 0 and 64 characters.");

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

       
    }
}

public class CourseSearchFiltersValidator : AbstractValidator<CourseSearchFilters>
{
    public CourseSearchFiltersValidator()
    {
                RuleFor(x => x.TenantId)
           .NotEmpty().WithMessage("TenantId is required.")
           .Length(0, 64).WithMessage("TenantId must be between 0 and 64 characters.");

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
