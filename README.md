# LMS Service
Learning Management System Service

## Overview
This service provides Learning Management System (LMS) functionality including courses, learning paths, course modules, course content, user learning progress tracking, and certificates.

## Authentication
The LMS service uses JWT-based authentication and validates user tokens by calling the **reancare service**. This means:

- The LMS service requires the reancare service to be running and accessible
- Each authenticated request validates the user token against the reancare service
- If the reancare service is not running or unreachable, authentication will fail

### Required Environment Variables for Authentication

```bash
# JWT Secrets (must match reancare service)
USER_ACCESS_TOKEN_SECRET=your-user-access-token-secret-key
USER_REFRESH_TOKEN_SECRET=your-user-refresh-token-secret-key

# Reancare Service Connection (REQUIRED)
REANCARE_BACKEND_BASE_URL=http://localhost:5000/api/v1
REANCARE_API_KEY=your-reancare-api-key
```

## Database Configuration

```bash
DATABASE_DIALECT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=lms_db
DATABASE_USERNAME=your_db_username
DATABASE_PASSWORD=your_db_password
```

## Installation

```bash
npm install
```

## Running the Service

```bash
# Development
npm start

# Build
npm run build
```

## API Endpoints

### Course Management
- `POST /api/v1/courses` - Create a course
- `GET /api/v1/courses/search` - Search courses
- `GET /api/v1/courses/:id` - Get course by ID
- `PUT /api/v1/courses/:id` - Update course
- `DELETE /api/v1/courses/:id` - Delete course

### Course Module Management
- `POST /api/v1/course-modules` - Create a course module
- `GET /api/v1/course-modules/search` - Search course modules
- `GET /api/v1/course-modules/:id` - Get course module by ID
- `PUT /api/v1/course-modules/:id` - Update course module
- `DELETE /api/v1/course-modules/:id` - Delete course module

### Course Content Management
- `POST /api/v1/course-contents` - Create course content
- `GET /api/v1/course-contents/search` - Search course contents
- `GET /api/v1/course-contents/:id` - Get course content by ID
- `GET /api/v1/course-contents/by-course/:courseId` - Get contents for a course
- `PUT /api/v1/course-contents/:id` - Update course content
- `DELETE /api/v1/course-contents/:id` - Delete course content

### Learning Path Management
- `POST /api/v1/learning-paths` - Create a learning path
- `GET /api/v1/learning-paths/search` - Search learning paths
- `GET /api/v1/learning-paths/:id` - Get learning path by ID
- `PUT /api/v1/learning-paths/:id` - Update learning path
- `DELETE /api/v1/learning-paths/:id` - Delete learning path

### Learning Path Courses (Junction)
- `POST /api/v1/learning-path-courses` - Add course to learning path
- `GET /api/v1/learning-path-courses/search` - Search learning path courses
- `GET /api/v1/learning-path-courses/:id` - Get by ID
- `PUT /api/v1/learning-path-courses/:id` - Update
- `DELETE /api/v1/learning-path-courses/:id` - Remove course from learning path

### User Learning Progress
- `POST /api/v1/user-learnings` - Create user learning record
- `GET /api/v1/user-learnings/search` - Search user learning records
- `GET /api/v1/user-learnings/:id` - Get user learning by ID
- `PUT /api/v1/user-learnings/:id` - Update user learning
- `DELETE /api/v1/user-learnings/:id` - Delete user learning
- `PUT /api/v1/user-learnings/:userId/contents/:contentId` - Update user learning progress
- `GET /api/v1/user-learnings/:userId/learning-paths` - Get user's learning paths
- `GET /api/v1/user-learnings/:userId/course-contents` - Get user's course contents
- `GET /api/v1/user-learnings/:userId/learning-paths/:learningPathId/progress` - Get learning path progress
- `GET /api/v1/user-learnings/:userId/courses/:courseId/progress` - Get course progress
- `GET /api/v1/user-learnings/:userId/modules/:moduleId/progress` - Get module progress
- `GET /api/v1/user-learnings/:userId/contents/:contentId/progress` - Get content progress

### Certificates
- `POST /api/v1/certificates` - Create a certificate
- `GET /api/v1/certificates/search` - Search certificates
- `GET /api/v1/certificates/:id` - Get certificate by ID
- `PUT /api/v1/certificates/:id` - Update certificate
- `DELETE /api/v1/certificates/:id` - Delete certificate

## Architecture

### Data Model Hierarchy
```
LearningPath
  └── Courses (via LearningPathCourses junction table)
       └── CourseModules
            └── CourseContents
```

### Key Features
- **Learning Paths**: Organize multiple courses into structured learning paths
- **Courses**: Individual courses with metadata (name, description, duration, etc.)
- **Course Modules**: Break down courses into logical modules
- **Course Contents**: Individual learning content items (videos, articles, assessments, etc.)
- **User Learning**: Track user progress through courses, modules, and content
- **Certificates**: Issue certificates upon course/learning path completion
- **Multi-tenant Support**: TenantId support for multi-organization deployments

## Dependencies
- **Node.js**: >= 16.x
- **TypeScript**: >= 5.x
- **PostgreSQL**: >= 14.x (or MySQL/SQLite)
- **Reancare Service**: Must be running and accessible for authentication

## License
ISC
