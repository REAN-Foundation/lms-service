
import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import  Application  from '../../../src/app';
import { setTestData, getTestData } from '../init';

const infra = Application.instance();

describe('LearningPathCourses API tests', function () {
    var agent = request.agent(infra._expressApp);
    
    it('Create learning-path-courses', function (done) {
        loadLearningPathCoursesCreateModel();
        const createModel = getTestData('LearningPathCoursesCreateModel');
        agent
        .post('/api/v1/learning-path-courses')
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .send(createModel)
        .expect((response) => {
            setTestData(response.body.Data.id, 'LEARNING_PATH_COURSES_ID');
            expect(response.body.Data).to.have.property('CourseId');
            expect(response.body.Data).to.have.property('LearningPathId');
            
            expect(response.body.Data.CourseId).to.equal(getTestData('LearningPathCoursesCreateModel').CourseId);
            expect(response.body.Data.LearningPathId).to.equal(getTestData('LearningPathCoursesCreateModel').LearningPathId);
            
        })
        .expect(201, done);
    });
    
    it('Get learning-path-courses by id', function (done) {
        agent
        .get(`/api/v1/learning-path-courses/${getTestData('LEARNING_PATH_COURSES_ID')}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .expect((response) => {
            expect(response.body.Data).to.have.property('CourseId');
            expect(response.body.Data).to.have.property('LearningPathId');
            
            expect(response.body.Data.CourseId).to.equal(getTestData('LearningPathCoursesCreateModel').CourseId);
            expect(response.body.Data.LearningPathId).to.equal(getTestData('LearningPathCoursesCreateModel').LearningPathId);
            
        })
        .expect(200, done);
    });
    
    it('Search learning-path-courses records', function (done) {
        loadLearningPathCoursesQueryString();
        agent
        .get(`/api/v1/learning-path-courses/search${loadLearningPathCoursesQueryString()}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .expect((response) => {
            expect(response.body.Data.LearningPathCoursesRecords).to.have.property('TotalCount');
            expect(response.body.Data.LearningPathCoursesRecords).to.have.property('RetrievedCount');
            expect(response.body.Data.LearningPathCoursesRecords).to.have.property('PageIndex');
            expect(response.body.Data.LearningPathCoursesRecords).to.have.property('ItemsPerPage');
            expect(response.body.Data.LearningPathCoursesRecords).to.have.property('Order');
            expect(response.body.Data.LearningPathCoursesRecords.TotalCount).to.be.greaterThan(0);
            expect(response.body.Data.LearningPathCoursesRecords.RetrievedCount).to.be.greaterThan(0);
            expect(response.body.Data.LearningPathCoursesRecords.Items.length).to.be.greaterThan(0);
        })
        .expect(200, done);
    });
    
    it('Update learning-path-courses', function (done) {
        loadLearningPathCoursesUpdateModel();
        const updateModel = getTestData('LearningPathCoursesUpdateModel');
        agent
        .put(`/api/v1/learning-path-courses/${getTestData('LEARNING_PATH_COURSES_ID')}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .send(updateModel)
        .expect((response) => {
            expect(response.body.Data).to.have.property('CourseId');
            expect(response.body.Data).to.have.property('LearningPathId');
            
            expect(response.body.Data.CourseId).to.equal(getTestData('LearningPathCoursesUpdateModel').CourseId);
            expect(response.body.Data.LearningPathId).to.equal(getTestData('LearningPathCoursesUpdateModel').LearningPathId);
            
        })
        .expect(200, done);
    });
    
    it('Delete learning-path-courses', function (done) {
        agent
        .delete(`/api/v1/learning-path-courses/${getTestData('LEARNING_PATH_COURSES_ID')}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .expect((response) => {
            expect(response.body).to.have.property('Status');
            expect(response.body.Status).to.equal('success');
        })
        .expect(200, done);
    });
    
    it('Create learning-path-courses again', function (done) {
        loadLearningPathCoursesCreateModel();
        const createModel = getTestData('LearningPathCoursesCreateModel');
        agent
        .post('/api/v1/learning-path-courses')
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .send(createModel)
        .expect((response) => {
            setTestData(response.body.Data.id, 'LEARNING_PATH_COURSES_ID');
            expect(response.body.Data).to.have.property('CourseId');
            expect(response.body.Data).to.have.property('LearningPathId');
            
            expect(response.body.Data.CourseId).to.equal(getTestData('LearningPathCoursesCreateModel').CourseId);
            expect(response.body.Data.LearningPathId).to.equal(getTestData('LearningPathCoursesCreateModel').LearningPathId);
            
        })
        .expect(201, done);
    });
});

export const loadLearningPathCoursesCreateModel = async (
) => {
    const model = {
        CourseId: getTestData('COURSE_ID'),
        LearningPathId: getTestData('LEARNING_PATH_ID'),
        
    };
    setTestData(model, 'LearningPathCoursesCreateModel');
};

export const loadLearningPathCoursesUpdateModel = async (
) => {
    const model = {
        CourseId: getTestData('COURSE_ID'),
        LearningPathId: getTestData('LEARNING_PATH_ID'),
        
    };
    setTestData(model, 'LearningPathCoursesUpdateModel');
};

function loadLearningPathCoursesQueryString() {
    const queryString = '?';
    return queryString;
}

