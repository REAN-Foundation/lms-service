
using System.ComponentModel.DataAnnotations;

namespace lmsservice_db.src.api.course.content.course.contentmodel;
public class CourseContentCreateModel
{
        [Required]
    [StringLength(64, MinimumLength = 0)]
    public string Title { get; set; } = string.Empty;

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
    public string ContentType { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public string ResourceLink { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public string ActionTemplateId { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public int Sequence { get; set; } = 0;


}

public class CourseContentUpdateModel
{
        [Required]
    [StringLength(64, MinimumLength = 0)]
    public string Title { get; set; } = string.Empty;

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
    public string ContentType { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public string ResourceLink { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public string ActionTemplateId { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public int Sequence { get; set; } = 0;


}

public class CourseContentSearchFilters
{
        [StringLength(64, MinimumLength = 0)]
    public string Title { get; set; } = string.Empty;

    [StringLength(64, MinimumLength = 0)]
    public string Description { get; set; } = string.Empty;

    [StringLength(64, MinimumLength = 0)]
    public string ImageUrl { get; set; } = string.Empty;

    [StringLength(64, MinimumLength = 0)]
    public int DurationInMins { get; set; } = 0;

    [StringLength(64, MinimumLength = 0)]
    public string ContentType { get; set; } = string.Empty;

    [StringLength(64, MinimumLength = 0)]
    public string ResourceLink { get; set; } = string.Empty;

    [StringLength(64, MinimumLength = 0)]
    public string ActionTemplateId { get; set; } = string.Empty;

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

