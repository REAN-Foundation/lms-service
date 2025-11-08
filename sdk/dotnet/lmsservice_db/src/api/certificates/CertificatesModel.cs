
using System.ComponentModel.DataAnnotations;

namespace lmsservice_db.src.api.certificates.certificatesmodel;
public class CertificatesCreateModel
{
        [Required]
    [StringLength(64, MinimumLength = 0)]
    public string UserId { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public string CertificateNumber { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public string CertificateName { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public string CertificateType { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public string IssuedDate { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public DateTime ExpiryDate { get; set; } = DateTime.MinValue;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public string CertificateUrl { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public float FinalGrade { get; set; } = 0f;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public int CreditHours { get; set; } = 0;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public string Skills { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public bool IsVerified { get; set; } = false;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public string VerificationUrl { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public string IssuedBy { get; set; } = string.Empty;


}

public class CertificatesUpdateModel
{
        [Required]
    [StringLength(64, MinimumLength = 0)]
    public string UserId { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public string CertificateNumber { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public string CertificateName { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public string CertificateType { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public string IssuedDate { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public DateTime ExpiryDate { get; set; } = DateTime.MinValue;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public string CertificateUrl { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public float FinalGrade { get; set; } = 0f;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public int CreditHours { get; set; } = 0;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public string Skills { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public bool IsVerified { get; set; } = false;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public string VerificationUrl { get; set; } = string.Empty;

    [Required]
    [StringLength(64, MinimumLength = 0)]
    public string IssuedBy { get; set; } = string.Empty;


}

public class CertificatesSearchFilters
{
        [StringLength(64, MinimumLength = 0)]
    public string UserId { get; set; } = string.Empty;

    [StringLength(64, MinimumLength = 0)]
    public string CertificateNumber { get; set; } = string.Empty;

    [StringLength(64, MinimumLength = 0)]
    public string CertificateName { get; set; } = string.Empty;

    [StringLength(64, MinimumLength = 0)]
    public string CertificateType { get; set; } = string.Empty;

    [StringLength(64, MinimumLength = 0)]
    public string IssuedDate { get; set; } = string.Empty;

    [StringLength(64, MinimumLength = 0)]
    public DateTime ExpiryDate { get; set; } = DateTime.MinValue;

    [StringLength(64, MinimumLength = 0)]
    public string CertificateUrl { get; set; } = string.Empty;

    [StringLength(64, MinimumLength = 0)]
    public float FinalGrade { get; set; } = 0f;

    [StringLength(64, MinimumLength = 0)]
    public int CreditHours { get; set; } = 0;

    [StringLength(64, MinimumLength = 0)]
    public string Skills { get; set; } = string.Empty;

    [StringLength(64, MinimumLength = 0)]
    public bool IsVerified { get; set; } = false;

    [StringLength(64, MinimumLength = 0)]
    public string VerificationUrl { get; set; } = string.Empty;

    [StringLength(64, MinimumLength = 0)]
    public string IssuedBy { get; set; } = string.Empty;


}

public class ApiResponse
{
    [Required]
    public Dictionary<string, object>? Data { get; set; }

    [StringLength(500, MinimumLength = 2)]
    public string Message { get; set; } = string.Empty;

    public bool? Success { get; set; }
}

