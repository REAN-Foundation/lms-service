# Certificates Module Documentation

<a id="module-description"></a>
## 📋 Module Description

The Certificates module manages certificates functionality in the application.

It handles certificates creation, retrieval, updates, and deletion operations.


Each certificates contains information about userid, certificatenumber, certificatename, certificatetype, issueddate


<a id="files"></a>
## 📂 Files

| Sr.No | File Type | File Path | Description |
|-------|-----------|-----------|-------------|
| 1 | Controller | [`src/api/certificates/certificates.controller.ts`](../src/api/certificates/certificates.controller.ts) | Main controller handling certificates endpoints |
| 2 | Routes | [`src/api/certificates/certificates.routes.ts`](../src/api/certificates/certificates.routes.ts) | API route definitions for certificates |
| 3 | Service | [`src/database/typeorm/services/certificates.service.ts`](../src/database/typeorm/services/certificates.service.ts) | Business logic for certificates operations |
| 4 | Entity | [`src/database/typeorm/models/certificates.entity.ts`](../src/database/typeorm/models/certificates.entity.ts) | Certificates entity definition |

**Base Route**: `/api/v1/certificates`

<a id="database-schema"></a>
## 🗄️ Database Schema

<a id="database-table-structure"></a>
### Database Table Structure

```sql
CREATE TABLE certificates (
    UserId VARCHAR(36) NOT NULL,
    CertificateNumber VARCHAR(255) NOT NULL,
    CertificateName VARCHAR(255) NOT NULL,
    CertificateType VARCHAR(255) NOT NULL,
    IssuedDate VARCHAR(255) NOT NULL,
    ExpiryDate DATETIME NOT NULL,
    CertificateUrl VARCHAR(255) NOT NULL,
    FinalGrade FLOAT NOT NULL,
    CreditHours INT NOT NULL,
    Skills VARCHAR(255) NOT NULL,
    IsVerified BOOLEAN NOT NULL,
    VerificationUrl VARCHAR(255) NOT NULL,
    IssuedBy VARCHAR(36) NOT NULL,
    FOREIGN KEY (UserId) REFERENCES User(id)
);
```

<a id="domain-types"></a>
## 📝 Domain Types
You can find the domain types in the following file:
[`Certificates domain types - Create & Update models, Search filters`](../src/domain.types/certificates.performance.types.ts)

<a id="api-endpoints"></a>
## 📊 API Endpoints

| Method | Endpoint | Description | Authentication | Authorization | Request Body |
|--------|----------|-------------|----------------|---------------|--------------|
| POST | `/api/v1/certificates/create` | Create a new certificates | Yes | Public | CreateCertificatesDto |
| GET | `/api/v1/certificates/search` | Search/filter certificatess | Yes | Public | - |
| GET | `/api/v1/certificates/:id` | Get certificates by ID | Yes | Public | - |
| PUT | `/api/v1/certificates/:id` | Update certificates | Yes | Public | UpdateCertificatesDto |
| DELETE | `/api/v1/certificates/:id` | Delete certificates | Yes | Authenticated | - |

<a id="response-examples"></a>
## 🔄 Response Examples

<a id="successful-certificates-creation"></a>
### Successful Certificates Creation
```json
{
  "success": true,
  "message": "Certificates created successfully.",
  "data": {
    "Certificates": {
      "UserId": "550e8400-e29b-41d4-a716-446655440000",
      "CertificateNumber": "example-value",
      "CertificateName": "Example Name",
      "CertificateType": "example-value",
      "IssuedDate": "2025-11-07T15:06:20.754Z",
      "ExpiryDate": "2025-11-07T15:06:20.754Z",
      "CertificateUrl": "https://example.com",
      "FinalGrade": 123.45,
      "CreditHours": 123,
      "Skills": "example-value",
      "IsVerified": true,
      "VerificationUrl": "https://example.com",
      "IssuedBy": "550e8400-e29b-41d4-a716-446655440000"
    }
  },
  "timestamp": "2025-11-07T15:06:20.754Z"
}
```

<a id="error-response"></a>
### Error Response
```json
{
  "success": false,
  "message": "Certificates not found",
  "error": {
    "code": 404,
    "details": "The requested certificates could not be found"
  },
  "timestamp": "2025-11-07T15:06:20.754Z"
}
```
---
