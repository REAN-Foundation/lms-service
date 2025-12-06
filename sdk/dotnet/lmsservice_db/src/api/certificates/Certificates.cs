
using Newtonsoft.Json;
using Bogus;
using lmsservice_db.src.api.certificates.certificatesvalidation;
using lmsservice_db.src.api.certificates.certificatesmodel;
using FluentValidation;

namespace lmsservice_db.src.api.certificates.certificatesservice;

public class Certificates
{
    private readonly APIClient _client;

    public Certificates(APIClient client)
    {
        _client = client;
    }
    public Task<string> Create(CertificatesCreateModel certificates)
    {
        return _client.Request("/certificates", HttpMethod.Post, certificates);
    }

    public Task<string> GetById(string certificatesId)
    {
        return _client.Request($"/certificates/{certificatesId}", HttpMethod.Get);
    }

    public Task<string> Search(CertificatesSearchFilters searchFilters)
    {
        var queryParams = new List<string>();

        if (!string.IsNullOrEmpty(searchFilters.CertificateNumber)) queryParams.Add($"CertificateNumber={searchFilters.CertificateNumber}");
if (!string.IsNullOrEmpty(searchFilters.CertificateName)) queryParams.Add($"CertificateName={searchFilters.CertificateName}");
if (!string.IsNullOrEmpty(searchFilters.CertificateType)) queryParams.Add($"CertificateType={searchFilters.CertificateType}");
if (!string.IsNullOrEmpty(searchFilters.IssuedDate)) queryParams.Add($"IssuedDate={searchFilters.IssuedDate}");
if (searchFilters.ExpiryDate != null) queryParams.Add($"ExpiryDate={searchFilters.ExpiryDate.ToString("o")}");
if (!string.IsNullOrEmpty(searchFilters.CertificateUrl)) queryParams.Add($"CertificateUrl={searchFilters.CertificateUrl}");
if (searchFilters.FinalGrade != null) queryParams.Add($"FinalGrade={searchFilters.FinalGrade}");
if (searchFilters.CreditHours != null) queryParams.Add($"CreditHours={searchFilters.CreditHours}");
if (!string.IsNullOrEmpty(searchFilters.Skills)) queryParams.Add($"Skills={searchFilters.Skills}");
queryParams.Add($"IsVerified={searchFilters.IsVerified.ToString().ToLower()}");
if (!string.IsNullOrEmpty(searchFilters.VerificationUrl)) queryParams.Add($"VerificationUrl={searchFilters.VerificationUrl}");


        var queryString = string.Join("&", queryParams);
        return _client.Request($"/certificates/search?{queryString}", HttpMethod.Get);
    }

    public Task<string> Update(string certificatesId, CertificatesUpdateModel certificates)
    {
        return _client.Request($"/certificates/{certificatesId}", HttpMethod.Put, certificates);
    }

    public Task<string> Delete(string certificatesId)
    {
        return _client.Request($"/certificates/{certificatesId}", HttpMethod.Delete);
    }

