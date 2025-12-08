CREATE DATABASE IF NOT EXISTS lmsservice_db;
USE lmsservice_db;

-- Model: Course
-- Description: 

CREATE TABLE IF NOT EXISTS courses (
    id CHAR(36) PRIMARY KEY NOT NULL,               -- Primary key column
    TenantId CHAR(64) NULL,                         -- 
    Name CHAR(64) NULL,                             -- 
    Description CHAR(64) NULL,                      -- 
    ImageUrl CHAR(64) NULL,                         -- 
    DurationInDays INT NULL                         -- 
);

-- Model: LearningPath
-- Description: 

CREATE TABLE IF NOT EXISTS learning_paths (
    id CHAR(36) PRIMARY KEY NOT NULL,               -- Primary key column
    TenantId CHAR(36) NULL,                         -- 
    Name CHAR(64) NULL,                             -- 
    Description CHAR(64) NULL,                      -- 
    ImageUrl CHAR(64) NULL,                         -- 
    DurationInDays INT NULL,                        -- 
    PreferenceWeight INT NULL,                      -- 
    Enabled BOOLEAN NULL                            -- 
);

-- Model: Certificates
-- Description: 

CREATE TABLE IF NOT EXISTS certificates (
    id CHAR(36) PRIMARY KEY NOT NULL,               -- Primary key column
    UserId CHAR(36) NULL,                           -- 
    CertificateNumber CHAR(64) NULL,                -- 
    CertificateName CHAR(64) NULL,                  -- 
    CertificateType CHAR(64) NULL,                  -- 
    IssuedDate CHAR(64) NULL,                       -- 
    ExpiryDate DATETIME NULL,                       -- 
    CertificateUrl CHAR(64) NULL,                   -- 
    FinalGrade FLOAT NULL,                          -- 
    CreditHours INT NULL,                           -- 
    Skills CHAR(64) NULL,                           -- 
    IsVerified BOOLEAN NULL,                        -- 
    VerificationUrl CHAR(64) NULL,                  -- 
    IssuedBy CHAR(36) NULL,                          -- 
    CourseId CHAR(36) NOT NULL,
    FOREIGN KEY (CourseId) REFERENCES courses(id)
);

-- Model: CourseModule
-- Description: 

CREATE TABLE IF NOT EXISTS course_modules (
    id CHAR(36) PRIMARY KEY NOT NULL,               -- Primary key column
    Name CHAR(64) NOT NULL,                         -- 
    Description CHAR(64) NULL,                      -- 
    ImageUrl CHAR(64) NULL,                         -- 
    DurationInMins INT NULL,                        -- 
    Sequence INT NULL,                               -- 
    CourseId CHAR(36) NOT NULL,
    FOREIGN KEY (CourseId) REFERENCES courses(id),
    LearningPathId CHAR(36) NOT NULL,
    FOREIGN KEY (LearningPathId) REFERENCES learning_paths(id)
);

-- Model: LearningPathCourses
-- Description: 

CREATE TABLE IF NOT EXISTS learning_path_courses (
    id CHAR(36) PRIMARY KEY NOT NULL,               -- Primary key column
    CourseId CHAR(36) NOT NULL,
    FOREIGN KEY (CourseId) REFERENCES courses(id),
    LearningPathId CHAR(36) NOT NULL,
    FOREIGN KEY (LearningPathId) REFERENCES learning_paths(id)
);

-- Model: CourseContent
-- Description: 

CREATE TABLE IF NOT EXISTS course_contents (
    id CHAR(36) PRIMARY KEY NOT NULL,               -- Primary key column
    Title CHAR(64) NULL,                            -- 
    Description CHAR(64) NULL,                      -- 
    ImageUrl CHAR(64) NULL,                         -- 
    DurationInMins INT NULL,                        -- 
    ContentType VARCHAR(255) NULL,                  -- 
    ResourceLink CHAR(64) NULL,                     -- 
    ActionTemplateId CHAR(36) NULL,                 -- 
    Sequence INT NULL,                               -- 
    CourseId CHAR(36) NOT NULL,
    FOREIGN KEY (CourseId) REFERENCES courses(id),
    LearningPathId CHAR(36) NOT NULL,
    FOREIGN KEY (LearningPathId) REFERENCES learning_paths(id),
    CourseModuleId CHAR(36) NOT NULL,
    FOREIGN KEY (CourseModuleId) REFERENCES course_modules(id)
);

-- Model: UserLearning
-- Description: 

CREATE TABLE IF NOT EXISTS user_learnings (
    id CHAR(36) PRIMARY KEY NOT NULL,               -- Primary key column
    UserId CHAR(36) NULL,                           -- 
    ActionId CHAR(36) NULL,                         -- 
    ProgressStatus VARCHAR(255) NULL,               -- 
    PercentageCompletion INT NULL,                   -- 
    CourseId CHAR(36) NOT NULL,
    FOREIGN KEY (CourseId) REFERENCES courses(id),
    LearningPathId CHAR(36) NOT NULL,
    FOREIGN KEY (LearningPathId) REFERENCES learning_paths(id),
    CourseModuleId CHAR(36) NOT NULL,
    FOREIGN KEY (CourseModuleId) REFERENCES course_modules(id),
    CourseContentId CHAR(36) NOT NULL,
    FOREIGN KEY (CourseContentId) REFERENCES course_contents(id)
);

