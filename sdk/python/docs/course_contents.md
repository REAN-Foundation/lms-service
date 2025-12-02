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
```python
new_data = { "Title": faker.Lorem.Sentence(3),
"Description": faker.Lorem.Words(2, 10),
"ImageUrl": faker.Internet.Url(),
"DurationInMins": faker.Random.Int(1, 10000),
"ContentType": "Video",
"ResourceLink": faker.Lorem.Sentence(3),
"ActionTemplateId": "{{ACTION_TEMPLATE_ID}}",
"Sequence": faker.Random.Int(1, 10000),
 }
response = await sdk.course_contents.create(new_data)
print(f"Created: {response.data}")


```
### Getting a course contents by ID
Use `getById` to retrieve a course contents by its ID.
**Example:**
```python
response = await sdk.course_contents.get_by_id(course_contents_id)
print(f"course_contents Details: {response.data}")


```
### Searching for course contents
Use `search` to find course contents using filters.
**Example:**
```python
query_params = { "Title": faker.Lorem.Sentence(3),
"Description": faker.Lorem.Words(2, 10),
"ImageUrl": faker.Internet.Url(),
"DurationInMins": faker.Random.Int(1, 10000),
"ContentType": "Document",
"ResourceLink": faker.Lorem.Sentence(3),
"ActionTemplateId": "{{ACTION_TEMPLATE_ID}}",
"Sequence": faker.Random.Int(1, 10000),
 }
response = await sdk.course_contents.search(query_params)
print(f"Search Results: {response.data}")


```
### Updating a course contents
Use `update` to modify an existing course_contents.
**Example:**
```python
updated_data = { "Title": faker.Lorem.Sentence(3),
"Description": faker.Lorem.Words(2, 10),
"ImageUrl": faker.Internet.Url(),
"DurationInMins": faker.Random.Int(1, 10000),
"ContentType": "Video",
"ResourceLink": faker.Lorem.Sentence(3),
"ActionTemplateId": "{{ACTION_TEMPLATE_ID}}",
"Sequence": faker.Random.Int(1, 10000),
 }
response = await sdk.course_contents.update(course_contents_id, updated_data)
print(f"Updated: {response.data}")


```
### Deleting a course contents
Use `delete` to remove a course contents by its ID.
**Example:**
```python
response = await sdk.course_contents.delete(course_contents_id)
print(f"course_contents Deleted: {response}")


```
