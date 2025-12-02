
import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import  Application  from '../../../src/app';
import { setTestData, getTestData } from '../init';

const infra = Application.instance();

describe('UserLearning API tests', function () {
    var agent = request.agent(infra._expressApp);
    
    it('Create user-learnings', function (done) {
        loadUserLearningCreateModel();
        const createModel = getTestData('UserLearningCreateModel');
        agent
        .post('/api/v1/user-learnings')
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .send(createModel)
        .expect((response) => {
            setTestData(response.body.Data.id, 'USER_LEARNING_ID');
            expect(response.body.Data).to.have.property('CourseId');
            expect(response.body.Data).to.have.property('LearningPathId');
            expect(response.body.Data).to.have.property('CourseModuleId');
            expect(response.body.Data).to.have.property('CourseContentId');
            expect(response.body.Data).to.have.property('UserId');
            expect(response.body.Data).to.have.property('ActionId');
            expect(response.body.Data).to.have.property('ProgressStatus');
            expect(response.body.Data).to.have.property('PercentageCompletion');
            
            expect(response.body.Data.CourseId).to.equal(getTestData('UserLearningCreateModel').CourseId);
            expect(response.body.Data.LearningPathId).to.equal(getTestData('UserLearningCreateModel').LearningPathId);
            expect(response.body.Data.CourseModuleId).to.equal(getTestData('UserLearningCreateModel').CourseModuleId);
            expect(response.body.Data.CourseContentId).to.equal(getTestData('UserLearningCreateModel').CourseContentId);
            expect(response.body.Data.UserId).to.equal(getTestData('UserLearningCreateModel').UserId);
            expect(response.body.Data.ActionId).to.equal(getTestData('UserLearningCreateModel').ActionId);
            expect(response.body.Data.ProgressStatus).to.equal(getTestData('UserLearningCreateModel').ProgressStatus);
            expect(response.body.Data.PercentageCompletion).to.equal(getTestData('UserLearningCreateModel').PercentageCompletion);
            
        })
        .expect(201, done);
    });
    
    it('Get user-learnings by id', function (done) {
        agent
        .get(`/api/v1/user-learnings/${getTestData('USER_LEARNING_ID')}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .expect((response) => {
            expect(response.body.Data).to.have.property('CourseId');
            expect(response.body.Data).to.have.property('LearningPathId');
            expect(response.body.Data).to.have.property('CourseModuleId');
            expect(response.body.Data).to.have.property('CourseContentId');
            expect(response.body.Data).to.have.property('UserId');
            expect(response.body.Data).to.have.property('ActionId');
            expect(response.body.Data).to.have.property('ProgressStatus');
            expect(response.body.Data).to.have.property('PercentageCompletion');
            
            expect(response.body.Data.CourseId).to.equal(getTestData('UserLearningCreateModel').CourseId);
            expect(response.body.Data.LearningPathId).to.equal(getTestData('UserLearningCreateModel').LearningPathId);
            expect(response.body.Data.CourseModuleId).to.equal(getTestData('UserLearningCreateModel').CourseModuleId);
            expect(response.body.Data.CourseContentId).to.equal(getTestData('UserLearningCreateModel').CourseContentId);
            expect(response.body.Data.UserId).to.equal(getTestData('UserLearningCreateModel').UserId);
            expect(response.body.Data.ActionId).to.equal(getTestData('UserLearningCreateModel').ActionId);
            expect(response.body.Data.ProgressStatus).to.equal(getTestData('UserLearningCreateModel').ProgressStatus);
            expect(response.body.Data.PercentageCompletion).to.equal(getTestData('UserLearningCreateModel').PercentageCompletion);
            
        })
        .expect(200, done);
    });
    
    it('Search user-learnings records', function (done) {
        loadUserLearningQueryString();
        agent
        .get(`/api/v1/user-learnings/search${loadUserLearningQueryString()}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .expect((response) => {
            expect(response.body.Data.UserLearningRecords).to.have.property('TotalCount');
            expect(response.body.Data.UserLearningRecords).to.have.property('RetrievedCount');
            expect(response.body.Data.UserLearningRecords).to.have.property('PageIndex');
            expect(response.body.Data.UserLearningRecords).to.have.property('ItemsPerPage');
            expect(response.body.Data.UserLearningRecords).to.have.property('Order');
            expect(response.body.Data.UserLearningRecords.TotalCount).to.be.greaterThan(0);
            expect(response.body.Data.UserLearningRecords.RetrievedCount).to.be.greaterThan(0);
            expect(response.body.Data.UserLearningRecords.Items.length).to.be.greaterThan(0);
        })
        .expect(200, done);
    });
    
    it('Update user-learnings', function (done) {
        loadUserLearningUpdateModel();
        const updateModel = getTestData('UserLearningUpdateModel');
        agent
        .put(`/api/v1/user-learnings/${getTestData('USER_LEARNING_ID')}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .send(updateModel)
        .expect((response) => {
            expect(response.body.Data).to.have.property('CourseId');
            expect(response.body.Data).to.have.property('LearningPathId');
            expect(response.body.Data).to.have.property('CourseModuleId');
            expect(response.body.Data).to.have.property('CourseContentId');
            expect(response.body.Data).to.have.property('UserId');
            expect(response.body.Data).to.have.property('ActionId');
            expect(response.body.Data).to.have.property('ProgressStatus');
            expect(response.body.Data).to.have.property('PercentageCompletion');
            
            expect(response.body.Data.CourseId).to.equal(getTestData('UserLearningUpdateModel').CourseId);
            expect(response.body.Data.LearningPathId).to.equal(getTestData('UserLearningUpdateModel').LearningPathId);
            expect(response.body.Data.CourseModuleId).to.equal(getTestData('UserLearningUpdateModel').CourseModuleId);
            expect(response.body.Data.CourseContentId).to.equal(getTestData('UserLearningUpdateModel').CourseContentId);
            expect(response.body.Data.UserId).to.equal(getTestData('UserLearningUpdateModel').UserId);
            expect(response.body.Data.ActionId).to.equal(getTestData('UserLearningUpdateModel').ActionId);
            expect(response.body.Data.ProgressStatus).to.equal(getTestData('UserLearningUpdateModel').ProgressStatus);
            expect(response.body.Data.PercentageCompletion).to.equal(getTestData('UserLearningUpdateModel').PercentageCompletion);
            
        })
        .expect(200, done);
    });
    
    it('Delete user-learnings', function (done) {
        agent
        .delete(`/api/v1/user-learnings/${getTestData('USER_LEARNING_ID')}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .expect((response) => {
            expect(response.body).to.have.property('Status');
            expect(response.body.Status).to.equal('success');
        })
        .expect(200, done);
    });
    
    it('Create user-learnings again', function (done) {
        loadUserLearningCreateModel();
        const createModel = getTestData('UserLearningCreateModel');
        agent
        .post('/api/v1/user-learnings')
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .send(createModel)
        .expect((response) => {
            setTestData(response.body.Data.id, 'USER_LEARNING_ID');
            expect(response.body.Data).to.have.property('CourseId');
            expect(response.body.Data).to.have.property('LearningPathId');
            expect(response.body.Data).to.have.property('CourseModuleId');
            expect(response.body.Data).to.have.property('CourseContentId');
            expect(response.body.Data).to.have.property('UserId');
            expect(response.body.Data).to.have.property('ActionId');
            expect(response.body.Data).to.have.property('ProgressStatus');
            expect(response.body.Data).to.have.property('PercentageCompletion');
            
            expect(response.body.Data.CourseId).to.equal(getTestData('UserLearningCreateModel').CourseId);
            expect(response.body.Data.LearningPathId).to.equal(getTestData('UserLearningCreateModel').LearningPathId);
            expect(response.body.Data.CourseModuleId).to.equal(getTestData('UserLearningCreateModel').CourseModuleId);
            expect(response.body.Data.CourseContentId).to.equal(getTestData('UserLearningCreateModel').CourseContentId);
            expect(response.body.Data.UserId).to.equal(getTestData('UserLearningCreateModel').UserId);
            expect(response.body.Data.ActionId).to.equal(getTestData('UserLearningCreateModel').ActionId);
            expect(response.body.Data.ProgressStatus).to.equal(getTestData('UserLearningCreateModel').ProgressStatus);
            expect(response.body.Data.PercentageCompletion).to.equal(getTestData('UserLearningCreateModel').PercentageCompletion);
            
        })
        .expect(201, done);
    });
});

export const loadUserLearningCreateModel = async (
) => {
    const model = {
        CourseId: getTestData('COURSE_ID'),
        LearningPathId: getTestData('LEARNING_PATH_ID'),
        CourseModuleId: getTestData('COURSE_MODULE_ID'),
        CourseContentId: getTestData('COURSE_CONTENT_ID'),
        UserId: getTestData('USER_ID'),
        ActionId: getTestData('ACTION_ID'),
        ProgressStatus: "Cancelled",
        PercentageCompletion: faker.number.int({ min: 1, max: 10000 }),
        
    };
    setTestData(model, 'UserLearningCreateModel');
};

export const loadUserLearningUpdateModel = async (
) => {
    const model = {
        CourseId: getTestData('COURSE_ID'),
        LearningPathId: getTestData('LEARNING_PATH_ID'),
        CourseModuleId: getTestData('COURSE_MODULE_ID'),
        CourseContentId: getTestData('COURSE_CONTENT_ID'),
        UserId: getTestData('USER_ID'),
        ActionId: getTestData('ACTION_ID'),
        ProgressStatus: "Cancelled",
        PercentageCompletion: faker.number.int({ min: 1, max: 10000 }),
        
    };
    setTestData(model, 'UserLearningUpdateModel');
};

function loadUserLearningQueryString() {
    const queryString = '?';
    return queryString;
}

