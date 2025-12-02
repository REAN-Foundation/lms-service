# CourseModule Module Documentation

<a id="module-description"></a>
## 📋 Module Description

The CourseModule module manages coursemodule functionality in the application.

It handles coursemodule creation, retrieval, updates, and deletion operations.


Each coursemodule contains information about name, description, imageurl, durationinmins, sequence


<a id="files"></a>
## 📂 Files

| Sr.No | File Type | File Path | Description |
|-------|-----------|-----------|-------------|
| 1 | Controller | [`src/api/course.module/course.module.controller.ts`](../src/api/course.module/course.module.controller.ts) | Main controller handling coursemodule endpoints |
| 2 | Routes | [`src/api/course.module/course.module.routes.ts`](../src/api/course.module/course.module.routes.ts) | API route definitions for coursemodule |
| 3 | Service | [`src/database/typeorm/services/course.module.service.ts`](../src/database/typeorm/services/course.module.service.ts) | Business logic for coursemodule operations |
| 4 | Entity | [`src/database/typeorm/models/course.module.entity.ts`](../src/database/typeorm/models/course.module.entity.ts) | CourseModule entity definition |

**Base Route**: `/api/v1/course-modules`

<a id="database-schema"></a>
## 🗄️ Database Schema

<a id="database-table-structure"></a>
### Database Table Structure

```sql
CREATE TABLE course_modules (
    Name VARCHAR(255) NOT NULL,
    Description VARCHAR(255) NOT NULL,
    ImageUrl VARCHAR(255) NOT NULL,
    DurationInMins INT NOT NULL,
    Sequence INT NOT NULL
);
```

<a id="domain-types"></a>
## 📝 Domain Types
You can find the domain types in the following file:
[`CourseModule domain types - Create & Update models, Search filters`](../src/domain.types/course.module.performance.types.ts)

<a id="api-endpoints"></a>
## 📊 API Endpoints

| Method | Endpoint | Description | Authentication | Authorization | Request Body |
|--------|----------|-------------|----------------|---------------|--------------|
| POST | `/api/v1/course-modules/create` | Create a new coursemodule | Yes | Public | CreateCourseModuleDto |
| GET | `/api/v1/course-modules/search` | Search/filter coursemodules | Yes | Public | - |
| GET | `/api/v1/course-modules/:id` | Get coursemodule by ID | Yes | Public | - |
| PUT | `/api/v1/course-modules/:id` | Update coursemodule | Yes | Public | UpdateCourseModuleDto |
| DELETE | `/api/v1/course-modules/:id` | Delete coursemodule | Yes | Authenticated | - |

<a id="response-examples"></a>
## 🔄 Response Examples

<a id="successful-coursemodule-creation"></a>
### Successful CourseModule Creation
```json
{
  "success": true,
  "message": "CourseModule created successfully.",
  "data": {
    "CourseModule": {
      "Name": "Example Name",
      "Description": "This is an example description",
      "ImageUrl": "https://example.com",
      "DurationInMins": 123,
      "Sequence": 123
    }
  },
  "timestamp": "2025-11-07T15:06:20.679Z"
}
```

<a id="error-response"></a>
### Error Response
```json
{
  "success": false,
  "message": "CourseModule not found",
  "error": {
    "code": 404,
    "details": "The requested coursemodule could not be found"
  },
  "timestamp": "2025-11-07T15:06:20.679Z"
}
```
---
