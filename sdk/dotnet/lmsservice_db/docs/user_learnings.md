# UserLearning Documentation
## Overview


### UserLearning Creation Fields
| Field | Type | Description |
|---|---|---|
| `UserId` | `UUID, required` |  |
| `ActionId` | `UUID, required` |  |
| `ProgressStatus` | `Enum, required` |  |
| `PercentageCompletion` | `Integer, required` |  |


### UserLearning Update Fields
| Field | Type | Description |
|---|---|---|
| `UserId` | `UUID, optional` |  |
| `ActionId` | `UUID, optional` |  |
| `ProgressStatus` | `Enum, optional` |  |
| `PercentageCompletion` | `Integer, optional` |  |


### UserLearning Search Parameters Fields
| Field | Type | Description |
|---|---|---|
| `UserId` | `UUID, optional` |  |
| `ActionId` | `UUID, optional` |  |
| `ProgressStatus` | `Enum, optional` |  |
| `PercentageCompletion` | `Integer, optional` |  |


## How to Use user learnings Methods
### Creating a user learnings
Use `create` to add a new user learnings.
**Example:**
```dotnet
var newData = { /* "UserId": "{{USER_ID}}",
"ActionId": "{{ACTION_ID}}",
"ProgressStatus": "Unknown",
"PercentageCompletion": faker.Random.Int(1, 10000),
 */ };
var response = await sdk.user_learnings.Create(newData);
Console.WriteLine($"Created: response.Data");

```
### Getting a user learnings by ID
Use `getById` to retrieve a user learnings by its ID.
**Example:**
```dotnet
var response = await sdk.user_learnings.GetById(user_learningsId);
Console.WriteLine($"user_learnings Details: response.Data");

```
### Searching for user learnings
Use `search` to find user learnings using filters.
**Example:**
```dotnet
var queryParams = { /* "UserId": "{{USER_ID}}",
"ActionId": "{{ACTION_ID}}",
"ProgressStatus": "Pending",
"PercentageCompletion": faker.Random.Int(1, 10000),
 */ };
var response = await sdk.user_learnings.Search(queryParams);
Console.WriteLine($"Search Results: response.Data");

```
### Updating a user learnings
Use `update` to modify an existing user_learnings.
**Example:**
```dotnet
var updatedData = { /* "UserId": "{{USER_ID}}",
"ActionId": "{{ACTION_ID}}",
"ProgressStatus": "Unknown",
"PercentageCompletion": faker.Random.Int(1, 10000),
 */ };
var response = await sdk.user_learnings.Update(user_learningsId, updatedData);
Console.WriteLine($"Updated: response.Data");

```
### Deleting a user learnings
Use `delete` to remove a user learnings by its ID.
**Example:**
```dotnet
var response = await sdk.user_learnings.Delete(user_learningsId);
Console.WriteLine($"user_learnings Deleted: response");

```
