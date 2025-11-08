
using Newtonsoft.Json;
using Bogus;
using lmsservice_db.src.api.course.coursevalidation;
using lmsservice_db.src.api.course.coursemodel;
using FluentValidation;

namespace lmsservice_db.src.api.course.courseservice;

public class Course
{
    private readonly APIClient _client;

    public Course(APIClient client)
    {
        _client = client;
    }
    public Task<string> Create(CourseCreateModel course)
    {
        return _client.Request("/course", HttpMethod.Post, course);
    }

    public Task<string> GetById(string courseId)
    {
        return _client.Request($"/course/{courseId}", HttpMethod.Get);
    }

    public Task<string> Search(CourseSearchFilters searchFilters)
    {
        var queryParams = new List<string>();

        if (!string.IsNullOrEmpty(searchFilters.TenantId)) queryParams.Add($"TenantId={searchFilters.TenantId}");
if (!string.IsNullOrEmpty(searchFilters.Name)) queryParams.Add($"Name={searchFilters.Name}");
if (!string.IsNullOrEmpty(searchFilters.Description)) queryParams.Add($"Description={searchFilters.Description}");
if (!string.IsNullOrEmpty(searchFilters.ImageUrl)) queryParams.Add($"ImageUrl={searchFilters.ImageUrl}");
if (searchFilters.DurationInDays != null) queryParams.Add($"DurationInDays={searchFilters.DurationInDays}");


        var queryString = string.Join("&", queryParams);
        return _client.Request($"/course/search?{queryString}", HttpMethod.Get);
    }

    public Task<string> Update(string courseId, CourseUpdateModel course)
    {
        return _client.Request($"/course/{courseId}", HttpMethod.Put, course);
    }

    public Task<string> Delete(string courseId)
    {
        return _client.Request($"/course/{courseId}", HttpMethod.Delete);
    }

    public async Task ExecuteCourseOperations()
    {
        var faker = new Faker("en");

        var createValidator = new CourseCreateModelValidator();
        var createNewCourse = new CourseCreateModel
        {
                        TenantId= "{{TENANT_ID}}",
            Name= faker.Name.FullName(),
            Description= faker.Lorem.Sentence(),
            ImageUrl= faker.Internet.Url(),
            DurationInDays= faker.Random.Int(1, 10000),

        };

        var createValidationResult = createValidator.Validate(createNewCourse);
        if (!createValidationResult.IsValid)
        {
            foreach (var error in createValidationResult.Errors)
            {
                Console.WriteLine("Validation error:" + error.ErrorMessage);
            }
            return;
        }

        if (!ValidationHelper.TryValidateModel(createNewCourse, out var validationResults))
        {
            foreach (var validationResult in validationResults)
            {
                Console.WriteLine(validationResult.ErrorMessage);
            }
            return;
        }

        var createResponse = await Create(createNewCourse);
        dynamic createdCourse = JsonConvert.DeserializeObject(createResponse);
        Console.WriteLine("Create: " + JsonConvert.SerializeObject(createdCourse, Formatting.Indented));

        string courseId = createdCourse.Data.id.ToString();

        var retrievedResponse = await GetById(courseId);
        dynamic retrieved = JsonConvert.DeserializeObject(retrievedResponse);
        Console.WriteLine("GetById: " + JsonConvert.SerializeObject(retrieved, Formatting.Indented));

        var searchValidator = new CourseSearchFiltersValidator();
        var searchFilters = new CourseSearchFilters
        {
                        TenantId= createNewCourse.TenantId,
            Name= createNewCourse.Name,
            Description= createNewCourse.Description,
            ImageUrl= createNewCourse.ImageUrl,
            DurationInDays= createNewCourse.DurationInDays,

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

        var updateValidator = new CourseUpdateModelValidator();
        var updatedCourse = new CourseUpdateModel
        {
                        TenantId= "{{TENANT_ID}}",
            Name= faker.Name.FullName(),
            Description= faker.Lorem.Sentence(),
            ImageUrl= faker.Internet.Url(),
            DurationInDays= faker.Random.Int(1, 10000),

        };

        var updateValidationResult = updateValidator.Validate(updatedCourse);
        if (!updateValidationResult.IsValid)
        {
            foreach (var error in updateValidationResult.Errors)
            {
                Console.WriteLine("Validation error:" + error.ErrorMessage);
            }
            return;
        }

        var updateResponse = await Update(courseId, updatedCourse);
        dynamic updated = JsonConvert.DeserializeObject(updateResponse);
        Console.WriteLine("Update: " + JsonConvert.SerializeObject(updated, Formatting.Indented));

        var deleteResponse = await Delete(courseId);
        dynamic deleted = JsonConvert.DeserializeObject(deleteResponse);
        Console.WriteLine("Delete: " + JsonConvert.SerializeObject(deleted, Formatting.Indented));
    }
}
