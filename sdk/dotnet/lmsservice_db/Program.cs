
using Microsoft.Extensions.Configuration;
using lmsservice_db.SDK;

public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .AddUserSecrets<Program>();

        var configuration = builder.Build();

        var apiConfig = configuration.GetSection("APIConfig");
        var baseUrl = apiConfig["BASE_URL"];
        var apiKey = apiConfig["API_KEY"];

        if (string.IsNullOrEmpty(baseUrl))
        {
            Console.WriteLine("BASE_URL not found in the configuration file.");
            return;
        }

        if (string.IsNullOrEmpty(apiKey))
        {
            Console.WriteLine("API Key is required but missing in the configuration.");
        }

        Console.WriteLine("Initializing SDK...");
        // var sdk = new SDK(baseUrl);
        var apiClient = new APIClient(baseUrl);
    }
}

