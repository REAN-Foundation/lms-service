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
```python
new_data = { "UserId": "{{USER_ID}}",
"ActionId": "{{ACTION_ID}}",
"ProgressStatus": "Pending",
"PercentageCompletion": faker.Random.Int(1, 10000),
 }
response = await sdk.user_learnings.create(new_data)
print(f"Created: {response.data}")


```
### Getting a user learnings by ID
Use `getById` to retrieve a user learnings by its ID.
**Example:**
```python
response = await sdk.user_learnings.get_by_id(user_learnings_id)
print(f"user_learnings Details: {response.data}")


```
### Searching for user learnings
Use `search` to find user learnings using filters.
**Example:**
```python
query_params = { "UserId": "{{USER_ID}}",
"ActionId": "{{ACTION_ID}}",
"ProgressStatus": "Unknown",
"PercentageCompletion": faker.Random.Int(1, 10000),
 }
response = await sdk.user_learnings.search(query_params)
print(f"Search Results: {response.data}")


```
### Updating a user learnings
Use `update` to modify an existing user_learnings.
**Example:**
```python
updated_data = { "UserId": "{{USER_ID}}",
"ActionId": "{{ACTION_ID}}",
"ProgressStatus": "Pending",
"PercentageCompletion": faker.Random.Int(1, 10000),
 }
response = await sdk.user_learnings.update(user_learnings_id, updated_data)
print(f"Updated: {response.data}")


```
### Deleting a user learnings
Use `delete` to remove a user learnings by its ID.
**Example:**
```python
response = await sdk.user_learnings.delete(user_learnings_id)
print(f"user_learnings Deleted: {response}")


```
