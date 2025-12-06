
import json
from dataclasses import asdict
from typing import Dict
from faker import Faker
from lmsservice_db.api.user_learnings.user_learnings_model import UserLearningCreateModel, UserLearningSearchParams, UserLearningUpdateModel

class UserLearning:
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

    def create_user_learnings(self, data: Dict):
        validated_data = self.validate_dataclass(data, UserLearningCreateModel)
        endpoint = "user_learnings"
        return self.client.make_request('POST', endpoint, data=asdict(validated_data))

    def get_user_learnings_by_id(self, user_learnings_id: str):
        if not isinstance(user_learnings_id, str):
            raise TypeError(f"Expected 'user_learnings_id' to be a string, got {type(user_learnings_id).__name__}.")
        endpoint = f'user_learnings/{user_learnings_id}'
        return self.client.make_request('GET', endpoint)

    def search_user_learnings(self, query_params: Dict):
        validated_data = self.validate_dataclass(query_params, UserLearningSearchParams)
        endpoint = 'user_learnings/search'
        return self.client.make_request('GET', endpoint, data=asdict(validated_data))

    def update_user_learnings(self, user_learnings_id: str, data: Dict):
        if not isinstance(user_learnings_id, str):
            raise TypeError(f"Expected 'user_learnings_id' to be a string, got {type(user_learnings_id).__name__}.")
        validated_data = self.validate_dataclass(data, UserLearningUpdateModel)
        endpoint = f'user_learnings/{user_learnings_id}'
        return self.client.make_request('PUT', endpoint, data=asdict(validated_data))

    def delete_user_learnings(self, user_learnings_id: str):
        if not isinstance(user_learnings_id, str):
            raise TypeError(f"Expected 'user_learnings_id' to be a string, got {type(user_learnings_id).__name__}.")
        endpoint = f'user_learnings/{user_learnings_id}'
        return self.client.make_request('DELETE', endpoint)

    @staticmethod
    async def execute_user_learnings_operations(client):
        faker = Faker()

        user_learnings_create_data = {
                        "UserId": "{{USER_ID}}",
            "ActionId": "{{ACTION_ID}}",
            "ProgressStatus": "Pending",
            "PercentageCompletion": faker.Random.Int(1, 10000),
        }

        user_learnings_update_data = {
                        "UserId": "{{USER_ID}}",
            "ActionId": "{{ACTION_ID}}",
            "ProgressStatus": "Pending",
            "PercentageCompletion": faker.Random.Int(1, 10000),
        }

        search_params = {
                        "UserId": "{{USER_ID}}",
            "ActionId": "{{ACTION_ID}}",
            "ProgressStatus": "Pending",
            "PercentageCompletion": faker.Random.Int(1, 10000),
        }

        new_user = client.user_learnings.create_user_learnings(user_learnings_create_data)
        print('Create:', json.dumps(new_user, indent=2))
        print("\n")

        user_learnings_id = new_user['Data']['id']
        user = client.user_learnings.get_user_learnings_by_id(user_learnings_id)
        print('GetById:', json.dumps(user, indent=2))
        print("\n")

        search_results = client.user_learnings.search_user_learnings(search_params)
        print('Search:', json.dumps(search_results, indent=2))
        print("\n")

        updated_user = client.user_learnings.update_user_learnings(user_learnings_id, user_learnings_update_data)
        print('Update:', json.dumps(updated_user, indent=2))
        print("\n")

        deleted_user = client.user_learnings.delete_user_learnings(user_learnings_id)
        print('Delete:', json.dumps(deleted_user, indent=2))
        print("\n")

