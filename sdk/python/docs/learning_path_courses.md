# LearningPathCourses Documentation
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
```python
new_data = {  }
response = await sdk.learning_path_courses.create(new_data)
print(f"Created: {response.data}")


```
### Getting a learning path courses by ID
Use `getById` to retrieve a learning path courses by its ID.
**Example:**
```python
response = await sdk.learning_path_courses.get_by_id(learning_path_courses_id)
print(f"learning_path_courses Details: {response.data}")


```
### Searching for learning path courses
Use `search` to find learning path courses using filters.
**Example:**
```python
query_params = {  }
response = await sdk.learning_path_courses.search(query_params)
print(f"Search Results: {response.data}")


```
### Updating a learning path courses
Use `update` to modify an existing learning_path_courses.
**Example:**
```python
updated_data = {  }
response = await sdk.learning_path_courses.update(learning_path_courses_id, updated_data)
print(f"Updated: {response.data}")


```
### Deleting a learning path courses
Use `delete` to remove a learning path courses by its ID.
**Example:**
```python
response = await sdk.learning_path_courses.delete(learning_path_courses_id)
print(f"learning_path_courses Deleted: {response}")


```
