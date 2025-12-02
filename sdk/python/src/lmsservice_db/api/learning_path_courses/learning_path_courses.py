
import json
from dataclasses import asdict
from typing import Dict
from faker import Faker
from lmsservice_db.api.learning_path_courses.learning_path_courses_model import LearningPathCoursesCreateModel, LearningPathCoursesSearchParams, LearningPathCoursesUpdateModel

class LearningPathCourses:
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

    def create_learning_path_courses(self, data: Dict):
        validated_data = self.validate_dataclass(data, LearningPathCoursesCreateModel)
        endpoint = "learning_path_courses"
        return self.client.make_request('POST', endpoint, data=asdict(validated_data))

    def get_learning_path_courses_by_id(self, learning_path_courses_id: str):
        if not isinstance(learning_path_courses_id, str):
            raise TypeError(f"Expected 'learning_path_courses_id' to be a string, got {type(learning_path_courses_id).__name__}.")
        endpoint = f'learning_path_courses/{learning_path_courses_id}'
        return self.client.make_request('GET', endpoint)

    def search_learning_path_courses(self, query_params: Dict):
        validated_data = self.validate_dataclass(query_params, LearningPathCoursesSearchParams)
        endpoint = 'learning_path_courses/search'
        return self.client.make_request('GET', endpoint, data=asdict(validated_data))

    def update_learning_path_courses(self, learning_path_courses_id: str, data: Dict):
        if not isinstance(learning_path_courses_id, str):
            raise TypeError(f"Expected 'learning_path_courses_id' to be a string, got {type(learning_path_courses_id).__name__}.")
        validated_data = self.validate_dataclass(data, LearningPathCoursesUpdateModel)
        endpoint = f'learning_path_courses/{learning_path_courses_id}'
        return self.client.make_request('PUT', endpoint, data=asdict(validated_data))

    def delete_learning_path_courses(self, learning_path_courses_id: str):
        if not isinstance(learning_path_courses_id, str):
            raise TypeError(f"Expected 'learning_path_courses_id' to be a string, got {type(learning_path_courses_id).__name__}.")
        endpoint = f'learning_path_courses/{learning_path_courses_id}'
        return self.client.make_request('DELETE', endpoint)

    @staticmethod
    async def execute_learning_path_courses_operations(client):
        faker = Faker()

        learning_path_courses_create_data = {
            
        }

        learning_path_courses_update_data = {
            
        }

        search_params = {
            
        }

        new_user = client.learning_path_courses.create_learning_path_courses(learning_path_courses_create_data)
        print('Create:', json.dumps(new_user, indent=2))
        print("\n")

        learning_path_courses_id = new_user['Data']['id']
        user = client.learning_path_courses.get_learning_path_courses_by_id(learning_path_courses_id)
        print('GetById:', json.dumps(user, indent=2))
        print("\n")

        search_results = client.learning_path_courses.search_learning_path_courses(search_params)
        print('Search:', json.dumps(search_results, indent=2))
        print("\n")

        updated_user = client.learning_path_courses.update_learning_path_courses(learning_path_courses_id, learning_path_courses_update_data)
        print('Update:', json.dumps(updated_user, indent=2))
        print("\n")

        deleted_user = client.learning_path_courses.delete_learning_path_courses(learning_path_courses_id)
        print('Delete:', json.dumps(deleted_user, indent=2))
        print("\n")

