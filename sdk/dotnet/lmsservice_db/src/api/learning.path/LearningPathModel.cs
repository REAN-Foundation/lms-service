
using System.ComponentModel.DataAnnotations;

namespace lmsservice_db.src.api.learning.path.learning.pathmodel;
public class LearningPathCreateModel
{
        [Required]
    [StringLength(64, MinimumLength = 0)]
    public string TenantId { get; set; } = string.Empty;

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
    public int DurationInDays { get; set; } = 0;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public int PreferenceWeight { get; set; } = 0;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public bool Enabled { get; set; } = false;


}

public class LearningPathUpdateModel
{
        [Required]
    [StringLength(64, MinimumLength = 0)]
    public string TenantId { get; set; } = string.Empty;

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
    public int DurationInDays { get; set; } = 0;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public int PreferenceWeight { get; set; } = 0;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public bool Enabled { get; set; } = false;


}

public class LearningPathSearchFilters
{
        [StringLength(64, MinimumLength = 0)]
    public string TenantId { get; set; } = string.Empty;

    [StringLength(64, MinimumLength = 0)]
    public string Name { get; set; } = string.Empty;

    [StringLength(64, MinimumLength = 0)]
    public string Description { get; set; } = string.Empty;

    [StringLength(64, MinimumLength = 0)]
    public string ImageUrl { get; set; } = string.Empty;

    [StringLength(64, MinimumLength = 0)]
    public int DurationInDays { get; set; } = 0;

    [StringLength(64, MinimumLength = 0)]
    public int PreferenceWeight { get; set; } = 0;

    [StringLength(64, MinimumLength = 0)]
    public bool Enabled { get; set; } = false;


}

public class ApiResponse
{
    [Required]
    public Dictionary<string, object>? Data { get; set; }

    [StringLength(500, MinimumLength = 2)]
    public string Message { get; set; } = string.Empty;

    public bool? Success { get; set; }
}

