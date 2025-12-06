
import AuthenticationService from './authentication';
import { CourseModule } from '../api/course.module/course.module'
import { CourseContent } from '../api/course.content/course.content'
import { Course } from '../api/course/course'
import { LearningPathCourses } from '../api/learning.path.courses/learning.path.courses'
import { LearningPath } from '../api/learning.path/learning.path'
import { UserLearning } from '../api/user.learning/user.learning'
import { Certificates } from '../api/certificates/certificates'

import { APIClient } from './client';

export class SDK {
  public APIClient: APIClient;
  public auth: AuthenticationService;
public course_modules: CourseModule;
public course_contents: CourseContent;
public courses: Course;
public learning_path_courses: LearningPathCourses;
public learning_paths: LearningPath;
public user_learnings: UserLearning;
public certificates: Certificates;


  constructor() {
     this.APIClient = new APIClient();
     this.auth = new AuthenticationService(this.APIClient);
this.course_modules = new CourseModule(this.APIClient);
this.course_contents = new CourseContent(this.APIClient);
this.courses = new Course(this.APIClient);
this.learning_path_courses = new LearningPathCourses(this.APIClient);
this.learning_paths = new LearningPath(this.APIClient);
this.user_learnings = new UserLearning(this.APIClient);
this.certificates = new Certificates(this.APIClient);

  }
}