
using System.Xml;
using FluentValidation;
using lmsservice_db.src.api..model;

namespace lmsservice_db.src.api..validation;
public class LearningPathCoursesCreateModelValidator : AbstractValidator<LearningPathCoursesCreateModel>
{
    public LearningPathCoursesCreateModelValidator()
    {
               
    }
}

public class LearningPathCoursesUpdateModelValidator : AbstractValidator<LearningPathCoursesUpdateModel>
{
    public LearningPathCoursesUpdateModelValidator()
    {
               
    }
}

public class LearningPathCoursesSearchFiltersValidator : AbstractValidator<LearningPathCoursesSearchFilters>
{
    public LearningPathCoursesSearchFiltersValidator()
    {
        
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
