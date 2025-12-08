# LearningPath Module Documentation

<a id="module-description"></a>
## 📋 Module Description

The LearningPath module manages learningpath functionality in the application.

It handles learningpath creation, retrieval, updates, and deletion operations.


Each learningpath contains information about tenantid, name, description, imageurl, durationindays


<a id="files"></a>
## 📂 Files

| Sr.No | File Type | File Path | Description |
|-------|-----------|-----------|-------------|
| 1 | Controller | [`src/api/learning.path/learning.path.controller.ts`](../src/api/learning.path/learning.path.controller.ts) | Main controller handling learningpath endpoints |
| 2 | Routes | [`src/api/learning.path/learning.path.routes.ts`](../src/api/learning.path/learning.path.routes.ts) | API route definitions for learningpath |
| 3 | Service | [`src/database/typeorm/services/learning.path.service.ts`](../src/database/typeorm/services/learning.path.service.ts) | Business logic for learningpath operations |
| 4 | Entity | [`src/database/typeorm/models/learning.path.entity.ts`](../src/database/typeorm/models/learning.path.entity.ts) | LearningPath entity definition |

**Base Route**: `/api/v1/learning-paths`

<a id="database-schema"></a>
## 🗄️ Database Schema

<a id="database-table-structure"></a>
### Database Table Structure

```sql
CREATE TABLE learning_paths (
    TenantId VARCHAR(36) NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Description VARCHAR(255) NOT NULL,
    ImageUrl VARCHAR(255) NOT NULL,
    DurationInDays INT NOT NULL,
    PreferenceWeight INT NOT NULL,
    Enabled BOOLEAN NOT NULL,
    FOREIGN KEY (TenantId) REFERENCES Tenant(id)
);
```

<a id="domain-types"></a>
## 📝 Domain Types
You can find the domain types in the following file:
[`LearningPath domain types - Create & Update models, Search filters`](../src/domain.types/learning.path.performance.types.ts)

<a id="api-endpoints"></a>
## 📊 API Endpoints

| Method | Endpoint | Description | Authentication | Authorization | Request Body |
|--------|----------|-------------|----------------|---------------|--------------|
| POST | `/api/v1/learning-paths/create` | Create a new learningpath | Yes | Public | CreateLearningPathDto |
| GET | `/api/v1/learning-paths/search` | Search/filter learningpaths | Yes | Public | - |
| GET | `/api/v1/learning-paths/:id` | Get learningpath by ID | Yes | Public | - |
| PUT | `/api/v1/learning-paths/:id` | Update learningpath | Yes | Public | UpdateLearningPathDto |
| DELETE | `/api/v1/learning-paths/:id` | Delete learningpath | Yes | Authenticated | - |

<a id="response-examples"></a>
## 🔄 Response Examples

<a id="successful-learningpath-creation"></a>
### Successful LearningPath Creation
```json
{
  "success": true,
  "message": "LearningPath created successfully.",
  "data": {
    "LearningPath": {
      "TenantId": "550e8400-e29b-41d4-a716-446655440000",
      "Name": "Example Name",
      "Description": "This is an example description",
      "ImageUrl": "https://example.com",
      "DurationInDays": 123,
      "PreferenceWeight": 123,
      "Enabled": true
    }
  },
  "timestamp": "2025-11-07T15:06:20.732Z"
}
```

<a id="error-response"></a>
### Error Response
```json
{
  "success": false,
  "message": "LearningPath not found",
  "error": {
    "code": 404,
    "details": "The requested learningpath could not be found"
  },
  "timestamp": "2025-11-07T15:06:20.732Z"
}
```
---
