
using System.ComponentModel.DataAnnotations;

namespace lmsservice_db.src.api.course.module.course.modulemodel;
public class CourseModuleCreateModel
{
        [Required]
    [StringLength(64, MinimumLength = 0)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public string Description { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public string ImageUrl { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public int DurationInMins { get; set; } = 0;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public int Sequence { get; set; } = 0;


}

public class CourseModuleUpdateModel
{
        [Required]
    [StringLength(64, MinimumLength = 0)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public string Description { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public string ImageUrl { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public int DurationInMins { get; set; } = 0;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public int Sequence { get; set; } = 0;


}

public class CourseModuleSearchFilters
{
        [StringLength(64, MinimumLength = 0)]
    public string Name { get; set; } = string.Empty;

    [StringLength(64, MinimumLength = 0)]
    public string Description { get; set; } = string.Empty;

    [StringLength(64, MinimumLength = 0)]
    public string ImageUrl { get; set; } = string.Empty;

    [StringLength(64, MinimumLength = 0)]
    public int DurationInMins { get; set; } = 0;

    [StringLength(64, MinimumLength = 0)]
    public int Sequence { get; set; } = 0;


}

public class ApiResponse
{
    [Required]
    public Dictionary<string, object>? Data { get; set; }

    [StringLength(500, MinimumLength = 2)]
    public string Message { get; set; } = string.Empty;

    public bool? Success { get; set; }
}

