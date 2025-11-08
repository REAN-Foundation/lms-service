
# SDK Demo: Creating and testing .NET SDK package

This guide walks you through the steps to create a .NET SDK, build it, package it as a NuGet `.nupkg` file, and test it locally.

## Project structure

plaintext
```
lmsservice_db/
│
├── src/
│   ├── api/
│   │   ├── user/
│   │   │   ├── UserService.cs
│   │   │   ├── UserModel.cs
│   │   │   └── UserModelValidation.cs
|   |   ├──ApiClient.cs
|   |   ├──AuthentiationService.cs
|   |   ├──SDK.cs
├── common/
│   │   │   ├── CacheUtils.cs
│   │   │   ├── Exceptions.cs
│   │   │   └── ValidationHelper.cs
├── appsettings.json
├── Program.cs
├── lmsservice_db.csproj   
│   
├── lmsservice_db.sln    # Solution file
└── README.md       # Documentation
```

### Step 01: Create the project directory structure
```
lmsservice_db/
│
├── src/
│   ├── api/
│   ├── common/
├── appsettings.json
├── Program.cs
├── lmsservice_db.csproj
├── lmsservice_db.sln
└── README.md
```

### Step 02: Create a new class library
- Syntax
	```
	dotnet new classlib -n <ProjectName>
	cd <ProjectName>
	```

- Command
	```
	dotnet new classlib -n lmsservice_db
	cd lmsservice_db
	```

### Step 03: Add code to your SDK

- `ActionPlanService.cs` — Contains logic for handling action plans.
- `AnimationService.cs` — Logic for managing animations.
- `UserService.cs` — Logic for user management.

### Step 04: Update the csproj file
```
<PropertyGroup>
	<OutputType>Exe</OutputType>
	<TargetFramework>net8.0</TargetFramework>
	<ImplicitUsings>enable</ImplicitUsings>
	<Nullable>enable</Nullable>
	<RootNamespace>lmsservice_db</RootNamespace>
	<GeneratePackageOnBuild>true</GeneratePackageOnBuild>
	<PackageId>lmsservice_db</PackageId>
	<Version>1.0.0</Version>
	<Authors>Your Name</Authors>
	<Description>A demo SDK package for testing</Description>
	<PackageLicenseExpression>MIT</PackageLicenseExpression>
	<RepositoryUrl>https://github.com/yourrepo</RepositoryUrl>
</PropertyGroup>
```

### Step 05: Build and test the SDK
```	
cd lmsservice_db

dotnet build

dotnet run
```	

### Generate the sln <!-- If sln not generated -->
```
cd ..
dotnet new sln
dotnet sln add path/to/your/project.csproj

dotnet sln add D:\Work Projects\deft-source-latest\generators\node-generator\node.generator.test\bin\Debug\net8.0\templates\NodeTypescript\sdk\dotnet\lmsservice_db\lmsservice_db.csproj
```

### Step 06: Pack the SDK into a nuGet package
```
cd lmsservice_db
dotnet build --configuration Release   
dotnet pack --configuration Release --output ./Package
```

### Step 07: Test the package locally
```
dotnet nuget list source
dotnet nuget add source ./Package --name LocalPackage
```

### Step 08: Create a new project to test the package:

- Syntax
	```
	dotnet new console -n <ProjectName>
	cd <ProjectName>
	```
- Command
	```
	dotnet new console -n test.sdk.package
	cd test.sdk.package
	```

- Syntax add package
	```
	dotnet add package <package-name> --version <version> --source <source-path>
	```

- Command
- dotnet add package lmsservice_db --version 1.0.0 --source ../Package OR
- dotnet add package lmsservice_db --version 1.0.0 --source "D:\Work Projects\deft-source-latest\generators\node-generator\node.generator.test\bin\Debug\net8.0\templates\NodeTypescript\sdk\dotnet\lmsservice_db\Package" OR
- dotnet add package lmsservice_db --version 1.0.0 --source LocalPackage

- write test package code in -> program.cs file
- dotnet build
- dotnet run

### Step 09: Uninstall the package
- syntax
	```
	dotnet remove package <package-name>
	```
- command
	```
	dotnet remove package lmsservice_db
	```

### Step 10: Clear NuGet cache

- If there are any issues with the package, you can clear the NuGet cache
	```
	dotnet nuget locals all --clear
	```	

### Install required NuGet packages -> use in -step 3
- dotnet add package Microsoft.Extensions.Configuration
- dotnet add package Microsoft.Extensions.Configuration.UserSecrets
- dotnet add package Microsoft.Extensions.DependencyInjection
- dotnet add package Bogus
- dotnet add package FluentValidation
- dotnet add package Newtonsoft.Json
	
### Remove local package source (Optional)
```
dotnet nuget remove source LocalPackage
```

## API Documentation
- [certificates](docs/certificates.md)
- [courses](docs/courses.md)
- [course_contents](docs/course_contents.md)
- [course_modules](docs/course_modules.md)
- [learning_paths](docs/learning_paths.md)
- [learning_path_courses](docs/learning_path_courses.md)
- [user_learnings](docs/user_learnings.md)
