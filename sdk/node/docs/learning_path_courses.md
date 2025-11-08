# LearningPathCourses SDK Documentation

## Overview



### LearningPathCourses Creation Fields
_No fields available_


### LearningPathCourses Update Fields
_No fields available_


### LearningPathCourses Search Parameters Fields
_No fields available_



## How to Use learning path courses Methods

### Creating a learning path courses
Use `create` to add a new learning path courses.

**Example:**
```typescript
const newData = { /*  */ };
const response = await sdk.learning_path_courses.create(newData);
console.log('Created:', response.data);
```

### Getting a learning path courses by ID
Use `getById` to retrieve a learning path courses by its ID.

**Example:**
```typescript
const response = await sdk.learning_path_courses.getById(learning_path_coursesId);
console.log('learning_path_courses Details:', response.data);
```

### Searching for learning path courses
Use `search` to find learning path courses using filters.

**Example:**
```typescript
const queryParams = { /*  */ };
const response = await sdk.learning_path_courses.search(queryParams);
console.log('Search Results:', response.data);
```

### Updating a learning path courses
Use `update` to modify an existing learning_path_courses.

**Example:**
```typescript
const updatedData = { /*  */ };
const response = await sdk.learning_path_courses.update(learning_path_coursesId, updatedData);
console.log('Updated:', response.data);
```

### Deleting a learning path courses
Use `delete` to remove a learning path courses by its ID.

**Example:**
```typescript
const response = await sdk.learning_path_courses.delete(learning_path_coursesId);
console.log('learning_path_courses Deleted:', response);
```
