
import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import  Application  from '../../../src/app';
import { setTestData, getTestData } from '../init';

const infra = Application.instance();

describe('CourseModule API tests', function () {
    var agent = request.agent(infra._expressApp);
    
    it('Create course-modules', function (done) {
        loadCourseModuleCreateModel();
        const createModel = getTestData('CourseModuleCreateModel');
        agent
        .post('/api/v1/course-modules')
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .send(createModel)
        .expect((response) => {
            setTestData(response.body.Data.id, 'COURSE_MODULE_ID');
            expect(response.body.Data).to.have.property('CourseId');
            expect(response.body.Data).to.have.property('LearningPathId');
            expect(response.body.Data).to.have.property('Name');
            expect(response.body.Data).to.have.property('Description');
            expect(response.body.Data).to.have.property('ImageUrl');
            expect(response.body.Data).to.have.property('DurationInMins');
            expect(response.body.Data).to.have.property('Sequence');
            
            expect(response.body.Data.CourseId).to.equal(getTestData('CourseModuleCreateModel').CourseId);
            expect(response.body.Data.LearningPathId).to.equal(getTestData('CourseModuleCreateModel').LearningPathId);
            expect(response.body.Data.Name).to.equal(getTestData('CourseModuleCreateModel').Name);
            expect(response.body.Data.Description).to.equal(getTestData('CourseModuleCreateModel').Description);
            expect(response.body.Data.ImageUrl).to.equal(getTestData('CourseModuleCreateModel').ImageUrl);
            expect(response.body.Data.DurationInMins).to.equal(getTestData('CourseModuleCreateModel').DurationInMins);
            expect(response.body.Data.Sequence).to.equal(getTestData('CourseModuleCreateModel').Sequence);
            
        })
        .expect(201, done);
    });
    
    it('Get course-modules by id', function (done) {
        agent
        .get(`/api/v1/course-modules/${getTestData('COURSE_MODULE_ID')}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .expect((response) => {
            expect(response.body.Data).to.have.property('CourseId');
            expect(response.body.Data).to.have.property('LearningPathId');
            expect(response.body.Data).to.have.property('Name');
            expect(response.body.Data).to.have.property('Description');
            expect(response.body.Data).to.have.property('ImageUrl');
            expect(response.body.Data).to.have.property('DurationInMins');
            expect(response.body.Data).to.have.property('Sequence');
            
            expect(response.body.Data.CourseId).to.equal(getTestData('CourseModuleCreateModel').CourseId);
            expect(response.body.Data.LearningPathId).to.equal(getTestData('CourseModuleCreateModel').LearningPathId);
            expect(response.body.Data.Name).to.equal(getTestData('CourseModuleCreateModel').Name);
            expect(response.body.Data.Description).to.equal(getTestData('CourseModuleCreateModel').Description);
            expect(response.body.Data.ImageUrl).to.equal(getTestData('CourseModuleCreateModel').ImageUrl);
            expect(response.body.Data.DurationInMins).to.equal(getTestData('CourseModuleCreateModel').DurationInMins);
            expect(response.body.Data.Sequence).to.equal(getTestData('CourseModuleCreateModel').Sequence);
            
        })
        .expect(200, done);
    });
    
    it('Search course-modules records', function (done) {
        loadCourseModuleQueryString();
        agent
        .get(`/api/v1/course-modules/search${loadCourseModuleQueryString()}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .expect((response) => {
            expect(response.body.Data.CourseModuleRecords).to.have.property('TotalCount');
            expect(response.body.Data.CourseModuleRecords).to.have.property('RetrievedCount');
            expect(response.body.Data.CourseModuleRecords).to.have.property('PageIndex');
            expect(response.body.Data.CourseModuleRecords).to.have.property('ItemsPerPage');
            expect(response.body.Data.CourseModuleRecords).to.have.property('Order');
            expect(response.body.Data.CourseModuleRecords.TotalCount).to.be.greaterThan(0);
            expect(response.body.Data.CourseModuleRecords.RetrievedCount).to.be.greaterThan(0);
            expect(response.body.Data.CourseModuleRecords.Items.length).to.be.greaterThan(0);
        })
        .expect(200, done);
    });
    
    it('Update course-modules', function (done) {
        loadCourseModuleUpdateModel();
        const updateModel = getTestData('CourseModuleUpdateModel');
        agent
        .put(`/api/v1/course-modules/${getTestData('COURSE_MODULE_ID')}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .send(updateModel)
        .expect((response) => {
            expect(response.body.Data).to.have.property('CourseId');
            expect(response.body.Data).to.have.property('LearningPathId');
            expect(response.body.Data).to.have.property('Name');
            expect(response.body.Data).to.have.property('Description');
            expect(response.body.Data).to.have.property('ImageUrl');
            expect(response.body.Data).to.have.property('DurationInMins');
            expect(response.body.Data).to.have.property('Sequence');
            
            expect(response.body.Data.CourseId).to.equal(getTestData('CourseModuleUpdateModel').CourseId);
            expect(response.body.Data.LearningPathId).to.equal(getTestData('CourseModuleUpdateModel').LearningPathId);
            expect(response.body.Data.Name).to.equal(getTestData('CourseModuleUpdateModel').Name);
            expect(response.body.Data.Description).to.equal(getTestData('CourseModuleUpdateModel').Description);
            expect(response.body.Data.ImageUrl).to.equal(getTestData('CourseModuleUpdateModel').ImageUrl);
            expect(response.body.Data.DurationInMins).to.equal(getTestData('CourseModuleUpdateModel').DurationInMins);
            expect(response.body.Data.Sequence).to.equal(getTestData('CourseModuleUpdateModel').Sequence);
            
        })
        .expect(200, done);
    });
    
    it('Delete course-modules', function (done) {
        agent
        .delete(`/api/v1/course-modules/${getTestData('COURSE_MODULE_ID')}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .expect((response) => {
            expect(response.body).to.have.property('Status');
            expect(response.body.Status).to.equal('success');
        })
        .expect(200, done);
    });
    
    it('Create course-modules again', function (done) {
        loadCourseModuleCreateModel();
        const createModel = getTestData('CourseModuleCreateModel');
        agent
        .post('/api/v1/course-modules')
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .send(createModel)
        .expect((response) => {
            setTestData(response.body.Data.id, 'COURSE_MODULE_ID');
            expect(response.body.Data).to.have.property('CourseId');
            expect(response.body.Data).to.have.property('LearningPathId');
            expect(response.body.Data).to.have.property('Name');
            expect(response.body.Data).to.have.property('Description');
            expect(response.body.Data).to.have.property('ImageUrl');
            expect(response.body.Data).to.have.property('DurationInMins');
            expect(response.body.Data).to.have.property('Sequence');
            
            expect(response.body.Data.CourseId).to.equal(getTestData('CourseModuleCreateModel').CourseId);
            expect(response.body.Data.LearningPathId).to.equal(getTestData('CourseModuleCreateModel').LearningPathId);
            expect(response.body.Data.Name).to.equal(getTestData('CourseModuleCreateModel').Name);
            expect(response.body.Data.Description).to.equal(getTestData('CourseModuleCreateModel').Description);
            expect(response.body.Data.ImageUrl).to.equal(getTestData('CourseModuleCreateModel').ImageUrl);
            expect(response.body.Data.DurationInMins).to.equal(getTestData('CourseModuleCreateModel').DurationInMins);
            expect(response.body.Data.Sequence).to.equal(getTestData('CourseModuleCreateModel').Sequence);
            
        })
        .expect(201, done);
    });
});

export const loadCourseModuleCreateModel = async (
) => {
    const model = {
        CourseId: getTestData('COURSE_ID'),
        LearningPathId: getTestData('LEARNING_PATH_ID'),
        Name: faker.person.fullName(),
        Description: faker.word.words({ count: { min: 1, max: 2 } }),
        ImageUrl: faker.internet.url(),
        DurationInMins: faker.number.int({ min: 1, max: 10000 }),
        Sequence: faker.number.int({ min: 1, max: 10000 }),
        
    };
    setTestData(model, 'CourseModuleCreateModel');
};

export const loadCourseModuleUpdateModel = async (
) => {
    const model = {
        CourseId: getTestData('COURSE_ID'),
        LearningPathId: getTestData('LEARNING_PATH_ID'),
        Name: faker.person.fullName(),
        Description: faker.word.words({ count: { min: 1, max: 2 } }),
        ImageUrl: faker.internet.url(),
        DurationInMins: faker.number.int({ min: 1, max: 10000 }),
        Sequence: faker.number.int({ min: 1, max: 10000 }),
        
    };
    setTestData(model, 'CourseModuleUpdateModel');
};

function loadCourseModuleQueryString() {
    const queryString = '?';
    return queryString;
}

