# CourseModule Documentation
## Overview


### CourseModule Creation Fields
| Field | Type | Description |
|---|---|---|
| `Name` | `String, required` |  |
| `Description` | `String, required` |  |
| `ImageUrl` | `String, required` |  |
| `DurationInMins` | `Integer, required` |  |
| `Sequence` | `Integer, required` |  |


### CourseModule Update Fields
| Field | Type | Description |
|---|---|---|
| `Name` | `String, optional` |  |
| `Description` | `String, optional` |  |
| `ImageUrl` | `String, optional` |  |
| `DurationInMins` | `Integer, optional` |  |
| `Sequence` | `Integer, optional` |  |


### CourseModule Search Parameters Fields
| Field | Type | Description |
|---|---|---|
| `Name` | `String, optional` |  |
| `Description` | `String, optional` |  |
| `ImageUrl` | `String, optional` |  |
| `DurationInMins` | `Integer, optional` |  |
| `Sequence` | `Integer, optional` |  |


## How to Use course modules Methods
### Creating a course modules
Use `create` to add a new course modules.
**Example:**
```dotnet
var newData = { /* "Name": faker.Name.FullName(),
"Description": faker.Lorem.Sentence(),
"ImageUrl": faker.Internet.Url(),
"DurationInMins": faker.Random.Int(1, 10000),
"Sequence": faker.Random.Int(1, 10000),
 */ };
var response = await sdk.course_modules.Create(newData);
Console.WriteLine($"Created: response.Data");

```
### Getting a course modules by ID
Use `getById` to retrieve a course modules by its ID.
**Example:**
```dotnet
var response = await sdk.course_modules.GetById(course_modulesId);
Console.WriteLine($"course_modules Details: response.Data");

```
### Searching for course modules
Use `search` to find course modules using filters.
**Example:**
```dotnet
var queryParams = { /* "Name": faker.Name.FullName(),
"Description": faker.Lorem.Sentence(),
"ImageUrl": faker.Internet.Url(),
"DurationInMins": faker.Random.Int(1, 10000),
"Sequence": faker.Random.Int(1, 10000),
 */ };
var response = await sdk.course_modules.Search(queryParams);
Console.WriteLine($"Search Results: response.Data");

```
### Updating a course modules
Use `update` to modify an existing course_modules.
**Example:**
```dotnet
var updatedData = { /* "Name": faker.Name.FullName(),
"Description": faker.Lorem.Sentence(),
"ImageUrl": faker.Internet.Url(),
"DurationInMins": faker.Random.Int(1, 10000),
"Sequence": faker.Random.Int(1, 10000),
 */ };
var response = await sdk.course_modules.Update(course_modulesId, updatedData);
Console.WriteLine($"Updated: response.Data");

```
### Deleting a course modules
Use `delete` to remove a course modules by its ID.
**Example:**
```dotnet
var response = await sdk.course_modules.Delete(course_modulesId);
Console.WriteLine($"course_modules Deleted: response");

```
