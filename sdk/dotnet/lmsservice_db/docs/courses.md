# Course Documentation
## Overview


### Course Creation Fields
| Field | Type | Description |
|---|---|---|
| `TenantId` | `String, required` |  |
| `Name` | `String, required` |  |
| `Description` | `String, required` |  |
| `ImageUrl` | `String, required` |  |
| `DurationInDays` | `Integer, required` |  |


### Course Update Fields
| Field | Type | Description |
|---|---|---|
| `TenantId` | `String, optional` |  |
| `Name` | `String, optional` |  |
| `Description` | `String, optional` |  |
| `ImageUrl` | `String, optional` |  |
| `DurationInDays` | `Integer, optional` |  |


### Course Search Parameters Fields
| Field | Type | Description |
|---|---|---|
| `TenantId` | `String, optional` |  |
| `Name` | `String, optional` |  |
| `Description` | `String, optional` |  |
| `ImageUrl` | `String, optional` |  |
| `DurationInDays` | `Integer, optional` |  |


## How to Use courses Methods
### Creating a courses
Use `create` to add a new courses.
**Example:**
```dotnet
var newData = { /* "TenantId": "{{TENANT_ID}}",
"Name": faker.Name.FullName(),
"Description": faker.Lorem.Sentence(),
"ImageUrl": faker.Internet.Url(),
"DurationInDays": faker.Random.Int(1, 10000),
 */ };
var response = await sdk.courses.Create(newData);
Console.WriteLine($"Created: response.Data");

```
### Getting a courses by ID
Use `getById` to retrieve a courses by its ID.
**Example:**
```dotnet
var response = await sdk.courses.GetById(coursesId);
Console.WriteLine($"courses Details: response.Data");

```
### Searching for courses
Use `search` to find courses using filters.
**Example:**
```dotnet
var queryParams = { /* "TenantId": "{{TENANT_ID}}",
"Name": faker.Name.FullName(),
"Description": faker.Lorem.Sentence(),
"ImageUrl": faker.Internet.Url(),
"DurationInDays": faker.Random.Int(1, 10000),
 */ };
var response = await sdk.courses.Search(queryParams);
Console.WriteLine($"Search Results: response.Data");

```
### Updating a courses
Use `update` to modify an existing courses.
**Example:**
```dotnet
var updatedData = { /* "TenantId": "{{TENANT_ID}}",
"Name": faker.Name.FullName(),
"Description": faker.Lorem.Sentence(),
"ImageUrl": faker.Internet.Url(),
"DurationInDays": faker.Random.Int(1, 10000),
 */ };
var response = await sdk.courses.Update(coursesId, updatedData);
Console.WriteLine($"Updated: response.Data");

```
### Deleting a courses
Use `delete` to remove a courses by its ID.
**Example:**
```dotnet
var response = await sdk.courses.Delete(coursesId);
Console.WriteLine($"courses Deleted: response");

```
