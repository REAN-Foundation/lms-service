# Learning Enrollment Module

## 📋 Overview

The learning enrollment workflow lets a learner enroll into a single course or an entire learning path, mirroring the careplan enrollment experience in the Reancare service. Enrollments keep track of the user, the target (course or learning path), active window, and status so that client apps can show “started/active/completed” journeys.

**Base Route:** `/api/v1/learning-enrollments`

## 📂 Key Files

| Type | File | Description |
|------|------|-------------|
| Entity | [`src/database/typeorm/models/learning.enrollment.entity.ts`](../src/database/typeorm/models/learning.enrollment.entity.ts) | TypeORM model defining `learning_enrollments` table |
| Service | [`src/database/typeorm/services/learning.enrollment.service.ts`](../src/database/typeorm/services/learning.enrollment.service.ts) | Business logic for enrolling, stopping, and listing enrollments |
| Controller | [`src/api/learning.enrollment/learning.enrollment.controller.ts`](../src/api/learning.enrollment/learning.enrollment.controller.ts) | HTTP handlers for enrollment endpoints |
| Routes | [`src/api/learning.enrollment/learning.enrollment.routes.ts`](../src/api/learning.enrollment/learning.enrollment.routes.ts) | Express route registration |
| Validator | [`src/api/learning.enrollment/learning.enrollment.validator.ts`](../src/api/learning.enrollment/learning.enrollment.validator.ts) | Joi based request validation |
| Domain Types | [`src/domain.types/learning.enrollment.types.ts`](../src/domain.types/learning.enrollment.types.ts) | Create/update/search DTO contracts |

## 🗄️ Table Snapshot

```
learning_enrollments
    id (uuid, pk)
    UserId (uuid, required)
    CourseId (uuid, nullable)
    LearningPathId (uuid, nullable)
    TenantId (uuid, nullable)
    ProgressStatus (enum ProgressStatus, default Pending)
    IsActive (boolean, default true)
    StartDate, EndDate, CompletedAt (timestamp, nullable)
    CreatedAt / UpdatedAt / DeletedAt
```

At least one of `CourseId` or `LearningPathId` must be supplied. When an enrollment is stopped the record is kept but marked inactive and timestamped.

## 📊 Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/:userId/enroll` | Enroll a user into a course or learning path |
| GET | `/search` | Admin search with paging/filtering |
| GET | `/users/:userId/enrollments` | List every enrollment for a user (pass `?includeInactive=false` to limit to actives) |
| GET | `/users/:userId/active-enrollments` | Convenience route for active enrollments only |
| POST | `/:id/stop` | Stop/cancel an enrollment (optionally pass `ProgressStatus`) |
| GET | `/:id` | Fetch a single enrollment record with course/learning-path details |
| DELETE | `/:id` | Hard-delete an enrollment |

### Sample Enroll Request

```json
POST /api/v1/learning-enrollments/users/1d2b.../enroll
{
  "CourseId": "f46c...",
  "StartDate": "2025-01-01T00:00:00.000Z",
  "ProgressStatus": "InProgress"
}
```

### Sample Response

```json
{
  "success": true,
  "message": "Enrollment created successfully!",
  "data": {
    "id": "91f7...",
    "UserId": "1d2b...",
    "CourseId": "f46c...",
    "ProgressStatus": "InProgress",
    "IsActive": true,
    "StartDate": "2025-01-01T00:00:00.000Z",
    "Course": {
      "id": "f46c...",
      "Name": "Foundations of AI"
    }
  }
}
```

