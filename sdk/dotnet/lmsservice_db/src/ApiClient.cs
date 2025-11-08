
using System.Net.Http.Headers;
using System.Text;
using Common;
using Newtonsoft.Json;
using lmsservice_db.src.api.course.module.course.moduleservice;
using lmsservice_db.src.api.course.content.course.contentservice;
using lmsservice_db.src.api.course.courseservice;
using lmsservice_db.src.api.learning.path.courses.learning.path.coursesservice;
using lmsservice_db.src.api.learning.path.learning.pathservice;
using lmsservice_db.src.api.user.learning.user.learningservice;
using lmsservice_db.src.api.certificates.certificatesservice;


public class APIClient
{
    private readonly string _baseUrl = "http://localhost:5551/api/v1";
    private static readonly HttpClient _httpClient = new HttpClient();
    public CourseModule CourseModule { get; }
public CourseContent CourseContent { get; }
public Course Course { get; }
public LearningPathCourses LearningPathCourses { get; }
public LearningPath LearningPath { get; }
public UserLearning UserLearning { get; }
public Certificates Certificates { get; }

    public APIClient(string baseUrl)
    {
        _baseUrl = baseUrl;

        _accessToken = CacheUtils.Get("accessToken");
        _refreshToken = CacheUtils.Get("refreshToken");

        CourseModule = new CourseModule(this);
CourseContent = new CourseContent(this);
Course = new Course(this);
LearningPathCourses = new LearningPathCourses(this);
LearningPath = new LearningPath(this);
UserLearning = new UserLearning(this);
Certificates = new Certificates(this);

    }

    private string? _accessToken;
    private string? _refreshToken;

    public void SetAccessToken(string accessToken)
    {
        _accessToken = accessToken;
        CacheUtils.SaveCache("accessToken", accessToken);
    }

    public void SetRefreshToken(string refreshToken)
    {
        _refreshToken = refreshToken;
        CacheUtils.SaveCache("refreshToken", refreshToken);
    }

    public async Task<string> AuthenticateUser(string username, string password)
    {
        var authService = new AuthService(_baseUrl);
        return await authService.AuthenticateUser(username, password);
    }

    public async Task<string> RefreshAccessToken()
    {
        if (_refreshToken == null)
        {
            throw new Exception("Refresh token is not available");
        }

        var authService = new AuthService(_baseUrl);
        return await authService.RefreshAccessToken(_refreshToken);
    }

    protected internal async Task<string> Request(string endpoint, HttpMethod method, object? data = null)
    {
        try
        {
            var url = $"{_baseUrl}{endpoint}";
            var requestMessage = new HttpRequestMessage(method, url);


            if (_accessToken != null)
            {
                requestMessage.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _accessToken);
            }

            if (data != null)
            {
                requestMessage.Content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
            }

            var response = await _httpClient.SendAsync(requestMessage);

            if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                var jsonResponse = JsonConvert.DeserializeObject<dynamic>(responseData);

                if (jsonResponse?.message == "Token expired")
                {
                    await RefreshAccessToken();
                    return await Request(endpoint, method, data);
                }
            }

            response.EnsureSuccessStatusCode();
            var responseContent = await response.Content.ReadAsStringAsync();

            return responseContent;
        }

        catch (HttpRequestException ex)
        {
            throw new Exception("Request failed: " + ex.Message);
        }
    }
    public void ClearCachedTokens()
    {
        CacheUtils.ClearCache();
        Console.WriteLine("Cached tokens cleared.");
    }
}
