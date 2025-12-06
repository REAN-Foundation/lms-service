
import json
from dataclasses import asdict
from typing import Dict
from faker import Faker
from lmsservice_db.api.course_contents.course_contents_model import CourseContentCreateModel, CourseContentSearchParams, CourseContentUpdateModel

class CourseContent:
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

    def create_course_contents(self, data: Dict):
        validated_data = self.validate_dataclass(data, CourseContentCreateModel)
        endpoint = "course_contents"
        return self.client.make_request('POST', endpoint, data=asdict(validated_data))

    def get_course_contents_by_id(self, course_contents_id: str):
        if not isinstance(course_contents_id, str):
            raise TypeError(f"Expected 'course_contents_id' to be a string, got {type(course_contents_id).__name__}.")
        endpoint = f'course_contents/{course_contents_id}'
        return self.client.make_request('GET', endpoint)

    def search_course_contents(self, query_params: Dict):
        validated_data = self.validate_dataclass(query_params, CourseContentSearchParams)
        endpoint = 'course_contents/search'
        return self.client.make_request('GET', endpoint, data=asdict(validated_data))

    def update_course_contents(self, course_contents_id: str, data: Dict):
        if not isinstance(course_contents_id, str):
            raise TypeError(f"Expected 'course_contents_id' to be a string, got {type(course_contents_id).__name__}.")
        validated_data = self.validate_dataclass(data, CourseContentUpdateModel)
        endpoint = f'course_contents/{course_contents_id}'
        return self.client.make_request('PUT', endpoint, data=asdict(validated_data))

    def delete_course_contents(self, course_contents_id: str):
        if not isinstance(course_contents_id, str):
            raise TypeError(f"Expected 'course_contents_id' to be a string, got {type(course_contents_id).__name__}.")
        endpoint = f'course_contents/{course_contents_id}'
        return self.client.make_request('DELETE', endpoint)

    @staticmethod
    async def execute_course_contents_operations(client):
        faker = Faker()

        course_contents_create_data = {
                        "Title": faker.Lorem.Sentence(3),
            "Description": faker.Lorem.Words(2, 10),
            "ImageUrl": faker.Internet.Url(),
            "DurationInMins": faker.Random.Int(1, 10000),
            "ContentType": "Audio",
            "ResourceLink": faker.Lorem.Sentence(3),
            "ActionTemplateId": "{{ACTION_TEMPLATE_ID}}",
            "Sequence": faker.Random.Int(1, 10000),
        }

        course_contents_update_data = {
                        "Title": faker.Lorem.Sentence(3),
            "Description": faker.Lorem.Words(2, 10),
            "ImageUrl": faker.Internet.Url(),
            "DurationInMins": faker.Random.Int(1, 10000),
            "ContentType": "Audio",
            "ResourceLink": faker.Lorem.Sentence(3),
            "ActionTemplateId": "{{ACTION_TEMPLATE_ID}}",
            "Sequence": faker.Random.Int(1, 10000),
        }

        search_params = {
                        "Title": faker.Lorem.Sentence(3),
            "Description": faker.Lorem.Words(2, 10),
            "ImageUrl": faker.Internet.Url(),
            "DurationInMins": faker.Random.Int(1, 10000),
            "ContentType": "Audio",
            "ResourceLink": faker.Lorem.Sentence(3),
            "ActionTemplateId": "{{ACTION_TEMPLATE_ID}}",
            "Sequence": faker.Random.Int(1, 10000),
        }

        new_user = client.course_contents.create_course_contents(course_contents_create_data)
        print('Create:', json.dumps(new_user, indent=2))
        print("\n")

        course_contents_id = new_user['Data']['id']
        user = client.course_contents.get_course_contents_by_id(course_contents_id)
        print('GetById:', json.dumps(user, indent=2))
        print("\n")

        search_results = client.course_contents.search_course_contents(search_params)
        print('Search:', json.dumps(search_results, indent=2))
        print("\n")

        updated_user = client.course_contents.update_course_contents(course_contents_id, course_contents_update_data)
        print('Update:', json.dumps(updated_user, indent=2))
        print("\n")

        deleted_user = client.course_contents.delete_course_contents(course_contents_id)
        print('Delete:', json.dumps(deleted_user, indent=2))
        print("\n")

