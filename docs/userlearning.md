# UserLearning Module Documentation

<a id="module-description"></a>
## 📋 Module Description

The UserLearning module manages userlearning functionality in the application.

It handles userlearning creation, retrieval, updates, and deletion operations.


Each userlearning contains information about userid, actionid, progressstatus, percentagecompletion


<a id="files"></a>
## 📂 Files

| Sr.No | File Type | File Path | Description |
|-------|-----------|-----------|-------------|
| 1 | Controller | [`src/api/user.learning/user.learning.controller.ts`](../src/api/user.learning/user.learning.controller.ts) | Main controller handling userlearning endpoints |
| 2 | Routes | [`src/api/user.learning/user.learning.routes.ts`](../src/api/user.learning/user.learning.routes.ts) | API route definitions for userlearning |
| 3 | Service | [`src/database/typeorm/services/user.learning.service.ts`](../src/database/typeorm/services/user.learning.service.ts) | Business logic for userlearning operations |
| 4 | Entity | [`src/database/typeorm/models/user.learning.entity.ts`](../src/database/typeorm/models/user.learning.entity.ts) | UserLearning entity definition |

**Base Route**: `/api/v1/user-learnings`

<a id="database-schema"></a>
## 🗄️ Database Schema

<a id="database-table-structure"></a>
### Database Table Structure

```sql
CREATE TABLE user_learnings (
    UserId VARCHAR(36) NOT NULL,
    ActionId VARCHAR(36) NOT NULL,
    ProgressStatus VARCHAR(50) NOT NULL,
    PercentageCompletion INT NOT NULL,
    FOREIGN KEY (UserId) REFERENCES User(id),
    FOREIGN KEY (ActionId) REFERENCES Action(id)
);
```

<a id="domain-types"></a>
## 📝 Domain Types
You can find the domain types in the following file:
[`UserLearning domain types - Create & Update models, Search filters`](../src/domain.types/user.learning.performance.types.ts)

<a id="api-endpoints"></a>
## 📊 API Endpoints

| Method | Endpoint | Description | Authentication | Authorization | Request Body |
|--------|----------|-------------|----------------|---------------|--------------|
| POST | `/api/v1/user-learnings/create` | Create a new userlearning | Yes | Public | CreateUserLearningDto |
| GET | `/api/v1/user-learnings/search` | Search/filter userlearnings | Yes | Public | - |
| GET | `/api/v1/user-learnings/:id` | Get userlearning by ID | Yes | Public | - |
| PUT | `/api/v1/user-learnings/:id` | Update userlearning | Yes | Public | UpdateUserLearningDto |
| DELETE | `/api/v1/user-learnings/:id` | Delete userlearning | Yes | Authenticated | - |

<a id="response-examples"></a>
## 🔄 Response Examples

<a id="successful-userlearning-creation"></a>
### Successful UserLearning Creation
```json
{
  "success": true,
  "message": "UserLearning created successfully.",
  "data": {
    "UserLearning": {
      "UserId": "550e8400-e29b-41d4-a716-446655440000",
      "ActionId": "550e8400-e29b-41d4-a716-446655440000",
      "ProgressStatus": "Pending",
      "PercentageCompletion": 123
    }
  },
  "timestamp": "2025-11-07T15:06:20.747Z"
}
```

<a id="error-response"></a>
### Error Response
```json
{
  "success": false,
  "message": "UserLearning not found",
  "error": {
    "code": 404,
    "details": "The requested userlearning could not be found"
  },
  "timestamp": "2025-11-07T15:06:20.747Z"
}
```
---
