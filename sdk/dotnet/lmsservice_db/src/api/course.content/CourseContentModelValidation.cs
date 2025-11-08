
using System.Xml;
using FluentValidation;
using lmsservice_db.src.api.course.content.course.contentmodel;

namespace lmsservice_db.src.api.course.content.course.contentvalidation;
public class CourseContentCreateModelValidator : AbstractValidator<CourseContentCreateModel>
{
    public CourseContentCreateModelValidator()
    {
              RuleFor(x => x.Title)
         .NotEmpty().WithMessage("Title is required.")
         .Length(0, 64).WithMessage("Title must be between 0 and 64 characters.");

      RuleFor(x => x.Description)
         .NotEmpty().WithMessage("Description is required.")
         .Length(0, 64).WithMessage("Description must be between 0 and 64 characters.");

      RuleFor(x => x.ImageUrl)
         .NotEmpty().WithMessage("ImageUrl is required.")
         .Length(0, 64).WithMessage("ImageUrl must be between 0 and 64 characters.");

      RuleFor(x => x.DurationInMins)
         .NotEmpty().WithMessage("DurationInMins is required.")
         .Must(x => x >= 0).WithMessage("DurationInMins must be a valid non-negative number.");

      RuleFor(x => x.ContentType)
         .NotEmpty().WithMessage("ContentType is required.")
         .Length(0, 64).WithMessage("ContentType must be between 0 and 64 characters.");

      RuleFor(x => x.ResourceLink)
         .NotEmpty().WithMessage("ResourceLink is required.")
         .Length(0, 64).WithMessage("ResourceLink must be between 0 and 64 characters.");

      RuleFor(x => x.ActionTemplateId)
         .NotEmpty().WithMessage("ActionTemplateId is required.")
         .NotEmpty().WithMessage("ActionTemplateId must be a valid UUID.")
         .Matches("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$").WithMessage("ActionTemplateId must be a valid UUID format.");

      RuleFor(x => x.Sequence)
         .NotEmpty().WithMessage("Sequence is required.")
         .Must(x => x >= 0).WithMessage("Sequence must be a valid non-negative number.");

       
    }
}

public class CourseContentUpdateModelValidator : AbstractValidator<CourseContentUpdateModel>
{
    public CourseContentUpdateModelValidator()
    {
              RuleFor(x => x.Title)
         .NotEmpty().WithMessage("Title is required.")
         .Length(0, 64).WithMessage("Title must be between 0 and 64 characters.");

      RuleFor(x => x.Description)
         .NotEmpty().WithMessage("Description is required.")
         .Length(0, 64).WithMessage("Description must be between 0 and 64 characters.");

      RuleFor(x => x.ImageUrl)
         .NotEmpty().WithMessage("ImageUrl is required.")
         .Length(0, 64).WithMessage("ImageUrl must be between 0 and 64 characters.");

      RuleFor(x => x.DurationInMins)
         .NotEmpty().WithMessage("DurationInMins is required.")
         .Must(x => x >= 0).WithMessage("DurationInMins must be a valid non-negative number.");

      RuleFor(x => x.ContentType)
         .NotEmpty().WithMessage("ContentType is required.")
         .Length(0, 64).WithMessage("ContentType must be between 0 and 64 characters.");

      RuleFor(x => x.ResourceLink)
         .NotEmpty().WithMessage("ResourceLink is required.")
         .Length(0, 64).WithMessage("ResourceLink must be between 0 and 64 characters.");

      RuleFor(x => x.ActionTemplateId)
         .NotEmpty().WithMessage("ActionTemplateId is required.")
         .NotEmpty().WithMessage("ActionTemplateId must be a valid UUID.")
         .Matches("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$").WithMessage("ActionTemplateId must be a valid UUID format.");

      RuleFor(x => x.Sequence)
         .NotEmpty().WithMessage("Sequence is required.")
         .Must(x => x >= 0).WithMessage("Sequence must be a valid non-negative number.");

       
    }
}

public class CourseContentSearchFiltersValidator : AbstractValidator<CourseContentSearchFilters>
{
    public CourseContentSearchFiltersValidator()
    {
                RuleFor(x => x.Title)
           .NotEmpty().WithMessage("Title is required.")
           .Length(0, 64).WithMessage("Title must be between 0 and 64 characters.");

        RuleFor(x => x.Description)
           .NotEmpty().WithMessage("Description is required.")
           .Length(0, 64).WithMessage("Description must be between 0 and 64 characters.");

        RuleFor(x => x.ImageUrl)
           .NotEmpty().WithMessage("ImageUrl is required.")
           .Length(0, 64).WithMessage("ImageUrl must be between 0 and 64 characters.");

        RuleFor(x => x.DurationInMins)
           .NotEmpty().WithMessage("DurationInMins is required.")
           .Must(x => x >= 0).WithMessage("DurationInMins must be a valid non-negative number.");

        RuleFor(x => x.ContentType)
           .NotEmpty().WithMessage("ContentType is required.")
           .Length(0, 64).WithMessage("ContentType must be between 0 and 64 characters.");

        RuleFor(x => x.ResourceLink)
           .NotEmpty().WithMessage("ResourceLink is required.")
           .Length(0, 64).WithMessage("ResourceLink must be between 0 and 64 characters.");

        RuleFor(x => x.ActionTemplateId)
           .NotEmpty().WithMessage("ActionTemplateId is required.")
           .NotEmpty().WithMessage("ActionTemplateId must be a valid UUID.")
           .Matches("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$").WithMessage("ActionTemplateId must be a valid UUID format.");

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
