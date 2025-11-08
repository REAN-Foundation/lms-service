
import json
from dataclasses import asdict
from typing import Dict
from faker import Faker
from lmsservice_db.api.learning_paths.learning_paths_model import LearningPathCreateModel, LearningPathSearchParams, LearningPathUpdateModel

class LearningPath:
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

    def create_learning_paths(self, data: Dict):
        validated_data = self.validate_dataclass(data, LearningPathCreateModel)
        endpoint = "learning_paths"
        return self.client.make_request('POST', endpoint, data=asdict(validated_data))

    def get_learning_paths_by_id(self, learning_paths_id: str):
        if not isinstance(learning_paths_id, str):
            raise TypeError(f"Expected 'learning_paths_id' to be a string, got {type(learning_paths_id).__name__}.")
        endpoint = f'learning_paths/{learning_paths_id}'
        return self.client.make_request('GET', endpoint)

    def search_learning_paths(self, query_params: Dict):
        validated_data = self.validate_dataclass(query_params, LearningPathSearchParams)
        endpoint = 'learning_paths/search'
        return self.client.make_request('GET', endpoint, data=asdict(validated_data))

    def update_learning_paths(self, learning_paths_id: str, data: Dict):
        if not isinstance(learning_paths_id, str):
            raise TypeError(f"Expected 'learning_paths_id' to be a string, got {type(learning_paths_id).__name__}.")
        validated_data = self.validate_dataclass(data, LearningPathUpdateModel)
        endpoint = f'learning_paths/{learning_paths_id}'
        return self.client.make_request('PUT', endpoint, data=asdict(validated_data))

    def delete_learning_paths(self, learning_paths_id: str):
        if not isinstance(learning_paths_id, str):
            raise TypeError(f"Expected 'learning_paths_id' to be a string, got {type(learning_paths_id).__name__}.")
        endpoint = f'learning_paths/{learning_paths_id}'
        return self.client.make_request('DELETE', endpoint)

    @staticmethod
    async def execute_learning_paths_operations(client):
        faker = Faker()

        learning_paths_create_data = {
                        "TenantId": "{{TENANT_ID}}",
            "Name": faker.Person.FullName(),
            "Description": faker.Lorem.Words(2, 10),
            "ImageUrl": faker.Internet.Url(),
            "DurationInDays": faker.Random.Int(1, 10000),
            "PreferenceWeight": faker.Random.Int(1, 10000),
            "Enabled": faker.Random.Bool(),
        }

        learning_paths_update_data = {
                        "TenantId": "{{TENANT_ID}}",
            "Name": faker.Person.FullName(),
            "Description": faker.Lorem.Words(2, 10),
            "ImageUrl": faker.Internet.Url(),
            "DurationInDays": faker.Random.Int(1, 10000),
            "PreferenceWeight": faker.Random.Int(1, 10000),
            "Enabled": faker.Random.Bool(),
        }

        search_params = {
                        "TenantId": "{{TENANT_ID}}",
            "Name": faker.Person.FullName(),
            "Description": faker.Lorem.Words(2, 10),
            "ImageUrl": faker.Internet.Url(),
            "DurationInDays": faker.Random.Int(1, 10000),
            "PreferenceWeight": faker.Random.Int(1, 10000),
            "Enabled": faker.Random.Bool(),
        }

        new_user = client.learning_paths.create_learning_paths(learning_paths_create_data)
        print('Create:', json.dumps(new_user, indent=2))
        print("\n")

        learning_paths_id = new_user['Data']['id']
        user = client.learning_paths.get_learning_paths_by_id(learning_paths_id)
        print('GetById:', json.dumps(user, indent=2))
        print("\n")

        search_results = client.learning_paths.search_learning_paths(search_params)
        print('Search:', json.dumps(search_results, indent=2))
        print("\n")

        updated_user = client.learning_paths.update_learning_paths(learning_paths_id, learning_paths_update_data)
        print('Update:', json.dumps(updated_user, indent=2))
        print("\n")

        deleted_user = client.learning_paths.delete_learning_paths(learning_paths_id)
        print('Delete:', json.dumps(deleted_user, indent=2))
        print("\n")

