
from lmsservice_db.authentication import AuthenticationService
from lmsservice_db.client import APIClient
from lmsservice_db.api.course_modules import CourseModule
from lmsservice_db.api.course_contents import CourseContent
from lmsservice_db.api.courses import Course
from lmsservice_db.api.learning_path_courses import LearningPathCourses
from lmsservice_db.api.learning_paths import LearningPath
from lmsservice_db.api.user_learnings import UserLearning
from lmsservice_db.api.certificates import Certificates


class SDK:
    def __init__(self, api_key, base_url=None):
        self.client = APIClient(api_key)
        self.auth = AuthenticationService(self.client)
        self.course_modules = CourseModule(self.client)
        self.course_contents = CourseContent(self.client)
        self.courses = Course(self.client)
        self.learning_path_courses = LearningPathCourses(self.client)
        self.learning_paths = LearningPath(self.client)
        self.user_learnings = UserLearning(self.client)
        self.certificates = Certificates(self.client)

