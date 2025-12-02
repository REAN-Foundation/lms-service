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
```python
new_data = { "TenantId": "{{TENANT_ID}}",
"Name": faker.Person.FullName(),
"Description": faker.Lorem.Words(2, 10),
"ImageUrl": faker.Internet.Url(),
"DurationInDays": faker.Random.Int(1, 10000),
 }
response = await sdk.courses.create(new_data)
print(f"Created: {response.data}")


```
### Getting a courses by ID
Use `getById` to retrieve a courses by its ID.
**Example:**
```python
response = await sdk.courses.get_by_id(courses_id)
print(f"courses Details: {response.data}")


```
### Searching for courses
Use `search` to find courses using filters.
**Example:**
```python
query_params = { "TenantId": "{{TENANT_ID}}",
"Name": faker.Person.FullName(),
"Description": faker.Lorem.Words(2, 10),
"ImageUrl": faker.Internet.Url(),
"DurationInDays": faker.Random.Int(1, 10000),
 }
response = await sdk.courses.search(query_params)
print(f"Search Results: {response.data}")


```
### Updating a courses
Use `update` to modify an existing courses.
**Example:**
```python
updated_data = { "TenantId": "{{TENANT_ID}}",
"Name": faker.Person.FullName(),
"Description": faker.Lorem.Words(2, 10),
"ImageUrl": faker.Internet.Url(),
"DurationInDays": faker.Random.Int(1, 10000),
 }
response = await sdk.courses.update(courses_id, updated_data)
print(f"Updated: {response.data}")


```
### Deleting a courses
Use `delete` to remove a courses by its ID.
**Example:**
```python
response = await sdk.courses.delete(courses_id)
print(f"courses Deleted: {response}")


```
