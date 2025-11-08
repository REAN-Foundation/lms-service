# CourseContent Module Documentation

<a id="module-description"></a>
## 📋 Module Description

The CourseContent module manages coursecontent functionality in the application.

It handles coursecontent creation, retrieval, updates, and deletion operations.


Each coursecontent contains information about title, description, imageurl, durationinmins, contenttype


<a id="files"></a>
## 📂 Files

| Sr.No | File Type | File Path | Description |
|-------|-----------|-----------|-------------|
| 1 | Controller | [`src/api/course.content/course.content.controller.ts`](../src/api/course.content/course.content.controller.ts) | Main controller handling coursecontent endpoints |
| 2 | Routes | [`src/api/course.content/course.content.routes.ts`](../src/api/course.content/course.content.routes.ts) | API route definitions for coursecontent |
| 3 | Service | [`src/database/typeorm/services/course.content.service.ts`](../src/database/typeorm/services/course.content.service.ts) | Business logic for coursecontent operations |
| 4 | Entity | [`src/database/typeorm/models/course.content.entity.ts`](../src/database/typeorm/models/course.content.entity.ts) | CourseContent entity definition |

**Base Route**: `/api/v1/course-contents`

<a id="database-schema"></a>
## 🗄️ Database Schema

<a id="database-table-structure"></a>
### Database Table Structure

```sql
CREATE TABLE course_contents (
    Title VARCHAR(255) NOT NULL,
    Description VARCHAR(255) NOT NULL,
    ImageUrl VARCHAR(255) NOT NULL,
    DurationInMins INT NOT NULL,
    ContentType VARCHAR(50) NOT NULL,
    ResourceLink VARCHAR(255) NOT NULL,
    ActionTemplateId VARCHAR(36) NOT NULL,
    Sequence INT NOT NULL,
    FOREIGN KEY (ActionTemplateId) REFERENCES ActionTemplate(id)
);
```

<a id="domain-types"></a>
## 📝 Domain Types
You can find the domain types in the following file:
[`CourseContent domain types - Create & Update models, Search filters`](../src/domain.types/course.content.performance.types.ts)

<a id="api-endpoints"></a>
## 📊 API Endpoints

| Method | Endpoint | Description | Authentication | Authorization | Request Body |
|--------|----------|-------------|----------------|---------------|--------------|
| POST | `/api/v1/course-contents/create` | Create a new coursecontent | Yes | Public | CreateCourseContentDto |
| GET | `/api/v1/course-contents/search` | Search/filter coursecontents | Yes | Public | - |
| GET | `/api/v1/course-contents/:id` | Get coursecontent by ID | Yes | Public | - |
| PUT | `/api/v1/course-contents/:id` | Update coursecontent | Yes | Public | UpdateCourseContentDto |
| DELETE | `/api/v1/course-contents/:id` | Delete coursecontent | Yes | Authenticated | - |

<a id="response-examples"></a>
## 🔄 Response Examples

<a id="successful-coursecontent-creation"></a>
### Successful CourseContent Creation
```json
{
  "success": true,
  "message": "CourseContent created successfully.",
  "data": {
    "CourseContent": {
      "Title": "example-value",
      "Description": "This is an example description",
      "ImageUrl": "https://example.com",
      "DurationInMins": 123,
      "ContentType": "Video",
      "ResourceLink": "https://example.com",
      "ActionTemplateId": "550e8400-e29b-41d4-a716-446655440000",
      "Sequence": 123
    }
  },
  "timestamp": "2025-11-07T15:06:20.682Z"
}
```

<a id="error-response"></a>
### Error Response
```json
{
  "success": false,
  "message": "CourseContent not found",
  "error": {
    "code": 404,
    "details": "The requested coursecontent could not be found"
  },
  "timestamp": "2025-11-07T15:06:20.682Z"
}
```
---
