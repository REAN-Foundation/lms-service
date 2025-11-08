# CourseModule SDK Documentation

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
```typescript
const newData = { /* "Name": faker.person.fullName(),
"Description": faker.lorem.words(3),
"ImageUrl": faker.internet.url(),
"DurationInMins": faker.number.int({ max: 9999 }),
"Sequence": faker.number.int({ max: 9999 }),
 */ };
const response = await sdk.course_modules.create(newData);
console.log('Created:', response.data);
```

### Getting a course modules by ID
Use `getById` to retrieve a course modules by its ID.

**Example:**
```typescript
const response = await sdk.course_modules.getById(course_modulesId);
console.log('course_modules Details:', response.data);
```

### Searching for course modules
Use `search` to find course modules using filters.

**Example:**
```typescript
const queryParams = { /* "Name": faker.person.fullName(),
"Description": faker.lorem.words(3),
"ImageUrl": faker.internet.url(),
"DurationInMins": faker.number.int({ max: 9999 }),
"Sequence": faker.number.int({ max: 9999 }),
 */ };
const response = await sdk.course_modules.search(queryParams);
console.log('Search Results:', response.data);
```

### Updating a course modules
Use `update` to modify an existing course_modules.

**Example:**
```typescript
const updatedData = { /* "Name": faker.person.fullName(),
"Description": faker.lorem.words(3),
"ImageUrl": faker.internet.url(),
"DurationInMins": faker.number.int({ max: 9999 }),
"Sequence": faker.number.int({ max: 9999 }),
 */ };
const response = await sdk.course_modules.update(course_modulesId, updatedData);
console.log('Updated:', response.data);
```

### Deleting a course modules
Use `delete` to remove a course modules by its ID.

**Example:**
```typescript
const response = await sdk.course_modules.delete(course_modulesId);
console.log('course_modules Deleted:', response);
```
