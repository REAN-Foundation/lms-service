
using System.ComponentModel.DataAnnotations;

namespace lmsservice_db.src.api..model;
public class LearningPathCoursesCreateModel
{
    
}

public class LearningPathCoursesUpdateModel
{
    
}

public class LearningPathCoursesSearchFilters
{
    
}

public class ApiResponse
{
    [Required]
    public Dictionary<string, object>? Data { get; set; }

    [StringLength(500, MinimumLength = 2)]
    public string Message { get; set; } = string.Empty;

    public bool? Success { get; set; }
}

