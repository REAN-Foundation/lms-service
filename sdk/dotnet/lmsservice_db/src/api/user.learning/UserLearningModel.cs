
using System.ComponentModel.DataAnnotations;

namespace lmsservice_db.src.api.user.learning.user.learningmodel;
public class UserLearningCreateModel
{
        [Required]
    [StringLength(64, MinimumLength = 0)]
    public string UserId { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public string ActionId { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public string ProgressStatus { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public int PercentageCompletion { get; set; } = 0;


}

public class UserLearningUpdateModel
{
        [Required]
    [StringLength(64, MinimumLength = 0)]
    public string UserId { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public string ActionId { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public string ProgressStatus { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public int PercentageCompletion { get; set; } = 0;


}

public class UserLearningSearchFilters
{
        [StringLength(64, MinimumLength = 0)]
    public string UserId { get; set; } = string.Empty;

    [StringLength(64, MinimumLength = 0)]
    public string ActionId { get; set; } = string.Empty;

    [StringLength(64, MinimumLength = 0)]
    public string ProgressStatus { get; set; } = string.Empty;

    [StringLength(64, MinimumLength = 0)]
    public int PercentageCompletion { get; set; } = 0;


}

public class ApiResponse
{
    [Required]
    public Dictionary<string, object>? Data { get; set; }

    [StringLength(500, MinimumLength = 2)]
    public string Message { get; set; } = string.Empty;

    public bool? Success { get; set; }
}

