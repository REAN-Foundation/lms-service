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
```python
new_data = { "UserId": "{{USER_ID}}",
"CertificateNumber": faker.Lorem.Sentence(3),
"CertificateName": faker.Person.FullName(),
"CertificateType": faker.Lorem.Sentence(3),
"IssuedDate": faker.Lorem.Sentence(3),
"ExpiryDate": faker.Date.Past().ToString("yyyy-MM-ddTHH:mm:ss"),
"CertificateUrl": faker.Internet.Url(),
"FinalGrade": faker.Random.Float(1, 100),
"CreditHours": faker.Random.Int(1, 10000),
"Skills": faker.Lorem.Sentence(3),
"IsVerified": faker.Random.Bool(),
"VerificationUrl": faker.Internet.Url(),
"IssuedBy": faker.Random.Guid(),
 }
response = await sdk.certificates.create(new_data)
print(f"Created: {response.data}")


```
### Getting a certificates by ID
Use `getById` to retrieve a certificates by its ID.
**Example:**
```python
response = await sdk.certificates.get_by_id(certificates_id)
print(f"certificates Details: {response.data}")


```
### Searching for certificates
Use `search` to find certificates using filters.
**Example:**
```python
query_params = { "UserId": "{{USER_ID}}",
"CertificateNumber": faker.Lorem.Sentence(3),
"CertificateName": faker.Person.FullName(),
"CertificateType": faker.Lorem.Sentence(3),
"IssuedDate": faker.Lorem.Sentence(3),
"ExpiryDate": faker.Date.Past().ToString("yyyy-MM-ddTHH:mm:ss"),
"CertificateUrl": faker.Internet.Url(),
"FinalGrade": faker.Random.Float(1, 100),
"CreditHours": faker.Random.Int(1, 10000),
"Skills": faker.Lorem.Sentence(3),
"IsVerified": faker.Random.Bool(),
"VerificationUrl": faker.Internet.Url(),
"IssuedBy": faker.Random.Guid(),
 }
response = await sdk.certificates.search(query_params)
print(f"Search Results: {response.data}")


```
### Updating a certificates
Use `update` to modify an existing certificates.
**Example:**
```python
updated_data = { "UserId": "{{USER_ID}}",
"CertificateNumber": faker.Lorem.Sentence(3),
"CertificateName": faker.Person.FullName(),
"CertificateType": faker.Lorem.Sentence(3),
"IssuedDate": faker.Lorem.Sentence(3),
"ExpiryDate": faker.Date.Past().ToString("yyyy-MM-ddTHH:mm:ss"),
"CertificateUrl": faker.Internet.Url(),
"FinalGrade": faker.Random.Float(1, 100),
"CreditHours": faker.Random.Int(1, 10000),
"Skills": faker.Lorem.Sentence(3),
"IsVerified": faker.Random.Bool(),
"VerificationUrl": faker.Internet.Url(),
"IssuedBy": faker.Random.Guid(),
 }
response = await sdk.certificates.update(certificates_id, updated_data)
print(f"Updated: {response.data}")


```
### Deleting a certificates
Use `delete` to remove a certificates by its ID.
**Example:**
```python
response = await sdk.certificates.delete(certificates_id)
print(f"certificates Deleted: {response}")


```
