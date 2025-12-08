# LearningPath Documentation
## Overview


### LearningPath Creation Fields
| Field | Type | Description |
|---|---|---|
| `TenantId` | `UUID, required` |  |
| `Name` | `String, required` |  |
| `Description` | `String, required` |  |
| `ImageUrl` | `String, required` |  |
| `DurationInDays` | `Integer, required` |  |
| `PreferenceWeight` | `Integer, required` |  |
| `Enabled` | `Boolean, required` |  |


### LearningPath Update Fields
| Field | Type | Description |
|---|---|---|
| `TenantId` | `UUID, optional` |  |
| `Name` | `String, optional` |  |
| `Description` | `String, optional` |  |
| `ImageUrl` | `String, optional` |  |
| `DurationInDays` | `Integer, optional` |  |
| `PreferenceWeight` | `Integer, optional` |  |
| `Enabled` | `Boolean, optional` |  |


### LearningPath Search Parameters Fields
| Field | Type | Description |
|---|---|---|
| `TenantId` | `UUID, optional` |  |
| `Name` | `String, optional` |  |
| `Description` | `String, optional` |  |
| `ImageUrl` | `String, optional` |  |
| `DurationInDays` | `Integer, optional` |  |
| `PreferenceWeight` | `Integer, optional` |  |
| `Enabled` | `Boolean, optional` |  |


## How to Use learning paths Methods
### Creating a learning paths
Use `create` to add a new learning paths.
**Example:**
```dotnet
var newData = { /* "TenantId": "{{TENANT_ID}}",
"Name": faker.Name.FullName(),
"Description": faker.Lorem.Sentence(),
"ImageUrl": faker.Internet.Url(),
"DurationInDays": faker.Random.Int(1, 10000),
"PreferenceWeight": faker.Random.Int(1, 10000),
"Enabled": faker.Random.Bool(),
 */ };
var response = await sdk.learning_paths.Create(newData);
Console.WriteLine($"Created: response.Data");

```
### Getting a learning paths by ID
Use `getById` to retrieve a learning paths by its ID.
**Example:**
```dotnet
var response = await sdk.learning_paths.GetById(learning_pathsId);
Console.WriteLine($"learning_paths Details: response.Data");

```
### Searching for learning paths
Use `search` to find learning paths using filters.
**Example:**
```dotnet
var queryParams = { /* "TenantId": "{{TENANT_ID}}",
"Name": faker.Name.FullName(),
"Description": faker.Lorem.Sentence(),
"ImageUrl": faker.Internet.Url(),
"DurationInDays": faker.Random.Int(1, 10000),
"PreferenceWeight": faker.Random.Int(1, 10000),
"Enabled": faker.Random.Bool(),
 */ };
var response = await sdk.learning_paths.Search(queryParams);
Console.WriteLine($"Search Results: response.Data");

```
### Updating a learning paths
Use `update` to modify an existing learning_paths.
**Example:**
```dotnet
var updatedData = { /* "TenantId": "{{TENANT_ID}}",
"Name": faker.Name.FullName(),
"Description": faker.Lorem.Sentence(),
"ImageUrl": faker.Internet.Url(),
"DurationInDays": faker.Random.Int(1, 10000),
"PreferenceWeight": faker.Random.Int(1, 10000),
"Enabled": faker.Random.Bool(),
 */ };
var response = await sdk.learning_paths.Update(learning_pathsId, updatedData);
Console.WriteLine($"Updated: response.Data");

```
### Deleting a learning paths
Use `delete` to remove a learning paths by its ID.
**Example:**
```dotnet
var response = await sdk.learning_paths.Delete(learning_pathsId);
Console.WriteLine($"learning_paths Deleted: response");

```
