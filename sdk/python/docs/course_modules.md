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
```python
new_data = { "Name": faker.Person.FullName(),
"Description": faker.Lorem.Words(2, 10),
"ImageUrl": faker.Internet.Url(),
"DurationInMins": faker.Random.Int(1, 10000),
"Sequence": faker.Random.Int(1, 10000),
 }
response = await sdk.course_modules.create(new_data)
print(f"Created: {response.data}")


```
### Getting a course modules by ID
Use `getById` to retrieve a course modules by its ID.
**Example:**
```python
response = await sdk.course_modules.get_by_id(course_modules_id)
print(f"course_modules Details: {response.data}")


```
### Searching for course modules
Use `search` to find course modules using filters.
**Example:**
```python
query_params = { "Name": faker.Person.FullName(),
"Description": faker.Lorem.Words(2, 10),
"ImageUrl": faker.Internet.Url(),
"DurationInMins": faker.Random.Int(1, 10000),
"Sequence": faker.Random.Int(1, 10000),
 }
response = await sdk.course_modules.search(query_params)
print(f"Search Results: {response.data}")


```
### Updating a course modules
Use `update` to modify an existing course_modules.
**Example:**
```python
updated_data = { "Name": faker.Person.FullName(),
"Description": faker.Lorem.Words(2, 10),
"ImageUrl": faker.Internet.Url(),
"DurationInMins": faker.Random.Int(1, 10000),
"Sequence": faker.Random.Int(1, 10000),
 }
response = await sdk.course_modules.update(course_modules_id, updated_data)
print(f"Updated: {response.data}")


```
### Deleting a course modules
Use `delete` to remove a course modules by its ID.
**Example:**
```python
response = await sdk.course_modules.delete(course_modules_id)
print(f"course_modules Deleted: {response}")


```
