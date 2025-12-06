
using Newtonsoft.Json;
using Bogus;
using lmsservice_db.src.api.learning.path.learning.pathvalidation;
using lmsservice_db.src.api.learning.path.learning.pathmodel;
using FluentValidation;

namespace lmsservice_db.src.api.learning.path.learning.pathservice;

public class LearningPath
{
    private readonly APIClient _client;

    public LearningPath(APIClient client)
    {
        _client = client;
    }
    public Task<string> Create(LearningPathCreateModel learningPath)
    {
        return _client.Request("/learning.path", HttpMethod.Post, learningPath);
    }

    public Task<string> GetById(string learningPathId)
    {
        return _client.Request($"/learning.path/{learningPathId}", HttpMethod.Get);
    }

    public Task<string> Search(LearningPathSearchFilters searchFilters)
    {
        var queryParams = new List<string>();

        if (!string.IsNullOrEmpty(searchFilters.Name)) queryParams.Add($"Name={searchFilters.Name}");
if (!string.IsNullOrEmpty(searchFilters.Description)) queryParams.Add($"Description={searchFilters.Description}");
if (!string.IsNullOrEmpty(searchFilters.ImageUrl)) queryParams.Add($"ImageUrl={searchFilters.ImageUrl}");
if (searchFilters.DurationInDays != null) queryParams.Add($"DurationInDays={searchFilters.DurationInDays}");
if (searchFilters.PreferenceWeight != null) queryParams.Add($"PreferenceWeight={searchFilters.PreferenceWeight}");
queryParams.Add($"Enabled={searchFilters.Enabled.ToString().ToLower()}");


        var queryString = string.Join("&", queryParams);
        return _client.Request($"/learning.path/search?{queryString}", HttpMethod.Get);
    }

    public Task<string> Update(string learningPathId, LearningPathUpdateModel learningPath)
    {
        return _client.Request($"/learning.path/{learningPathId}", HttpMethod.Put, learningPath);
    }

    public Task<string> Delete(string learningPathId)
    {
        return _client.Request($"/learning.path/{learningPathId}", HttpMethod.Delete);
    }

    public async Task ExecuteLearningPathOperations()
    {
        var faker = new Faker("en");

        var createValidator = new LearningPathCreateModelValidator();
        var createNewLearningPath = new LearningPathCreateModel
        {
                        TenantId= "{{TENANT_ID}}",
            Name= faker.Name.FullName(),
            Description= faker.Lorem.Sentence(),
            ImageUrl= faker.Internet.Url(),
            DurationInDays= faker.Random.Int(1, 10000),
            PreferenceWeight= faker.Random.Int(1, 10000),
            Enabled= faker.Random.Bool(),

        };

        var createValidationResult = createValidator.Validate(createNewLearningPath);
        if (!createValidationResult.IsValid)
        {
            foreach (var error in createValidationResult.Errors)
            {
                Console.WriteLine("Validation error:" + error.ErrorMessage);
            }
            return;
        }

        if (!ValidationHelper.TryValidateModel(createNewLearningPath, out var validationResults))
        {
            foreach (var validationResult in validationResults)
            {
                Console.WriteLine(validationResult.ErrorMessage);
            }
            return;
        }

        var createResponse = await Create(createNewLearningPath);
        dynamic createdLearningPath = JsonConvert.DeserializeObject(createResponse);
        Console.WriteLine("Create: " + JsonConvert.SerializeObject(createdLearningPath, Formatting.Indented));

        string learningPathId = createdLearningPath.Data.id.ToString();

        var retrievedResponse = await GetById(learningPathId);
        dynamic retrieved = JsonConvert.DeserializeObject(retrievedResponse);
        Console.WriteLine("GetById: " + JsonConvert.SerializeObject(retrieved, Formatting.Indented));

        var searchValidator = new LearningPathSearchFiltersValidator();
        var searchFilters = new LearningPathSearchFilters
        {
                        Name= createNewLearningPath.Name,
            Description= createNewLearningPath.Description,
            ImageUrl= createNewLearningPath.ImageUrl,
            DurationInDays= createNewLearningPath.DurationInDays,
            PreferenceWeight= createNewLearningPath.PreferenceWeight,
            Enabled= createNewLearningPath.Enabled,

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

        var updateValidator = new LearningPathUpdateModelValidator();
        var updatedLearningPath = new LearningPathUpdateModel
        {
                        TenantId= "{{TENANT_ID}}",
            Name= faker.Name.FullName(),
            Description= faker.Lorem.Sentence(),
            ImageUrl= faker.Internet.Url(),
            DurationInDays= faker.Random.Int(1, 10000),
            PreferenceWeight= faker.Random.Int(1, 10000),
            Enabled= faker.Random.Bool(),

        };

        var updateValidationResult = updateValidator.Validate(updatedLearningPath);
        if (!updateValidationResult.IsValid)
        {
            foreach (var error in updateValidationResult.Errors)
            {
                Console.WriteLine("Validation error:" + error.ErrorMessage);
            }
            return;
        }

        var updateResponse = await Update(learningPathId, updatedLearningPath);
        dynamic updated = JsonConvert.DeserializeObject(updateResponse);
        Console.WriteLine("Update: " + JsonConvert.SerializeObject(updated, Formatting.Indented));

        var deleteResponse = await Delete(learningPathId);
        dynamic deleted = JsonConvert.DeserializeObject(deleteResponse);
        Console.WriteLine("Delete: " + JsonConvert.SerializeObject(deleted, Formatting.Indented));
    }
}
