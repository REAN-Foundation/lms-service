
import json
from dataclasses import asdict
from typing import Dict
from faker import Faker
from lmsservice_db.api.certificates.certificates_model import CertificatesCreateModel, CertificatesSearchParams, CertificatesUpdateModel

class Certificates:
    def __init__(self, client):
        self.client = client
        self.faker = Faker()

    def validate_dataclass(self, data: Dict, dataclass_type):
        """
        Validates the input data against the specified dataclass type.
        """
        try:
            instance = dataclass_type(**data)
            return instance
        except TypeError as e:
            raise ValueError(f"Validation failed: {e}")

    def create_certificates(self, data: Dict):
        validated_data = self.validate_dataclass(data, CertificatesCreateModel)
        endpoint = "certificates"
        return self.client.make_request('POST', endpoint, data=asdict(validated_data))

    def get_certificates_by_id(self, certificates_id: str):
        if not isinstance(certificates_id, str):
            raise TypeError(f"Expected 'certificates_id' to be a string, got {type(certificates_id).__name__}.")
        endpoint = f'certificates/{certificates_id}'
        return self.client.make_request('GET', endpoint)

    def search_certificates(self, query_params: Dict):
        validated_data = self.validate_dataclass(query_params, CertificatesSearchParams)
        endpoint = 'certificates/search'
        return self.client.make_request('GET', endpoint, data=asdict(validated_data))

    def update_certificates(self, certificates_id: str, data: Dict):
        if not isinstance(certificates_id, str):
            raise TypeError(f"Expected 'certificates_id' to be a string, got {type(certificates_id).__name__}.")
        validated_data = self.validate_dataclass(data, CertificatesUpdateModel)
        endpoint = f'certificates/{certificates_id}'
        return self.client.make_request('PUT', endpoint, data=asdict(validated_data))

    def delete_certificates(self, certificates_id: str):
        if not isinstance(certificates_id, str):
            raise TypeError(f"Expected 'certificates_id' to be a string, got {type(certificates_id).__name__}.")
        endpoint = f'certificates/{certificates_id}'
        return self.client.make_request('DELETE', endpoint)

    @staticmethod
    async def execute_certificates_operations(client):
        faker = Faker()

        certificates_create_data = {
                        "UserId": "{{USER_ID}}",
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

        certificates_update_data = {
                        "UserId": "{{USER_ID}}",
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

        search_params = {
                        "UserId": "{{USER_ID}}",
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

        new_user = client.certificates.create_certificates(certificates_create_data)
        print('Create:', json.dumps(new_user, indent=2))
        print("\n")

        certificates_id = new_user['Data']['id']
        user = client.certificates.get_certificates_by_id(certificates_id)
        print('GetById:', json.dumps(user, indent=2))
        print("\n")

        search_results = client.certificates.search_certificates(search_params)
        print('Search:', json.dumps(search_results, indent=2))
        print("\n")

        updated_user = client.certificates.update_certificates(certificates_id, certificates_update_data)
        print('Update:', json.dumps(updated_user, indent=2))
        print("\n")

        deleted_user = client.certificates.delete_certificates(certificates_id)
        print('Delete:', json.dumps(deleted_user, indent=2))
        print("\n")

