
using Newtonsoft.Json;
using Bogus;
using lmsservice_db.src.api.user.learning.user.learningvalidation;
using lmsservice_db.src.api.user.learning.user.learningmodel;
using FluentValidation;

namespace lmsservice_db.src.api.user.learning.user.learningservice;

public class UserLearning
{
    private readonly APIClient _client;

    public UserLearning(APIClient client)
    {
        _client = client;
    }
    public Task<string> Create(UserLearningCreateModel userLearning)
    {
        return _client.Request("/user.learning", HttpMethod.Post, userLearning);
    }

    public Task<string> GetById(string userLearningId)
    {
        return _client.Request($"/user.learning/{userLearningId}", HttpMethod.Get);
    }

    public Task<string> Search(UserLearningSearchFilters searchFilters)
    {
        var queryParams = new List<string>();

        if (searchFilters.PercentageCompletion != null) queryParams.Add($"PercentageCompletion={searchFilters.PercentageCompletion}");


        var queryString = string.Join("&", queryParams);
        return _client.Request($"/user.learning/search?{queryString}", HttpMethod.Get);
    }

    public Task<string> Update(string userLearningId, UserLearningUpdateModel userLearning)
    {
        return _client.Request($"/user.learning/{userLearningId}", HttpMethod.Put, userLearning);
    }

    public Task<string> Delete(string userLearningId)
    {
        return _client.Request($"/user.learning/{userLearningId}", HttpMethod.Delete);
    }

    public async Task ExecuteUserLearningOperations()
    {
        var faker = new Faker("en");

        var createValidator = new UserLearningCreateModelValidator();
        var createNewUserLearning = new UserLearningCreateModel
        {
                        UserId= "{{USER_ID}}",
            ActionId= "{{ACTION_ID}}",
            ProgressStatus= "Pending",
            PercentageCompletion= faker.Random.Int(1, 10000),

        };

        var createValidationResult = createValidator.Validate(createNewUserLearning);
        if (!createValidationResult.IsValid)
        {
            foreach (var error in createValidationResult.Errors)
            {
                Console.WriteLine("Validation error:" + error.ErrorMessage);
            }
            return;
        }

        if (!ValidationHelper.TryValidateModel(createNewUserLearning, out var validationResults))
        {
            foreach (var validationResult in validationResults)
            {
                Console.WriteLine(validationResult.ErrorMessage);
            }
            return;
        }

        var createResponse = await Create(createNewUserLearning);
        dynamic createdUserLearning = JsonConvert.DeserializeObject(createResponse);
        Console.WriteLine("Create: " + JsonConvert.SerializeObject(createdUserLearning, Formatting.Indented));

        string userLearningId = createdUserLearning.Data.id.ToString();

        var retrievedResponse = await GetById(userLearningId);
        dynamic retrieved = JsonConvert.DeserializeObject(retrievedResponse);
        Console.WriteLine("GetById: " + JsonConvert.SerializeObject(retrieved, Formatting.Indented));

        var searchValidator = new UserLearningSearchFiltersValidator();
        var searchFilters = new UserLearningSearchFilters
        {
                        PercentageCompletion= createNewUserLearning.PercentageCompletion,

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

        var updateValidator = new UserLearningUpdateModelValidator();
        var updatedUserLearning = new UserLearningUpdateModel
        {
                        UserId= "{{USER_ID}}",
            ActionId= "{{ACTION_ID}}",
            ProgressStatus= "Pending",
            PercentageCompletion= faker.Random.Int(1, 10000),

        };

        var updateValidationResult = updateValidator.Validate(updatedUserLearning);
        if (!updateValidationResult.IsValid)
        {
            foreach (var error in updateValidationResult.Errors)
            {
                Console.WriteLine("Validation error:" + error.ErrorMessage);
            }
            return;
        }

        var updateResponse = await Update(userLearningId, updatedUserLearning);
        dynamic updated = JsonConvert.DeserializeObject(updateResponse);
        Console.WriteLine("Update: " + JsonConvert.SerializeObject(updated, Formatting.Indented));

        var deleteResponse = await Delete(userLearningId);
        dynamic deleted = JsonConvert.DeserializeObject(deleteResponse);
        Console.WriteLine("Delete: " + JsonConvert.SerializeObject(deleted, Formatting.Indented));
    }
}
