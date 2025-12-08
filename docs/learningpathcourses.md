# LearningPathCourses Module Documentation

<a id="module-description"></a>
## 📋 Module Description

The LearningPathCourses module manages learningpathcourses functionality in the application.

It handles learningpathcourses creation, retrieval, updates, and deletion operations.



<a id="files"></a>
## 📂 Files

| Sr.No | File Type | File Path | Description |
|-------|-----------|-----------|-------------|
| 1 | Controller | [`src/api/learning.path.courses/learning.path.courses.controller.ts`](../src/api/learning.path.courses/learning.path.courses.controller.ts) | Main controller handling learningpathcourses endpoints |
| 2 | Routes | [`src/api/learning.path.courses/learning.path.courses.routes.ts`](../src/api/learning.path.courses/learning.path.courses.routes.ts) | API route definitions for learningpathcourses |
| 3 | Service | [`src/database/typeorm/services/learning.path.courses.service.ts`](../src/database/typeorm/services/learning.path.courses.service.ts) | Business logic for learningpathcourses operations |
| 4 | Entity | [`src/database/typeorm/models/learning.path.courses.entity.ts`](../src/database/typeorm/models/learning.path.courses.entity.ts) | LearningPathCourses entity definition |

**Base Route**: `/api/v1/learning-path-courses`

<a id="database-schema"></a>
## 🗄️ Database Schema

<a id="database-table-structure"></a>
### Database Table Structure

```sql
CREATE TABLE learning_path_courses (
);
```

<a id="domain-types"></a>
## 📝 Domain Types
You can find the domain types in the following file:
[`LearningPathCourses domain types - Create & Update models, Search filters`](../src/domain.types/learning.path.courses.performance.types.ts)

<a id="api-endpoints"></a>
## 📊 API Endpoints

| Method | Endpoint | Description | Authentication | Authorization | Request Body |
|--------|----------|-------------|----------------|---------------|--------------|
| POST | `/api/v1/learning-path-courses/create` | Create a new learningpathcourses | Yes | Public | CreateLearningPathCoursesDto |
| GET | `/api/v1/learning-path-courses/search` | Search/filter learningpathcoursess | Yes | Public | - |
| GET | `/api/v1/learning-path-courses/:id` | Get learningpathcourses by ID | Yes | Public | - |
| PUT | `/api/v1/learning-path-courses/:id` | Update learningpathcourses | Yes | Public | UpdateLearningPathCoursesDto |
| DELETE | `/api/v1/learning-path-courses/:id` | Delete learningpathcourses | Yes | Authenticated | - |

<a id="response-examples"></a>
## 🔄 Response Examples

<a id="successful-learningpathcourses-creation"></a>
### Successful LearningPathCourses Creation
```json
{
  "success": true,
  "message": "LearningPathCourses created successfully.",
  "data": {
    "LearningPathCourses": {
    }
  },
  "timestamp": "2025-11-07T15:06:20.693Z"
}
```

<a id="error-response"></a>
### Error Response
```json
{
  "success": false,
  "message": "LearningPathCourses not found",
  "error": {
    "code": 404,
    "details": "The requested learningpathcourses could not be found"
  },
  "timestamp": "2025-11-07T15:06:20.693Z"
}
```
---
