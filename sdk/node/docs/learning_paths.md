# LearningPath SDK Documentation

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
```typescript
const newData = { /* "TenantId": "{{TENANT_ID}}",
"Name": faker.person.fullName(),
"Description": faker.lorem.words(3),
"ImageUrl": faker.internet.url(),
"DurationInDays": faker.number.int({ max: 9999 }),
"PreferenceWeight": faker.number.int({ max: 9999 }),
"Enabled": faker.datatype.boolean(),
 */ };
const response = await sdk.learning_paths.create(newData);
console.log('Created:', response.data);
```

### Getting a learning paths by ID
Use `getById` to retrieve a learning paths by its ID.

**Example:**
```typescript
const response = await sdk.learning_paths.getById(learning_pathsId);
console.log('learning_paths Details:', response.data);
```

### Searching for learning paths
Use `search` to find learning paths using filters.

**Example:**
```typescript
const queryParams = { /* "TenantId": "{{TENANT_ID}}",
"Name": faker.person.fullName(),
"Description": faker.lorem.words(3),
"ImageUrl": faker.internet.url(),
"DurationInDays": faker.number.int({ max: 9999 }),
"PreferenceWeight": faker.number.int({ max: 9999 }),
"Enabled": faker.datatype.boolean(),
 */ };
const response = await sdk.learning_paths.search(queryParams);
console.log('Search Results:', response.data);
```

### Updating a learning paths
Use `update` to modify an existing learning_paths.

**Example:**
```typescript
const updatedData = { /* "TenantId": "{{TENANT_ID}}",
"Name": faker.person.fullName(),
"Description": faker.lorem.words(3),
"ImageUrl": faker.internet.url(),
"DurationInDays": faker.number.int({ max: 9999 }),
"PreferenceWeight": faker.number.int({ max: 9999 }),
"Enabled": faker.datatype.boolean(),
 */ };
const response = await sdk.learning_paths.update(learning_pathsId, updatedData);
console.log('Updated:', response.data);
```

### Deleting a learning paths
Use `delete` to remove a learning paths by its ID.

**Example:**
```typescript
const response = await sdk.learning_paths.delete(learning_pathsId);
console.log('learning_paths Deleted:', response);
```
