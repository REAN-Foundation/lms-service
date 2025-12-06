
using Newtonsoft.Json;
using Bogus;
using lmsservice_db.src.api.learning.path.courses.learning.path.coursesvalidation;
using lmsservice_db.src.api.learning.path.courses.learning.path.coursesmodel;
using FluentValidation;

namespace lmsservice_db.src.api.learning.path.courses.learning.path.coursesservice;

public class LearningPathCourses
{
    private readonly APIClient _client;

    public LearningPathCourses(APIClient client)
    {
        _client = client;
    }
    public Task<string> Create(LearningPathCoursesCreateModel learningPathCourses)
    {
        return _client.Request("/learning.path.courses", HttpMethod.Post, learningPathCourses);
    }

    public Task<string> GetById(string learningPathCoursesId)
    {
        return _client.Request($"/learning.path.courses/{learningPathCoursesId}", HttpMethod.Get);
    }

    public Task<string> Search(LearningPathCoursesSearchFilters searchFilters)
    {
        var queryParams = new List<string>();

        

        var queryString = string.Join("&", queryParams);
        return _client.Request($"/learning.path.courses/search?{queryString}", HttpMethod.Get);
    }

    public Task<string> Update(string learningPathCoursesId, LearningPathCoursesUpdateModel learningPathCourses)
    {
        return _client.Request($"/learning.path.courses/{learningPathCoursesId}", HttpMethod.Put, learningPathCourses);
    }

    public Task<string> Delete(string learningPathCoursesId)
    {
        return _client.Request($"/learning.path.courses/{learningPathCoursesId}", HttpMethod.Delete);
    }

    public async Task ExecuteLearningPathCoursesOperations()
    {
        var faker = new Faker("en");

        var createValidator = new LearningPathCoursesCreateModelValidator();
        var createNewLearningPathCourses = new LearningPathCoursesCreateModel
        {
            
        };

        var createValidationResult = createValidator.Validate(createNewLearningPathCourses);
        if (!createValidationResult.IsValid)
        {
            foreach (var error in createValidationResult.Errors)
            {
                Console.WriteLine("Validation error:" + error.ErrorMessage);
            }
            return;
        }

        if (!ValidationHelper.TryValidateModel(createNewLearningPathCourses, out var validationResults))
        {
            foreach (var validationResult in validationResults)
            {
                Console.WriteLine(validationResult.ErrorMessage);
            }
            return;
        }

        var createResponse = await Create(createNewLearningPathCourses);
        dynamic createdLearningPathCourses = JsonConvert.DeserializeObject(createResponse);
        Console.WriteLine("Create: " + JsonConvert.SerializeObject(createdLearningPathCourses, Formatting.Indented));

        string learningPathCoursesId = createdLearningPathCourses.Data.id.ToString();

        var retrievedResponse = await GetById(learningPathCoursesId);
        dynamic retrieved = JsonConvert.DeserializeObject(retrievedResponse);
        Console.WriteLine("GetById: " + JsonConvert.SerializeObject(retrieved, Formatting.Indented));

        var searchValidator = new LearningPathCoursesSearchFiltersValidator();
        var searchFilters = new LearningPathCoursesSearchFilters
        {
            
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

        var updateValidator = new LearningPathCoursesUpdateModelValidator();
        var updatedLearningPathCourses = new LearningPathCoursesUpdateModel
        {
            
        };

        var updateValidationResult = updateValidator.Validate(updatedLearningPathCourses);
        if (!updateValidationResult.IsValid)
        {
            foreach (var error in updateValidationResult.Errors)
            {
                Console.WriteLine("Validation error:" + error.ErrorMessage);
            }
            return;
        }

        var updateResponse = await Update(learningPathCoursesId, updatedLearningPathCourses);
        dynamic updated = JsonConvert.DeserializeObject(updateResponse);
        Console.WriteLine("Update: " + JsonConvert.SerializeObject(updated, Formatting.Indented));

        var deleteResponse = await Delete(learningPathCoursesId);
        dynamic deleted = JsonConvert.DeserializeObject(deleteResponse);
        Console.WriteLine("Delete: " + JsonConvert.SerializeObject(deleted, Formatting.Indented));
    }
}
