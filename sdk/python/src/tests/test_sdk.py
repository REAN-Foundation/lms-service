
import sys
import os
import asyncio
import json

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'src')))

from lmsservice_db import SDK, CourseModule, CourseContent, Course, LearningPathCourses, LearningPath, UserLearning, Certificates
from lmsservice_db.client import BASE_URL 

def load_config():
    config_file = os.path.join(os.path.dirname(__file__), '..', 'config.json')  
    print(f"Looking for config file at: {os.path.abspath(config_file)}") 
    if os.path.exists(config_file):
        try:
            with open(config_file, 'r', encoding='utf-8-sig') as file:
                content = file.read().strip()
                if not content:
                    print(f"Config file is empty: {config_file}")
                    return {}
                config_data = json.loads(content)
                return config_data
        except json.JSONDecodeError as e:
            print(f"JSON decode error in {config_file}: {e}")
            print(f"File content: {repr(content)}")
            return {}
        except Exception as e:
            print(f"Error reading config file {config_file}: {e}")
            return {}
    else:
        print(f"Config file not found: {config_file}")
        return {}

def needs_api_key(): 
    return True

async def main():
    config = load_config()
    api_key = config.get('API_KEY')

    if not BASE_URL:
        print("BASE_URL is not defined in client.py.")
        return

    if needs_api_key() and not api_key:
        print("API_KEY is required for this operation, but it is missing.")
        return

    if api_key:
        print("API_KEY found, initializing SDK...")
        sdk = SDK(api_key=api_key, base_url=BASE_URL)
    else:
        print("No API_KEY found, initializing SDK without API_KEY...")
        sdk = SDK(api_key=None, base_url=BASE_URL)

    # Perform operations with the SDK
        # await CourseModule.execute_course_modules_operations(sdk.client)
    # await CourseContent.execute_course_contents_operations(sdk.client)
    # await Course.execute_courses_operations(sdk.client)
    # await LearningPathCourses.execute_learning_path_courses_operations(sdk.client)
    # await LearningPath.execute_learning_paths_operations(sdk.client)
    # await UserLearning.execute_user_learnings_operations(sdk.client)
    # await Certificates.execute_certificates_operations(sdk.client)

    # await ActionPlans.execute_action_plan_operations(sdk.client)

if __name__ == "__main__":
    asyncio.run(main())

