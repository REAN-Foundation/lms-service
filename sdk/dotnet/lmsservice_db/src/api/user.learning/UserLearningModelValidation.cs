
using System.Xml;
using FluentValidation;
using lmsservice_db.src.api.user.learning.user.learningmodel;

namespace lmsservice_db.src.api.user.learning.user.learningvalidation;
public class UserLearningCreateModelValidator : AbstractValidator<UserLearningCreateModel>
{
    public UserLearningCreateModelValidator()
    {
              RuleFor(x => x.UserId)
         .NotEmpty().WithMessage("UserId is required.")
         .NotEmpty().WithMessage("UserId must be a valid UUID.")
         .Matches("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$").WithMessage("UserId must be a valid UUID format.");

      RuleFor(x => x.ActionId)
         .NotEmpty().WithMessage("ActionId is required.")
         .NotEmpty().WithMessage("ActionId must be a valid UUID.")
         .Matches("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$").WithMessage("ActionId must be a valid UUID format.");

      RuleFor(x => x.ProgressStatus)
         .NotEmpty().WithMessage("ProgressStatus is required.")
         .Length(0, 64).WithMessage("ProgressStatus must be between 0 and 64 characters.");

      RuleFor(x => x.PercentageCompletion)
         .NotEmpty().WithMessage("PercentageCompletion is required.")
         .Must(x => x >= 0).WithMessage("PercentageCompletion must be a valid non-negative number.");

       
    }
}

public class UserLearningUpdateModelValidator : AbstractValidator<UserLearningUpdateModel>
{
    public UserLearningUpdateModelValidator()
    {
              RuleFor(x => x.UserId)
         .NotEmpty().WithMessage("UserId is required.")
         .NotEmpty().WithMessage("UserId must be a valid UUID.")
         .Matches("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$").WithMessage("UserId must be a valid UUID format.");

      RuleFor(x => x.ActionId)
         .NotEmpty().WithMessage("ActionId is required.")
         .NotEmpty().WithMessage("ActionId must be a valid UUID.")
         .Matches("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$").WithMessage("ActionId must be a valid UUID format.");

      RuleFor(x => x.ProgressStatus)
         .NotEmpty().WithMessage("ProgressStatus is required.")
         .Length(0, 64).WithMessage("ProgressStatus must be between 0 and 64 characters.");

      RuleFor(x => x.PercentageCompletion)
         .NotEmpty().WithMessage("PercentageCompletion is required.")
         .Must(x => x >= 0).WithMessage("PercentageCompletion must be a valid non-negative number.");

       
    }
}

public class UserLearningSearchFiltersValidator : AbstractValidator<UserLearningSearchFilters>
{
    public UserLearningSearchFiltersValidator()
    {
                RuleFor(x => x.UserId)
           .NotEmpty().WithMessage("UserId is required.")
           .NotEmpty().WithMessage("UserId must be a valid UUID.")
           .Matches("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$").WithMessage("UserId must be a valid UUID format.");

        RuleFor(x => x.ActionId)
           .NotEmpty().WithMessage("ActionId is required.")
           .NotEmpty().WithMessage("ActionId must be a valid UUID.")
           .Matches("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$").WithMessage("ActionId must be a valid UUID format.");

        RuleFor(x => x.ProgressStatus)
           .NotEmpty().WithMessage("ProgressStatus is required.")
           .Length(0, 64).WithMessage("ProgressStatus must be between 0 and 64 characters.");

        RuleFor(x => x.PercentageCompletion)
           .NotEmpty().WithMessage("PercentageCompletion is required.")
           .Must(x => x >= 0).WithMessage("PercentageCompletion must be a valid non-negative number.");


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
