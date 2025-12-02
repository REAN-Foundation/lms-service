# CourseContent Documentation
## Overview


### CourseContent Creation Fields
| Field | Type | Description |
|---|---|---|
| `Title` | `String, required` |  |
| `Description` | `String, required` |  |
| `ImageUrl` | `String, required` |  |
| `DurationInMins` | `Integer, required` |  |
| `ContentType` | `Enum, required` |  |
| `ResourceLink` | `String, required` |  |
| `ActionTemplateId` | `UUID, required` |  |
| `Sequence` | `Integer, required` |  |


### CourseContent Update Fields
| Field | Type | Description |
|---|---|---|
| `Title` | `String, optional` |  |
| `Description` | `String, optional` |  |
| `ImageUrl` | `String, optional` |  |
| `DurationInMins` | `Integer, optional` |  |
| `ContentType` | `Enum, optional` |  |
| `ResourceLink` | `String, optional` |  |
| `ActionTemplateId` | `UUID, optional` |  |
| `Sequence` | `Integer, optional` |  |


### CourseContent Search Parameters Fields
| Field | Type | Description |
|---|---|---|
| `Title` | `String, optional` |  |
| `Description` | `String, optional` |  |
| `ImageUrl` | `String, optional` |  |
| `DurationInMins` | `Integer, optional` |  |
| `ContentType` | `Enum, optional` |  |
| `ResourceLink` | `String, optional` |  |
| `ActionTemplateId` | `UUID, optional` |  |
| `Sequence` | `Integer, optional` |  |


## How to Use course contents Methods
### Creating a course contents
Use `create` to add a new course contents.
**Example:**
```dotnet
var newData = { /* "Title": faker.Lorem.Sentence(3),
"Description": faker.Lorem.Sentence(),
"ImageUrl": faker.Internet.Url(),
"DurationInMins": faker.Random.Int(1, 10000),
"ContentType": "Audio",
"ResourceLink": faker.Lorem.Sentence(3),
"ActionTemplateId": "{{ACTION_TEMPLATE_ID}}",
"Sequence": faker.Random.Int(1, 10000),
 */ };
var response = await sdk.course_contents.Create(newData);
Console.WriteLine($"Created: response.Data");

```
### Getting a course contents by ID
Use `getById` to retrieve a course contents by its ID.
**Example:**
```dotnet
var response = await sdk.course_contents.GetById(course_contentsId);
Console.WriteLine($"course_contents Details: response.Data");

```
### Searching for course contents
Use `search` to find course contents using filters.
**Example:**
```dotnet
var queryParams = { /* "Title": faker.Lorem.Sentence(3),
"Description": faker.Lorem.Sentence(),
"ImageUrl": faker.Internet.Url(),
"DurationInMins": faker.Random.Int(1, 10000),
"ContentType": "Text",
"ResourceLink": faker.Lorem.Sentence(3),
"ActionTemplateId": "{{ACTION_TEMPLATE_ID}}",
"Sequence": faker.Random.Int(1, 10000),
 */ };
var response = await sdk.course_contents.Search(queryParams);
Console.WriteLine($"Search Results: response.Data");

```
### Updating a course contents
Use `update` to modify an existing course_contents.
**Example:**
```dotnet
var updatedData = { /* "Title": faker.Lorem.Sentence(3),
"Description": faker.Lorem.Sentence(),
"ImageUrl": faker.Internet.Url(),
"DurationInMins": faker.Random.Int(1, 10000),
"ContentType": "Audio",
"ResourceLink": faker.Lorem.Sentence(3),
"ActionTemplateId": "{{ACTION_TEMPLATE_ID}}",
"Sequence": faker.Random.Int(1, 10000),
 */ };
var response = await sdk.course_contents.Update(course_contentsId, updatedData);
Console.WriteLine($"Updated: response.Data");

```
### Deleting a course contents
Use `delete` to remove a course contents by its ID.
**Example:**
```dotnet
var response = await sdk.course_contents.Delete(course_contentsId);
Console.WriteLine($"course_contents Deleted: response");

```
