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
```python
new_data = { "TenantId": "{{TENANT_ID}}",
"Name": faker.Person.FullName(),
"Description": faker.Lorem.Words(2, 10),
"ImageUrl": faker.Internet.Url(),
"DurationInDays": faker.Random.Int(1, 10000),
"PreferenceWeight": faker.Random.Int(1, 10000),
"Enabled": faker.Random.Bool(),
 }
response = await sdk.learning_paths.create(new_data)
print(f"Created: {response.data}")


```
### Getting a learning paths by ID
Use `getById` to retrieve a learning paths by its ID.
**Example:**
```python
response = await sdk.learning_paths.get_by_id(learning_paths_id)
print(f"learning_paths Details: {response.data}")


```
### Searching for learning paths
Use `search` to find learning paths using filters.
**Example:**
```python
query_params = { "TenantId": "{{TENANT_ID}}",
"Name": faker.Person.FullName(),
"Description": faker.Lorem.Words(2, 10),
"ImageUrl": faker.Internet.Url(),
"DurationInDays": faker.Random.Int(1, 10000),
"PreferenceWeight": faker.Random.Int(1, 10000),
"Enabled": faker.Random.Bool(),
 }
response = await sdk.learning_paths.search(query_params)
print(f"Search Results: {response.data}")


```
### Updating a learning paths
Use `update` to modify an existing learning_paths.
**Example:**
```python
updated_data = { "TenantId": "{{TENANT_ID}}",
"Name": faker.Person.FullName(),
"Description": faker.Lorem.Words(2, 10),
"ImageUrl": faker.Internet.Url(),
"DurationInDays": faker.Random.Int(1, 10000),
"PreferenceWeight": faker.Random.Int(1, 10000),
"Enabled": faker.Random.Bool(),
 }
response = await sdk.learning_paths.update(learning_paths_id, updated_data)
print(f"Updated: {response.data}")


```
### Deleting a learning paths
Use `delete` to remove a learning paths by its ID.
**Example:**
```python
response = await sdk.learning_paths.delete(learning_paths_id)
print(f"learning_paths Deleted: {response}")


```
