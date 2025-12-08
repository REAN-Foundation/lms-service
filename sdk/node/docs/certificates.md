# Certificates SDK Documentation

## Overview



### Certificates Creation Fields
| Field | Type | Description |
|---|---|---|
| `UserId` | `UUID, required` |  |
| `CertificateNumber` | `String, required` |  |
| `CertificateName` | `String, required` |  |
| `CertificateType` | `String, required` |  |
| `IssuedDate` | `String, required` |  |
| `ExpiryDate` | `DateTime, required` |  |
| `CertificateUrl` | `String, required` |  |
| `FinalGrade` | `Float, required` |  |
| `CreditHours` | `Integer, required` |  |
| `Skills` | `String, required` |  |
| `IsVerified` | `Boolean, required` |  |
| `VerificationUrl` | `String, required` |  |
| `IssuedBy` | `UUID, required` |  |


### Certificates Update Fields
| Field | Type | Description |
|---|---|---|
| `UserId` | `UUID, optional` |  |
| `CertificateNumber` | `String, optional` |  |
| `CertificateName` | `String, optional` |  |
| `CertificateType` | `String, optional` |  |
| `IssuedDate` | `String, optional` |  |
| `ExpiryDate` | `DateTime, optional` |  |
| `CertificateUrl` | `String, optional` |  |
| `FinalGrade` | `Float, optional` |  |
| `CreditHours` | `Integer, optional` |  |
| `Skills` | `String, optional` |  |
| `IsVerified` | `Boolean, optional` |  |
| `VerificationUrl` | `String, optional` |  |
| `IssuedBy` | `UUID, optional` |  |


### Certificates Search Parameters Fields
| Field | Type | Description |
|---|---|---|
| `UserId` | `UUID, optional` |  |
| `CertificateNumber` | `String, optional` |  |
| `CertificateName` | `String, optional` |  |
| `CertificateType` | `String, optional` |  |
| `IssuedDate` | `String, optional` |  |
| `ExpiryDate` | `DateTime, optional` |  |
| `CertificateUrl` | `String, optional` |  |
| `FinalGrade` | `Float, optional` |  |
| `CreditHours` | `Integer, optional` |  |
| `Skills` | `String, optional` |  |
| `IsVerified` | `Boolean, optional` |  |
| `VerificationUrl` | `String, optional` |  |
| `IssuedBy` | `UUID, optional` |  |



## How to Use certificates Methods

### Creating a certificates
Use `create` to add a new certificates.

**Example:**
```typescript
const newData = { /* "UserId": "{{USER_ID}}",
"CertificateNumber": faker.lorem.sentence(3),
"CertificateName": faker.person.fullName(),
"CertificateType": faker.lorem.sentence(3),
"IssuedDate": faker.lorem.sentence(3),
"ExpiryDate": faker.date.recent().toISOString(),
"CertificateUrl": faker.internet.url(),
"FinalGrade": faker.number.float({ min: 1, max: 100 }),
"CreditHours": faker.number.int({ max: 9999 }),
"Skills": faker.lorem.sentence(3),
"IsVerified": faker.datatype.boolean(),
"VerificationUrl": faker.internet.url(),
"IssuedBy": faker.string.uuid(),
 */ };
const response = await sdk.certificates.create(newData);
console.log('Created:', response.data);
```

### Getting a certificates by ID
Use `getById` to retrieve a certificates by its ID.

**Example:**
```typescript
const response = await sdk.certificates.getById(certificatesId);
console.log('certificates Details:', response.data);
```

### Searching for certificates
Use `search` to find certificates using filters.

**Example:**
```typescript
const queryParams = { /* "UserId": "{{USER_ID}}",
"CertificateNumber": faker.lorem.sentence(3),
"CertificateName": faker.person.fullName(),
"CertificateType": faker.lorem.sentence(3),
"IssuedDate": faker.lorem.sentence(3),
"ExpiryDate": faker.date.recent().toISOString(),
"CertificateUrl": faker.internet.url(),
"FinalGrade": faker.number.float({ min: 1, max: 100 }),
"CreditHours": faker.number.int({ max: 9999 }),
"Skills": faker.lorem.sentence(3),
"IsVerified": faker.datatype.boolean(),
"VerificationUrl": faker.internet.url(),
"IssuedBy": faker.string.uuid(),
 */ };
const response = await sdk.certificates.search(queryParams);
console.log('Search Results:', response.data);
```

### Updating a certificates
Use `update` to modify an existing certificates.

**Example:**
```typescript
const updatedData = { /* "UserId": "{{USER_ID}}",
"CertificateNumber": faker.lorem.sentence(3),
"CertificateName": faker.person.fullName(),
"CertificateType": faker.lorem.sentence(3),
"IssuedDate": faker.lorem.sentence(3),
"ExpiryDate": faker.date.recent().toISOString(),
"CertificateUrl": faker.internet.url(),
"FinalGrade": faker.number.float({ min: 1, max: 100 }),
"CreditHours": faker.number.int({ max: 9999 }),
"Skills": faker.lorem.sentence(3),
"IsVerified": faker.datatype.boolean(),
"VerificationUrl": faker.internet.url(),
"IssuedBy": faker.string.uuid(),
 */ };
const response = await sdk.certificates.update(certificatesId, updatedData);
console.log('Updated:', response.data);
```

### Deleting a certificates
Use `delete` to remove a certificates by its ID.

**Example:**
```typescript
const response = await sdk.certificates.delete(certificatesId);
console.log('certificates Deleted:', response);
```
