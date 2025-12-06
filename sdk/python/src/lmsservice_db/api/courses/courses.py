
import json
from dataclasses import asdict
from typing import Dict
from faker import Faker
from lmsservice_db.api.courses.courses_model import CourseCreateModel, CourseSearchParams, CourseUpdateModel

class Course:
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

    def create_courses(self, data: Dict):
        validated_data = self.validate_dataclass(data, CourseCreateModel)
        endpoint = "courses"
        return self.client.make_request('POST', endpoint, data=asdict(validated_data))

    def get_courses_by_id(self, courses_id: str):
        if not isinstance(courses_id, str):
            raise TypeError(f"Expected 'courses_id' to be a string, got {type(courses_id).__name__}.")
        endpoint = f'courses/{courses_id}'
        return self.client.make_request('GET', endpoint)

    def search_courses(self, query_params: Dict):
        validated_data = self.validate_dataclass(query_params, CourseSearchParams)
        endpoint = 'courses/search'
        return self.client.make_request('GET', endpoint, data=asdict(validated_data))

    def update_courses(self, courses_id: str, data: Dict):
        if not isinstance(courses_id, str):
            raise TypeError(f"Expected 'courses_id' to be a string, got {type(courses_id).__name__}.")
        validated_data = self.validate_dataclass(data, CourseUpdateModel)
        endpoint = f'courses/{courses_id}'
        return self.client.make_request('PUT', endpoint, data=asdict(validated_data))

    def delete_courses(self, courses_id: str):
        if not isinstance(courses_id, str):
            raise TypeError(f"Expected 'courses_id' to be a string, got {type(courses_id).__name__}.")
        endpoint = f'courses/{courses_id}'
        return self.client.make_request('DELETE', endpoint)

    @staticmethod
    async def execute_courses_operations(client):
        faker = Faker()

        courses_create_data = {
                        "TenantId": "{{TENANT_ID}}",
            "Name": faker.Person.FullName(),
            "Description": faker.Lorem.Words(2, 10),
            "ImageUrl": faker.Internet.Url(),
            "DurationInDays": faker.Random.Int(1, 10000),
        }

        courses_update_data = {
                        "TenantId": "{{TENANT_ID}}",
            "Name": faker.Person.FullName(),
            "Description": faker.Lorem.Words(2, 10),
            "ImageUrl": faker.Internet.Url(),
            "DurationInDays": faker.Random.Int(1, 10000),
        }

        search_params = {
                        "TenantId": "{{TENANT_ID}}",
            "Name": faker.Person.FullName(),
            "Description": faker.Lorem.Words(2, 10),
            "ImageUrl": faker.Internet.Url(),
            "DurationInDays": faker.Random.Int(1, 10000),
        }

        new_user = client.courses.create_courses(courses_create_data)
        print('Create:', json.dumps(new_user, indent=2))
        print("\n")

        courses_id = new_user['Data']['id']
        user = client.courses.get_courses_by_id(courses_id)
        print('GetById:', json.dumps(user, indent=2))
        print("\n")

        search_results = client.courses.search_courses(search_params)
        print('Search:', json.dumps(search_results, indent=2))
        print("\n")

        updated_user = client.courses.update_courses(courses_id, courses_update_data)
        print('Update:', json.dumps(updated_user, indent=2))
        print("\n")

        deleted_user = client.courses.delete_courses(courses_id)
        print('Delete:', json.dumps(deleted_user, indent=2))
        print("\n")

