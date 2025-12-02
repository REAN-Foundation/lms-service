
import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import  Application  from '../../../src/app';
import { setTestData, getTestData } from '../init';

const infra = Application.instance();

describe('CourseContent API tests', function () {
    var agent = request.agent(infra._expressApp);
    
    it('Create course-contents', function (done) {
        loadCourseContentCreateModel();
        const createModel = getTestData('CourseContentCreateModel');
        agent
        .post('/api/v1/course-contents')
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .send(createModel)
        .expect((response) => {
            setTestData(response.body.Data.id, 'COURSE_CONTENT_ID');
            expect(response.body.Data).to.have.property('CourseId');
            expect(response.body.Data).to.have.property('LearningPathId');
            expect(response.body.Data).to.have.property('CourseModuleId');
            expect(response.body.Data).to.have.property('Title');
            expect(response.body.Data).to.have.property('Description');
            expect(response.body.Data).to.have.property('ImageUrl');
            expect(response.body.Data).to.have.property('DurationInMins');
            expect(response.body.Data).to.have.property('ContentType');
            expect(response.body.Data).to.have.property('ResourceLink');
            expect(response.body.Data).to.have.property('ActionTemplateId');
            expect(response.body.Data).to.have.property('Sequence');
            
            expect(response.body.Data.CourseId).to.equal(getTestData('CourseContentCreateModel').CourseId);
            expect(response.body.Data.LearningPathId).to.equal(getTestData('CourseContentCreateModel').LearningPathId);
            expect(response.body.Data.CourseModuleId).to.equal(getTestData('CourseContentCreateModel').CourseModuleId);
            expect(response.body.Data.Title).to.equal(getTestData('CourseContentCreateModel').Title);
            expect(response.body.Data.Description).to.equal(getTestData('CourseContentCreateModel').Description);
            expect(response.body.Data.ImageUrl).to.equal(getTestData('CourseContentCreateModel').ImageUrl);
            expect(response.body.Data.DurationInMins).to.equal(getTestData('CourseContentCreateModel').DurationInMins);
            expect(response.body.Data.ContentType).to.equal(getTestData('CourseContentCreateModel').ContentType);
            expect(response.body.Data.ResourceLink).to.equal(getTestData('CourseContentCreateModel').ResourceLink);
            expect(response.body.Data.ActionTemplateId).to.equal(getTestData('CourseContentCreateModel').ActionTemplateId);
            expect(response.body.Data.Sequence).to.equal(getTestData('CourseContentCreateModel').Sequence);
            
        })
        .expect(201, done);
    });
    
    it('Get course-contents by id', function (done) {
        agent
        .get(`/api/v1/course-contents/${getTestData('COURSE_CONTENT_ID')}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .expect((response) => {
            expect(response.body.Data).to.have.property('CourseId');
            expect(response.body.Data).to.have.property('LearningPathId');
            expect(response.body.Data).to.have.property('CourseModuleId');
            expect(response.body.Data).to.have.property('Title');
            expect(response.body.Data).to.have.property('Description');
            expect(response.body.Data).to.have.property('ImageUrl');
            expect(response.body.Data).to.have.property('DurationInMins');
            expect(response.body.Data).to.have.property('ContentType');
            expect(response.body.Data).to.have.property('ResourceLink');
            expect(response.body.Data).to.have.property('ActionTemplateId');
            expect(response.body.Data).to.have.property('Sequence');
            
            expect(response.body.Data.CourseId).to.equal(getTestData('CourseContentCreateModel').CourseId);
            expect(response.body.Data.LearningPathId).to.equal(getTestData('CourseContentCreateModel').LearningPathId);
            expect(response.body.Data.CourseModuleId).to.equal(getTestData('CourseContentCreateModel').CourseModuleId);
            expect(response.body.Data.Title).to.equal(getTestData('CourseContentCreateModel').Title);
            expect(response.body.Data.Description).to.equal(getTestData('CourseContentCreateModel').Description);
            expect(response.body.Data.ImageUrl).to.equal(getTestData('CourseContentCreateModel').ImageUrl);
            expect(response.body.Data.DurationInMins).to.equal(getTestData('CourseContentCreateModel').DurationInMins);
            expect(response.body.Data.ContentType).to.equal(getTestData('CourseContentCreateModel').ContentType);
            expect(response.body.Data.ResourceLink).to.equal(getTestData('CourseContentCreateModel').ResourceLink);
            expect(response.body.Data.ActionTemplateId).to.equal(getTestData('CourseContentCreateModel').ActionTemplateId);
            expect(response.body.Data.Sequence).to.equal(getTestData('CourseContentCreateModel').Sequence);
            
        })
        .expect(200, done);
    });
    
    it('Search course-contents records', function (done) {
        loadCourseContentQueryString();
        agent
        .get(`/api/v1/course-contents/search${loadCourseContentQueryString()}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .expect((response) => {
            expect(response.body.Data.CourseContentRecords).to.have.property('TotalCount');
            expect(response.body.Data.CourseContentRecords).to.have.property('RetrievedCount');
            expect(response.body.Data.CourseContentRecords).to.have.property('PageIndex');
            expect(response.body.Data.CourseContentRecords).to.have.property('ItemsPerPage');
            expect(response.body.Data.CourseContentRecords).to.have.property('Order');
            expect(response.body.Data.CourseContentRecords.TotalCount).to.be.greaterThan(0);
            expect(response.body.Data.CourseContentRecords.RetrievedCount).to.be.greaterThan(0);
            expect(response.body.Data.CourseContentRecords.Items.length).to.be.greaterThan(0);
        })
        .expect(200, done);
    });
    
    it('Update course-contents', function (done) {
        loadCourseContentUpdateModel();
        const updateModel = getTestData('CourseContentUpdateModel');
        agent
        .put(`/api/v1/course-contents/${getTestData('COURSE_CONTENT_ID')}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .send(updateModel)
        .expect((response) => {
            expect(response.body.Data).to.have.property('CourseId');
            expect(response.body.Data).to.have.property('LearningPathId');
            expect(response.body.Data).to.have.property('CourseModuleId');
            expect(response.body.Data).to.have.property('Title');
            expect(response.body.Data).to.have.property('Description');
            expect(response.body.Data).to.have.property('ImageUrl');
            expect(response.body.Data).to.have.property('DurationInMins');
            expect(response.body.Data).to.have.property('ContentType');
            expect(response.body.Data).to.have.property('ResourceLink');
            expect(response.body.Data).to.have.property('ActionTemplateId');
            expect(response.body.Data).to.have.property('Sequence');
            
            expect(response.body.Data.CourseId).to.equal(getTestData('CourseContentUpdateModel').CourseId);
            expect(response.body.Data.LearningPathId).to.equal(getTestData('CourseContentUpdateModel').LearningPathId);
            expect(response.body.Data.CourseModuleId).to.equal(getTestData('CourseContentUpdateModel').CourseModuleId);
            expect(response.body.Data.Title).to.equal(getTestData('CourseContentUpdateModel').Title);
            expect(response.body.Data.Description).to.equal(getTestData('CourseContentUpdateModel').Description);
            expect(response.body.Data.ImageUrl).to.equal(getTestData('CourseContentUpdateModel').ImageUrl);
            expect(response.body.Data.DurationInMins).to.equal(getTestData('CourseContentUpdateModel').DurationInMins);
            expect(response.body.Data.ContentType).to.equal(getTestData('CourseContentUpdateModel').ContentType);
            expect(response.body.Data.ResourceLink).to.equal(getTestData('CourseContentUpdateModel').ResourceLink);
            expect(response.body.Data.ActionTemplateId).to.equal(getTestData('CourseContentUpdateModel').ActionTemplateId);
            expect(response.body.Data.Sequence).to.equal(getTestData('CourseContentUpdateModel').Sequence);
            
        })
        .expect(200, done);
    });
    
    it('Delete course-contents', function (done) {
        agent
        .delete(`/api/v1/course-contents/${getTestData('COURSE_CONTENT_ID')}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .expect((response) => {
            expect(response.body).to.have.property('Status');
            expect(response.body.Status).to.equal('success');
        })
        .expect(200, done);
    });
    
    it('Create course-contents again', function (done) {
        loadCourseContentCreateModel();
        const createModel = getTestData('CourseContentCreateModel');
        agent
        .post('/api/v1/course-contents')
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .send(createModel)
        .expect((response) => {
            setTestData(response.body.Data.id, 'COURSE_CONTENT_ID');
            expect(response.body.Data).to.have.property('CourseId');
            expect(response.body.Data).to.have.property('LearningPathId');
            expect(response.body.Data).to.have.property('CourseModuleId');
            expect(response.body.Data).to.have.property('Title');
            expect(response.body.Data).to.have.property('Description');
            expect(response.body.Data).to.have.property('ImageUrl');
            expect(response.body.Data).to.have.property('DurationInMins');
            expect(response.body.Data).to.have.property('ContentType');
            expect(response.body.Data).to.have.property('ResourceLink');
            expect(response.body.Data).to.have.property('ActionTemplateId');
            expect(response.body.Data).to.have.property('Sequence');
            
            expect(response.body.Data.CourseId).to.equal(getTestData('CourseContentCreateModel').CourseId);
            expect(response.body.Data.LearningPathId).to.equal(getTestData('CourseContentCreateModel').LearningPathId);
            expect(response.body.Data.CourseModuleId).to.equal(getTestData('CourseContentCreateModel').CourseModuleId);
            expect(response.body.Data.Title).to.equal(getTestData('CourseContentCreateModel').Title);
            expect(response.body.Data.Description).to.equal(getTestData('CourseContentCreateModel').Description);
            expect(response.body.Data.ImageUrl).to.equal(getTestData('CourseContentCreateModel').ImageUrl);
            expect(response.body.Data.DurationInMins).to.equal(getTestData('CourseContentCreateModel').DurationInMins);
            expect(response.body.Data.ContentType).to.equal(getTestData('CourseContentCreateModel').ContentType);
            expect(response.body.Data.ResourceLink).to.equal(getTestData('CourseContentCreateModel').ResourceLink);
            expect(response.body.Data.ActionTemplateId).to.equal(getTestData('CourseContentCreateModel').ActionTemplateId);
            expect(response.body.Data.Sequence).to.equal(getTestData('CourseContentCreateModel').Sequence);
            
        })
        .expect(201, done);
    });
});

export const loadCourseContentCreateModel = async (
) => {
    const model = {
        CourseId: getTestData('COURSE_ID'),
        LearningPathId: getTestData('LEARNING_PATH_ID'),
        CourseModuleId: getTestData('COURSE_MODULE_ID'),
        Title: faker.lorem.sentence(3),
        Description: faker.word.words({ count: { min: 1, max: 2 } }),
        ImageUrl: faker.internet.url(),
        DurationInMins: faker.number.int({ min: 1, max: 10000 }),
        ContentType: "Url",
        ResourceLink: faker.lorem.sentence(3),
        ActionTemplateId: getTestData('ACTION_TEMPLATE_ID'),
        Sequence: faker.number.int({ min: 1, max: 10000 }),
        
    };
    setTestData(model, 'CourseContentCreateModel');
};

export const loadCourseContentUpdateModel = async (
) => {
    const model = {
        CourseId: getTestData('COURSE_ID'),
        LearningPathId: getTestData('LEARNING_PATH_ID'),
        CourseModuleId: getTestData('COURSE_MODULE_ID'),
        Title: faker.lorem.sentence(3),
        Description: faker.word.words({ count: { min: 1, max: 2 } }),
        ImageUrl: faker.internet.url(),
        DurationInMins: faker.number.int({ min: 1, max: 10000 }),
        ContentType: "Url",
        ResourceLink: faker.lorem.sentence(3),
        ActionTemplateId: getTestData('ACTION_TEMPLATE_ID'),
        Sequence: faker.number.int({ min: 1, max: 10000 }),
        
    };
    setTestData(model, 'CourseContentUpdateModel');
};

function loadCourseContentQueryString() {
    const queryString = '?';
    return queryString;
}

