# Certificates Documentation
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
```dotnet
var newData = { /* "UserId": "{{USER_ID}}",
"CertificateNumber": faker.Lorem.Sentence(3),
"CertificateName": faker.Name.FullName(),
"CertificateType": faker.Lorem.Sentence(3),
"IssuedDate": faker.Lorem.Sentence(3),
"ExpiryDate": faker.Date.Past(),
"CertificateUrl": faker.Internet.Url(),
"FinalGrade": faker.Random.Float(1, 100),
"CreditHours": faker.Random.Int(1, 10000),
"Skills": faker.Lorem.Sentence(3),
"IsVerified": faker.Random.Bool(),
"VerificationUrl": faker.Internet.Url(),
"IssuedBy": faker.Random.Guid().ToString(),
 */ };
var response = await sdk.certificates.Create(newData);
Console.WriteLine($"Created: response.Data");

```
### Getting a certificates by ID
Use `getById` to retrieve a certificates by its ID.
**Example:**
```dotnet
var response = await sdk.certificates.GetById(certificatesId);
Console.WriteLine($"certificates Details: response.Data");

```
### Searching for certificates
Use `search` to find certificates using filters.
**Example:**
```dotnet
var queryParams = { /* "UserId": "{{USER_ID}}",
"CertificateNumber": faker.Lorem.Sentence(3),
"CertificateName": faker.Name.FullName(),
"CertificateType": faker.Lorem.Sentence(3),
"IssuedDate": faker.Lorem.Sentence(3),
"ExpiryDate": faker.Date.Past(),
"CertificateUrl": faker.Internet.Url(),
"FinalGrade": faker.Random.Float(1, 100),
"CreditHours": faker.Random.Int(1, 10000),
"Skills": faker.Lorem.Sentence(3),
"IsVerified": faker.Random.Bool(),
"VerificationUrl": faker.Internet.Url(),
"IssuedBy": faker.Random.Guid().ToString(),
 */ };
var response = await sdk.certificates.Search(queryParams);
Console.WriteLine($"Search Results: response.Data");

```
### Updating a certificates
Use `update` to modify an existing certificates.
**Example:**
```dotnet
var updatedData = { /* "UserId": "{{USER_ID}}",
"CertificateNumber": faker.Lorem.Sentence(3),
"CertificateName": faker.Name.FullName(),
"CertificateType": faker.Lorem.Sentence(3),
"IssuedDate": faker.Lorem.Sentence(3),
"ExpiryDate": faker.Date.Past(),
"CertificateUrl": faker.Internet.Url(),
"FinalGrade": faker.Random.Float(1, 100),
"CreditHours": faker.Random.Int(1, 10000),
"Skills": faker.Lorem.Sentence(3),
"IsVerified": faker.Random.Bool(),
"VerificationUrl": faker.Internet.Url(),
"IssuedBy": faker.Random.Guid().ToString(),
 */ };
var response = await sdk.certificates.Update(certificatesId, updatedData);
Console.WriteLine($"Updated: response.Data");

```
### Deleting a certificates
Use `delete` to remove a certificates by its ID.
**Example:**
```dotnet
var response = await sdk.certificates.Delete(certificatesId);
Console.WriteLine($"certificates Deleted: response");

```
