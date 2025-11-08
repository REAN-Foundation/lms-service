# Course Module Documentation

<a id="module-description"></a>
## 📋 Module Description

The Course module manages course functionality in the application.

It handles course creation, retrieval, updates, and deletion operations.


Each course contains information about tenantid, name, description, imageurl, durationindays


<a id="files"></a>
## 📂 Files

| Sr.No | File Type | File Path | Description |
|-------|-----------|-----------|-------------|
| 1 | Controller | [`src/api/course/course.controller.ts`](../src/api/course/course.controller.ts) | Main controller handling course endpoints |
| 2 | Routes | [`src/api/course/course.routes.ts`](../src/api/course/course.routes.ts) | API route definitions for course |
| 3 | Service | [`src/database/typeorm/services/course.service.ts`](../src/database/typeorm/services/course.service.ts) | Business logic for course operations |
| 4 | Entity | [`src/database/typeorm/models/course.entity.ts`](../src/database/typeorm/models/course.entity.ts) | Course entity definition |

**Base Route**: `/api/v1/courses`

<a id="database-schema"></a>
## 🗄️ Database Schema

<a id="database-table-structure"></a>
### Database Table Structure

```sql
CREATE TABLE courses (
    TenantId VARCHAR(255) NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Description VARCHAR(255) NOT NULL,
    ImageUrl VARCHAR(255) NOT NULL,
    DurationInDays INT NOT NULL,
    FOREIGN KEY (TenantId) REFERENCES Tenant(id)
);
```

<a id="domain-types"></a>
## 📝 Domain Types
You can find the domain types in the following file:
[`Course domain types - Create & Update models, Search filters`](../src/domain.types/course.performance.types.ts)

<a id="api-endpoints"></a>
## 📊 API Endpoints

| Method | Endpoint | Description | Authentication | Authorization | Request Body |
|--------|----------|-------------|----------------|---------------|--------------|
| POST | `/api/v1/courses/create` | Create a new course | Yes | Public | CreateCourseDto |
| GET | `/api/v1/courses/search` | Search/filter courses | Yes | Public | - |
| GET | `/api/v1/courses/:id` | Get course by ID | Yes | Public | - |
| PUT | `/api/v1/courses/:id` | Update course | Yes | Public | UpdateCourseDto |
| DELETE | `/api/v1/courses/:id` | Delete course | Yes | Authenticated | - |

<a id="response-examples"></a>
## 🔄 Response Examples

<a id="successful-course-creation"></a>
### Successful Course Creation
```json
{
  "success": true,
  "message": "Course created successfully.",
  "data": {
    "Course": {
      "TenantId": "example-value",
      "Name": "Example Name",
      "Description": "This is an example description",
      "ImageUrl": "https://example.com",
      "DurationInDays": 123
    }
  },
  "timestamp": "2025-11-07T15:06:20.688Z"
}
```

<a id="error-response"></a>
### Error Response
```json
{
  "success": false,
  "message": "Course not found",
  "error": {
    "code": 404,
    "details": "The requested course could not be found"
  },
  "timestamp": "2025-11-07T15:06:20.688Z"
}
```
---
