
using lmsservice_db.src.api.course.module.course.moduleservice;
using lmsservice_db.src.api.course.content.course.contentservice;
using lmsservice_db.src.api.course.courseservice;
using lmsservice_db.src.api.learning.path.courses.learning.path.coursesservice;
using lmsservice_db.src.api.learning.path.learning.pathservice;
using lmsservice_db.src.api.user.learning.user.learningservice;
using lmsservice_db.src.api.certificates.certificatesservice;


namespace lmsservice_db.SDK;
public class SDK
{
    public APIClient Client { get; set; }
    public CourseModule CourseModule { get; set; }
public CourseContent CourseContent { get; set; }
public Course Course { get; set; }
public LearningPathCourses LearningPathCourses { get; set; }
public LearningPath LearningPath { get; set; }
public UserLearning UserLearning { get; set; }
public Certificates Certificates { get; set; }

    public SDK(string baseUrl)
    {
        Client = new APIClient(baseUrl);
        CourseModule = new CourseModule(Client);
CourseContent = new CourseContent(Client);
Course = new Course(Client);
LearningPathCourses = new LearningPathCourses(Client);
LearningPath = new LearningPath(Client);
UserLearning = new UserLearning(Client);
Certificates = new Certificates(Client);


    }
}
