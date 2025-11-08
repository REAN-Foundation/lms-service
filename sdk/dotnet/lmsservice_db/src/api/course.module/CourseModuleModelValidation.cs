
using System.Xml;
using FluentValidation;
using lmsservice_db.src.api.course.module.course.modulemodel;

namespace lmsservice_db.src.api.course.module.course.modulevalidation;
public class CourseModuleCreateModelValidator : AbstractValidator<CourseModuleCreateModel>
{
    public CourseModuleCreateModelValidator()
    {
              RuleFor(x => x.Name)
         .NotEmpty().WithMessage("Name is required.")
         .Length(0, 64).WithMessage("Name must be between 0 and 64 characters.");

      RuleFor(x => x.Description)
         .NotEmpty().WithMessage("Description is required.")
         .Length(0, 64).WithMessage("Description must be between 0 and 64 characters.");

      RuleFor(x => x.ImageUrl)
         .NotEmpty().WithMessage("ImageUrl is required.")
         .Length(0, 64).WithMessage("ImageUrl must be between 0 and 64 characters.");

      RuleFor(x => x.DurationInMins)
         .NotEmpty().WithMessage("DurationInMins is required.")
         .Must(x => x >= 0).WithMessage("DurationInMins must be a valid non-negative number.");

      RuleFor(x => x.Sequence)
         .NotEmpty().WithMessage("Sequence is required.")
         .Must(x => x >= 0).WithMessage("Sequence must be a valid non-negative number.");

       
    }
}

public class CourseModuleUpdateModelValidator : AbstractValidator<CourseModuleUpdateModel>
{
    public CourseModuleUpdateModelValidator()
    {
              RuleFor(x => x.Name)
         .NotEmpty().WithMessage("Name is required.")
         .Length(0, 64).WithMessage("Name must be between 0 and 64 characters.");

      RuleFor(x => x.Description)
         .NotEmpty().WithMessage("Description is required.")
         .Length(0, 64).WithMessage("Description must be between 0 and 64 characters.");

      RuleFor(x => x.ImageUrl)
         .NotEmpty().WithMessage("ImageUrl is required.")
         .Length(0, 64).WithMessage("ImageUrl must be between 0 and 64 characters.");

      RuleFor(x => x.DurationInMins)
         .NotEmpty().WithMessage("DurationInMins is required.")
         .Must(x => x >= 0).WithMessage("DurationInMins must be a valid non-negative number.");

      RuleFor(x => x.Sequence)
         .NotEmpty().WithMessage("Sequence is required.")
         .Must(x => x >= 0).WithMessage("Sequence must be a valid non-negative number.");

       
    }
}

public class CourseModuleSearchFiltersValidator : AbstractValidator<CourseModuleSearchFilters>
{
    public CourseModuleSearchFiltersValidator()
    {
                RuleFor(x => x.Name)
           .NotEmpty().WithMessage("Name is required.")
           .Length(0, 64).WithMessage("Name must be between 0 and 64 characters.");

        RuleFor(x => x.Description)
           .NotEmpty().WithMessage("Description is required.")
           .Length(0, 64).WithMessage("Description must be between 0 and 64 characters.");

        RuleFor(x => x.ImageUrl)
           .NotEmpty().WithMessage("ImageUrl is required.")
           .Length(0, 64).WithMessage("ImageUrl must be between 0 and 64 characters.");

        RuleFor(x => x.DurationInMins)
           .NotEmpty().WithMessage("DurationInMins is required.")
           .Must(x => x >= 0).WithMessage("DurationInMins must be a valid non-negative number.");

        RuleFor(x => x.Sequence)
           .NotEmpty().WithMessage("Sequence is required.")
           .Must(x => x >= 0).WithMessage("Sequence must be a valid non-negative number.");


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
