
import json
from dataclasses import asdict
from typing import Dict
from faker import Faker
from lmsservice_db.api.course_modules.course_modules_model import CourseModuleCreateModel, CourseModuleSearchParams, CourseModuleUpdateModel

class CourseModule:
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

    def create_course_modules(self, data: Dict):
        validated_data = self.validate_dataclass(data, CourseModuleCreateModel)
        endpoint = "course_modules"
        return self.client.make_request('POST', endpoint, data=asdict(validated_data))

    def get_course_modules_by_id(self, course_modules_id: str):
        if not isinstance(course_modules_id, str):
            raise TypeError(f"Expected 'course_modules_id' to be a string, got {type(course_modules_id).__name__}.")
        endpoint = f'course_modules/{course_modules_id}'
        return self.client.make_request('GET', endpoint)

    def search_course_modules(self, query_params: Dict):
        validated_data = self.validate_dataclass(query_params, CourseModuleSearchParams)
        endpoint = 'course_modules/search'
        return self.client.make_request('GET', endpoint, data=asdict(validated_data))

    def update_course_modules(self, course_modules_id: str, data: Dict):
        if not isinstance(course_modules_id, str):
            raise TypeError(f"Expected 'course_modules_id' to be a string, got {type(course_modules_id).__name__}.")
        validated_data = self.validate_dataclass(data, CourseModuleUpdateModel)
        endpoint = f'course_modules/{course_modules_id}'
        return self.client.make_request('PUT', endpoint, data=asdict(validated_data))

    def delete_course_modules(self, course_modules_id: str):
        if not isinstance(course_modules_id, str):
            raise TypeError(f"Expected 'course_modules_id' to be a string, got {type(course_modules_id).__name__}.")
        endpoint = f'course_modules/{course_modules_id}'
        return self.client.make_request('DELETE', endpoint)

    @staticmethod
    async def execute_course_modules_operations(client):
        faker = Faker()

        course_modules_create_data = {
                        "Name": faker.Person.FullName(),
            "Description": faker.Lorem.Words(2, 10),
            "ImageUrl": faker.Internet.Url(),
            "DurationInMins": faker.Random.Int(1, 10000),
            "Sequence": faker.Random.Int(1, 10000),
        }

        course_modules_update_data = {
                        "Name": faker.Person.FullName(),
            "Description": faker.Lorem.Words(2, 10),
            "ImageUrl": faker.Internet.Url(),
            "DurationInMins": faker.Random.Int(1, 10000),
            "Sequence": faker.Random.Int(1, 10000),
        }

        search_params = {
                        "Name": faker.Person.FullName(),
            "Description": faker.Lorem.Words(2, 10),
            "ImageUrl": faker.Internet.Url(),
            "DurationInMins": faker.Random.Int(1, 10000),
            "Sequence": faker.Random.Int(1, 10000),
        }

        new_user = client.course_modules.create_course_modules(course_modules_create_data)
        print('Create:', json.dumps(new_user, indent=2))
        print("\n")

        course_modules_id = new_user['Data']['id']
        user = client.course_modules.get_course_modules_by_id(course_modules_id)
        print('GetById:', json.dumps(user, indent=2))
        print("\n")

        search_results = client.course_modules.search_course_modules(search_params)
        print('Search:', json.dumps(search_results, indent=2))
        print("\n")

        updated_user = client.course_modules.update_course_modules(course_modules_id, course_modules_update_data)
        print('Update:', json.dumps(updated_user, indent=2))
        print("\n")

        deleted_user = client.course_modules.delete_course_modules(course_modules_id)
        print('Delete:', json.dumps(deleted_user, indent=2))
        print("\n")

