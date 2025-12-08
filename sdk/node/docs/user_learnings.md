# UserLearning SDK Documentation

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
```typescript
const newData = { /* "UserId": "{{USER_ID}}",
"ActionId": "{{ACTION_ID}}",
"ProgressStatus": "Pending",
"PercentageCompletion": faker.number.int({ max: 9999 }),
 */ };
const response = await sdk.user_learnings.create(newData);
console.log('Created:', response.data);
```

### Getting a user learnings by ID
Use `getById` to retrieve a user learnings by its ID.

**Example:**
```typescript
const response = await sdk.user_learnings.getById(user_learningsId);
console.log('user_learnings Details:', response.data);
```

### Searching for user learnings
Use `search` to find user learnings using filters.

**Example:**
```typescript
const queryParams = { /* "UserId": "{{USER_ID}}",
"ActionId": "{{ACTION_ID}}",
"ProgressStatus": "Delayed",
"PercentageCompletion": faker.number.int({ max: 9999 }),
 */ };
const response = await sdk.user_learnings.search(queryParams);
console.log('Search Results:', response.data);
```

### Updating a user learnings
Use `update` to modify an existing user_learnings.

**Example:**
```typescript
const updatedData = { /* "UserId": "{{USER_ID}}",
"ActionId": "{{ACTION_ID}}",
"ProgressStatus": "Pending",
"PercentageCompletion": faker.number.int({ max: 9999 }),
 */ };
const response = await sdk.user_learnings.update(user_learningsId, updatedData);
console.log('Updated:', response.data);
```

### Deleting a user learnings
Use `delete` to remove a user learnings by its ID.

**Example:**
```typescript
const response = await sdk.user_learnings.delete(user_learningsId);
console.log('user_learnings Deleted:', response);
```
