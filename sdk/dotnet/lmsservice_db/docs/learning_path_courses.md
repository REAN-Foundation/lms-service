# LearningPathCourses Documentation
## Overview


### LearningPathCourses Creation Fields
_No fields available_


### LearningPathCourses Update Fields
_No fields available_


### LearningPathCourses Search Parameters Fields
_No fields available_


## How to Use learning path courses Methods
### Creating a learning path courses
Use `create` to add a new learning path courses.
**Example:**
```dotnet
var newData = { /*  */ };
var response = await sdk.learning_path_courses.Create(newData);
Console.WriteLine($"Created: response.Data");

```
### Getting a learning path courses by ID
Use `getById` to retrieve a learning path courses by its ID.
**Example:**
```dotnet
var response = await sdk.learning_path_courses.GetById(learning_path_coursesId);
Console.WriteLine($"learning_path_courses Details: response.Data");

```
### Searching for learning path courses
Use `search` to find learning path courses using filters.
**Example:**
```dotnet
var queryParams = { /*  */ };
var response = await sdk.learning_path_courses.Search(queryParams);
Console.WriteLine($"Search Results: response.Data");

```
### Updating a learning path courses
Use `update` to modify an existing learning_path_courses.
**Example:**
```dotnet
var updatedData = { /*  */ };
var response = await sdk.learning_path_courses.Update(learning_path_coursesId, updatedData);
Console.WriteLine($"Updated: response.Data");

```
### Deleting a learning path courses
Use `delete` to remove a learning path courses by its ID.
**Example:**
```dotnet
var response = await sdk.learning_path_courses.Delete(learning_path_coursesId);
Console.WriteLine($"learning_path_courses Deleted: response");

```
