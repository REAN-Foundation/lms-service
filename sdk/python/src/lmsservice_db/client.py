
import requests
from lmsservice_db.api.course_modules.course_modules import CourseModule
from lmsservice_db.api.course_contents.course_contents import CourseContent
from lmsservice_db.api.courses.courses import Course
from lmsservice_db.api.learning_path_courses.learning_path_courses import LearningPathCourses
from lmsservice_db.api.learning_paths.learning_paths import LearningPath
from lmsservice_db.api.user_learnings.user_learnings import UserLearning
from lmsservice_db.api.certificates.certificates import Certificates

from common.cache_utils import CacheUtils 

####################################################################
BASE_URL = "http://localhost:5551/api/v1"
####################################################################

class APIClient:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = BASE_URL
        self.access_token = None
                self.course_modules = CourseModule(self)
        self.course_contents = CourseContent(self)
        self.courses = Course(self)
        self.learning_path_courses = LearningPathCourses(self)
        self.learning_paths = LearningPath(self)
        self.user_learnings = UserLearning(self)
        self.certificates = Certificates(self)

        self.session = requests.Session()
        self.session.headers.update({
            'Authorization': f'Bearer {self.access_token}',
            'Content-Type': 'application/json'
        })

        self.load_cache()

    def load_cache(self):
        "Loads API key and access token from cache, if available."
        cached_values = CacheUtils.load_cache()
        if cached_values['api_key']:
            self.api_key = cached_values['api_key']
            print("Loaded API key from cache.")
        if cached_values['access_token']:
            self.access_token = cached_values['access_token']
            self.session.headers.update({'Authorization': f'Bearer {self.access_token}'})
            print("Loaded access token from cache.")

    def save_cache(self):
        "Saves the current API key and access token to the cache."
        CacheUtils.save_cache(self.api_key, self.access_token)

    def make_request(self, method, endpoint, data=None):
        url = f'{self.base_url}/{endpoint}'
        response = self.session.request(method, url, json=data)
        response.raise_for_status()
        return response.json()

    def set_access_token(self, token):
        "Sets a new access token, updates the header, and saves it to the cache."
        self.access_token = token
        self.session.headers.update({'Authorization': f'Bearer {self.access_token}'})
        self.save_cache()

    def clear_session(self):
        "Clears the session and cache."
        self.session.headers.clear()
        self.session.close()
        CacheUtils.clear_cache()
        print("Session and cache cleared.")
