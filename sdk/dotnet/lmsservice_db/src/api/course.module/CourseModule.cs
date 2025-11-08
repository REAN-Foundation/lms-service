
using Newtonsoft.Json;
using Bogus;
using lmsservice_db.src.api.course.module.course.modulevalidation;
using lmsservice_db.src.api.course.module.course.modulemodel;
using FluentValidation;

namespace lmsservice_db.src.api.course.module.course.moduleservice;

public class CourseModule
{
    private readonly APIClient _client;

    public CourseModule(APIClient client)
    {
        _client = client;
    }
    public Task<string> Create(CourseModuleCreateModel courseModule)
    {
        return _client.Request("/course.module", HttpMethod.Post, courseModule);
    }

    public Task<string> GetById(string courseModuleId)
    {
        return _client.Request($"/course.module/{courseModuleId}", HttpMethod.Get);
    }

    public Task<string> Search(CourseModuleSearchFilters searchFilters)
    {
        var queryParams = new List<string>();

        if (!string.IsNullOrEmpty(searchFilters.Name)) queryParams.Add($"Name={searchFilters.Name}");
if (!string.IsNullOrEmpty(searchFilters.Description)) queryParams.Add($"Description={searchFilters.Description}");
if (!string.IsNullOrEmpty(searchFilters.ImageUrl)) queryParams.Add($"ImageUrl={searchFilters.ImageUrl}");
if (searchFilters.DurationInMins != null) queryParams.Add($"DurationInMins={searchFilters.DurationInMins}");
if (searchFilters.Sequence != null) queryParams.Add($"Sequence={searchFilters.Sequence}");


        var queryString = string.Join("&", queryParams);
        return _client.Request($"/course.module/search?{queryString}", HttpMethod.Get);
    }

    public Task<string> Update(string courseModuleId, CourseModuleUpdateModel courseModule)
    {
        return _client.Request($"/course.module/{courseModuleId}", HttpMethod.Put, courseModule);
    }

    public Task<string> Delete(string courseModuleId)
    {
        return _client.Request($"/course.module/{courseModuleId}", HttpMethod.Delete);
    }

    public async Task ExecuteCourseModuleOperations()
    {
        var faker = new Faker("en");

        var createValidator = new CourseModuleCreateModelValidator();
        var createNewCourseModule = new CourseModuleCreateModel
        {
                        Name= faker.Name.FullName(),
            Description= faker.Lorem.Sentence(),
            ImageUrl= faker.Internet.Url(),
            DurationInMins= faker.Random.Int(1, 10000),
            Sequence= faker.Random.Int(1, 10000),

        };

        var createValidationResult = createValidator.Validate(createNewCourseModule);
        if (!createValidationResult.IsValid)
        {
            foreach (var error in createValidationResult.Errors)
            {
                Console.WriteLine("Validation error:" + error.ErrorMessage);
            }
            return;
        }

        if (!ValidationHelper.TryValidateModel(createNewCourseModule, out var validationResults))
        {
            foreach (var validationResult in validationResults)
            {
                Console.WriteLine(validationResult.ErrorMessage);
            }
            return;
        }

        var createResponse = await Create(createNewCourseModule);
        dynamic createdCourseModule = JsonConvert.DeserializeObject(createResponse);
        Console.WriteLine("Create: " + JsonConvert.SerializeObject(createdCourseModule, Formatting.Indented));

        string courseModuleId = createdCourseModule.Data.id.ToString();

        var retrievedResponse = await GetById(courseModuleId);
        dynamic retrieved = JsonConvert.DeserializeObject(retrievedResponse);
        Console.WriteLine("GetById: " + JsonConvert.SerializeObject(retrieved, Formatting.Indented));

        var searchValidator = new CourseModuleSearchFiltersValidator();
        var searchFilters = new CourseModuleSearchFilters
        {
                        Name= createNewCourseModule.Name,
            Description= createNewCourseModule.Description,
            ImageUrl= createNewCourseModule.ImageUrl,
            DurationInMins= createNewCourseModule.DurationInMins,
            Sequence= createNewCourseModule.Sequence,

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

        var updateValidator = new CourseModuleUpdateModelValidator();
        var updatedCourseModule = new CourseModuleUpdateModel
        {
                        Name= faker.Name.FullName(),
            Description= faker.Lorem.Sentence(),
            ImageUrl= faker.Internet.Url(),
            DurationInMins= faker.Random.Int(1, 10000),
            Sequence= faker.Random.Int(1, 10000),

        };

        var updateValidationResult = updateValidator.Validate(updatedCourseModule);
        if (!updateValidationResult.IsValid)
        {
            foreach (var error in updateValidationResult.Errors)
            {
                Console.WriteLine("Validation error:" + error.ErrorMessage);
            }
            return;
        }

        var updateResponse = await Update(courseModuleId, updatedCourseModule);
        dynamic updated = JsonConvert.DeserializeObject(updateResponse);
        Console.WriteLine("Update: " + JsonConvert.SerializeObject(updated, Formatting.Indented));

        var deleteResponse = await Delete(courseModuleId);
        dynamic deleted = JsonConvert.DeserializeObject(deleteResponse);
        Console.WriteLine("Delete: " + JsonConvert.SerializeObject(deleted, Formatting.Indented));
    }
}
