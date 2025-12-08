# Course SDK Documentation

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
```typescript
const newData = { /* "TenantId": "{{TENANT_ID}}",
"Name": faker.person.fullName(),
"Description": faker.lorem.words(3),
"ImageUrl": faker.internet.url(),
"DurationInDays": faker.number.int({ max: 9999 }),
 */ };
const response = await sdk.courses.create(newData);
console.log('Created:', response.data);
```

### Getting a courses by ID
Use `getById` to retrieve a courses by its ID.

**Example:**
```typescript
const response = await sdk.courses.getById(coursesId);
console.log('courses Details:', response.data);
```

### Searching for courses
Use `search` to find courses using filters.

**Example:**
```typescript
const queryParams = { /* "TenantId": "{{TENANT_ID}}",
"Name": faker.person.fullName(),
"Description": faker.lorem.words(3),
"ImageUrl": faker.internet.url(),
"DurationInDays": faker.number.int({ max: 9999 }),
 */ };
const response = await sdk.courses.search(queryParams);
console.log('Search Results:', response.data);
```

### Updating a courses
Use `update` to modify an existing courses.

**Example:**
```typescript
const updatedData = { /* "TenantId": "{{TENANT_ID}}",
"Name": faker.person.fullName(),
"Description": faker.lorem.words(3),
"ImageUrl": faker.internet.url(),
"DurationInDays": faker.number.int({ max: 9999 }),
 */ };
const response = await sdk.courses.update(coursesId, updatedData);
console.log('Updated:', response.data);
```

### Deleting a courses
Use `delete` to remove a courses by its ID.

**Example:**
```typescript
const response = await sdk.courses.delete(coursesId);
console.log('courses Deleted:', response);
```
