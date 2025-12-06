# CourseContent SDK Documentation

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
```typescript
const newData = { /* "Title": faker.lorem.sentence(3),
"Description": faker.lorem.words(3),
"ImageUrl": faker.internet.url(),
"DurationInMins": faker.number.int({ max: 9999 }),
"ContentType": "Text",
"ResourceLink": faker.lorem.sentence(3),
"ActionTemplateId": "{{ACTION_TEMPLATE_ID}}",
"Sequence": faker.number.int({ max: 9999 }),
 */ };
const response = await sdk.course_contents.create(newData);
console.log('Created:', response.data);
```

### Getting a course contents by ID
Use `getById` to retrieve a course contents by its ID.

**Example:**
```typescript
const response = await sdk.course_contents.getById(course_contentsId);
console.log('course_contents Details:', response.data);
```

### Searching for course contents
Use `search` to find course contents using filters.

**Example:**
```typescript
const queryParams = { /* "Title": faker.lorem.sentence(3),
"Description": faker.lorem.words(3),
"ImageUrl": faker.internet.url(),
"DurationInMins": faker.number.int({ max: 9999 }),
"ContentType": "Document",
"ResourceLink": faker.lorem.sentence(3),
"ActionTemplateId": "{{ACTION_TEMPLATE_ID}}",
"Sequence": faker.number.int({ max: 9999 }),
 */ };
const response = await sdk.course_contents.search(queryParams);
console.log('Search Results:', response.data);
```

### Updating a course contents
Use `update` to modify an existing course_contents.

**Example:**
```typescript
const updatedData = { /* "Title": faker.lorem.sentence(3),
"Description": faker.lorem.words(3),
"ImageUrl": faker.internet.url(),
"DurationInMins": faker.number.int({ max: 9999 }),
"ContentType": "Text",
"ResourceLink": faker.lorem.sentence(3),
"ActionTemplateId": "{{ACTION_TEMPLATE_ID}}",
"Sequence": faker.number.int({ max: 9999 }),
 */ };
const response = await sdk.course_contents.update(course_contentsId, updatedData);
console.log('Updated:', response.data);
```

### Deleting a course contents
Use `delete` to remove a course contents by its ID.

**Example:**
```typescript
const response = await sdk.course_contents.delete(course_contentsId);
console.log('course_contents Deleted:', response);
```