    public async Task ExecuteCertificatesOperations()
    {
        var faker = new Faker("en");

        var createValidator = new CertificatesCreateModelValidator();
        var createNewCertificates = new CertificatesCreateModel
        {
                        UserId= "{{USER_ID}}",
            CertificateNumber= faker.Lorem.Sentence(3),
            CertificateName= faker.Name.FullName(),
            CertificateType= faker.Lorem.Sentence(3),
            IssuedDate= faker.Lorem.Sentence(3),
            ExpiryDate= faker.Date.Past(),
            CertificateUrl= faker.Internet.Url(),
            FinalGrade= faker.Random.Float(1, 100),
            CreditHours= faker.Random.Int(1, 10000),
            Skills= faker.Lorem.Sentence(3),
            IsVerified= faker.Random.Bool(),
            VerificationUrl= faker.Internet.Url(),
            IssuedBy= faker.Random.Guid().ToString(),

        };

        var createValidationResult = createValidator.Validate(createNewCertificates);
        if (!createValidationResult.IsValid)
        {
            foreach (var error in createValidationResult.Errors)
            {
                Console.WriteLine("Validation error:" + error.ErrorMessage);
            }
            return;
        }

        if (!ValidationHelper.TryValidateModel(createNewCertificates, out var validationResults))
        {
            foreach (var validationResult in validationResults)
            {
                Console.WriteLine(validationResult.ErrorMessage);
            }
            return;
        }

        var createResponse = await Create(createNewCertificates);
        dynamic createdCertificates = JsonConvert.DeserializeObject(createResponse);
        Console.WriteLine("Create: " + JsonConvert.SerializeObject(createdCertificates, Formatting.Indented));

        string certificatesId = createdCertificates.Data.id.ToString();

        var retrievedResponse = await GetById(certificatesId);
        dynamic retrieved = JsonConvert.DeserializeObject(retrievedResponse);
        Console.WriteLine("GetById: " + JsonConvert.SerializeObject(retrieved, Formatting.Indented));

        var searchValidator = new CertificatesSearchFiltersValidator();
        var searchFilters = new CertificatesSearchFilters
        {
                        CertificateNumber= createNewCertificates.CertificateNumber,
            CertificateName= createNewCertificates.CertificateName,
            CertificateType= createNewCertificates.CertificateType,
            IssuedDate= createNewCertificates.IssuedDate,
            ExpiryDate= createNewCertificates.ExpiryDate,
            CertificateUrl= createNewCertificates.CertificateUrl,
            FinalGrade= createNewCertificates.FinalGrade,
            CreditHours= createNewCertificates.CreditHours,
            Skills= createNewCertificates.Skills,
            IsVerified= createNewCertificates.IsVerified,
            VerificationUrl= createNewCertificates.VerificationUrl,

        };

        var searchValidationResult = searchValidator.Validate(searchFilters);
        if (!searchValidationResult.IsValid)
        {
            foreach (var error in searchValidationResult.Errors)
            {
                Console.WriteLine("Validation error:" + error.ErrorMessage);
            }
            return;
        }

        var searchResultsResponse = await Search(searchFilters);
        dynamic searchResults = JsonConvert.DeserializeObject(searchResultsResponse);
        Console.WriteLine("Search: " + JsonConvert.SerializeObject(searchResults, Formatting.Indented));

        var updateValidator = new CertificatesUpdateModelValidator();
        var updatedCertificates = new CertificatesUpdateModel
        {
                        UserId= "{{USER_ID}}",
            CertificateNumber= faker.Lorem.Sentence(3),
            CertificateName= faker.Name.FullName(),
            CertificateType= faker.Lorem.Sentence(3),
            IssuedDate= faker.Lorem.Sentence(3),
            ExpiryDate= faker.Date.Past(),
            CertificateUrl= faker.Internet.Url(),
            FinalGrade= faker.Random.Float(1, 100),
            CreditHours= faker.Random.Int(1, 10000),
            Skills= faker.Lorem.Sentence(3),
            IsVerified= faker.Random.Bool(),
            VerificationUrl= faker.Internet.Url(),
            IssuedBy= faker.Random.Guid().ToString(),

        };

        var updateValidationResult = updateValidator.Validate(updatedCertificates);
        if (!updateValidationResult.IsValid)
        {
            foreach (var error in updateValidationResult.Errors)
            {
                Console.WriteLine("Validation error:" + error.ErrorMessage);
            }
            return;
        }

        var updateResponse = await Update(certificatesId, updatedCertificates);
        dynamic updated = JsonConvert.DeserializeObject(updateResponse);
        Console.WriteLine("Update: " + JsonConvert.SerializeObject(updated, Formatting.Indented));

        var deleteResponse = await Delete(certificatesId);
        dynamic deleted = JsonConvert.DeserializeObject(deleteResponse);
        Console.WriteLine("Delete: " + JsonConvert.SerializeObject(deleted, Formatting.Indented));
    }
}
