
using Newtonsoft.Json;
using Bogus;
using lmsservice_db.src.api.course.content.course.contentvalidation;
using lmsservice_db.src.api.course.content.course.contentmodel;
using FluentValidation;

namespace lmsservice_db.src.api.course.content.course.contentservice;

public class CourseContent
{
    private readonly APIClient _client;

    public CourseContent(APIClient client)
    {
        _client = client;
    }
    public Task<string> Create(CourseContentCreateModel courseContent)
    {
        return _client.Request("/course.content", HttpMethod.Post, courseContent);
    }

    public Task<string> GetById(string courseContentId)
    {
        return _client.Request($"/course.content/{courseContentId}", HttpMethod.Get);
    }

    public Task<string> Search(CourseContentSearchFilters searchFilters)
    {
        var queryParams = new List<string>();

        if (!string.IsNullOrEmpty(searchFilters.Title)) queryParams.Add($"Title={searchFilters.Title}");
if (!string.IsNullOrEmpty(searchFilters.Description)) queryParams.Add($"Description={searchFilters.Description}");
if (!string.IsNullOrEmpty(searchFilters.ImageUrl)) queryParams.Add($"ImageUrl={searchFilters.ImageUrl}");
if (searchFilters.DurationInMins != null) queryParams.Add($"DurationInMins={searchFilters.DurationInMins}");
if (!string.IsNullOrEmpty(searchFilters.ResourceLink)) queryParams.Add($"ResourceLink={searchFilters.ResourceLink}");
if (searchFilters.Sequence != null) queryParams.Add($"Sequence={searchFilters.Sequence}");


        var queryString = string.Join("&", queryParams);
        return _client.Request($"/course.content/search?{queryString}", HttpMethod.Get);
    }

    public Task<string> Update(string courseContentId, CourseContentUpdateModel courseContent)
    {
        return _client.Request($"/course.content/{courseContentId}", HttpMethod.Put, courseContent);
    }

    public Task<string> Delete(string courseContentId)
    {
        return _client.Request($"/course.content/{courseContentId}", HttpMethod.Delete);
    }

    public async Task ExecuteCourseContentOperations()
    {
        var faker = new Faker("en");

        var createValidator = new CourseContentCreateModelValidator();
        var createNewCourseContent = new CourseContentCreateModel
        {
                        Title= faker.Lorem.Sentence(3),
            Description= faker.Lorem.Sentence(),
            ImageUrl= faker.Internet.Url(),
            DurationInMins= faker.Random.Int(1, 10000),
            ContentType= "Assessment",
            ResourceLink= faker.Lorem.Sentence(3),
            ActionTemplateId= "{{ACTION_TEMPLATE_ID}}",
            Sequence= faker.Random.Int(1, 10000),

        };

        var createValidationResult = createValidator.Validate(createNewCourseContent);
        if (!createValidationResult.IsValid)
        {
            foreach (var error in createValidationResult.Errors)
            {
                Console.WriteLine("Validation error:" + error.ErrorMessage);
            }
            return;
        }

        if (!ValidationHelper.TryValidateModel(createNewCourseContent, out var validationResults))
        {
            foreach (var validationResult in validationResults)
            {
                Console.WriteLine(validationResult.ErrorMessage);
            }
            return;
        }

        var createResponse = await Create(createNewCourseContent);
        dynamic createdCourseContent = JsonConvert.DeserializeObject(createResponse);
        Console.WriteLine("Create: " + JsonConvert.SerializeObject(createdCourseContent, Formatting.Indented));

        string courseContentId = createdCourseContent.Data.id.ToString();

        var retrievedResponse = await GetById(courseContentId);
        dynamic retrieved = JsonConvert.DeserializeObject(retrievedResponse);
        Console.WriteLine("GetById: " + JsonConvert.SerializeObject(retrieved, Formatting.Indented));

        var searchValidator = new CourseContentSearchFiltersValidator();
        var searchFilters = new CourseContentSearchFilters
        {
                        Title= createNewCourseContent.Title,
            Description= createNewCourseContent.Description,
            ImageUrl= createNewCourseContent.ImageUrl,
            DurationInMins= createNewCourseContent.DurationInMins,
            ResourceLink= createNewCourseContent.ResourceLink,
            Sequence= createNewCourseContent.Sequence,

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

        var updateValidator = new CourseContentUpdateModelValidator();
        var updatedCourseContent = new CourseContentUpdateModel
        {
                        Title= faker.Lorem.Sentence(3),
            Description= faker.Lorem.Sentence(),
            ImageUrl= faker.Internet.Url(),
            DurationInMins= faker.Random.Int(1, 10000),
            ContentType= "Assessment",
            ResourceLink= faker.Lorem.Sentence(3),
            ActionTemplateId= "{{ACTION_TEMPLATE_ID}}",
            Sequence= faker.Random.Int(1, 10000),

        };

        var updateValidationResult = updateValidator.Validate(updatedCourseContent);
        if (!updateValidationResult.IsValid)
        {
            foreach (var error in updateValidationResult.Errors)
            {
                Console.WriteLine("Validation error:" + error.ErrorMessage);
            }
            return;
        }

        var updateResponse = await Update(courseContentId, updatedCourseContent);
        dynamic updated = JsonConvert.DeserializeObject(updateResponse);
        Console.WriteLine("Update: " + JsonConvert.SerializeObject(updated, Formatting.Indented));

        var deleteResponse = await Delete(courseContentId);
        dynamic deleted = JsonConvert.DeserializeObject(deleteResponse);
        Console.WriteLine("Delete: " + JsonConvert.SerializeObject(deleted, Formatting.Indented));
    }
}
