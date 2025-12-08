
import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import  Application  from '../../../src/app';
import { setTestData, getTestData } from '../init';

const infra = Application.instance();

describe('Course API tests', function () {
    var agent = request.agent(infra._expressApp);
    
    it('Create courses', function (done) {
        loadCourseCreateModel();
        const createModel = getTestData('CourseCreateModel');
        agent
        .post('/api/v1/courses')
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .send(createModel)
        .expect((response) => {
            setTestData(response.body.Data.id, 'COURSE_ID');
            expect(response.body.Data).to.have.property('TenantId');
            expect(response.body.Data).to.have.property('Name');
            expect(response.body.Data).to.have.property('Description');
            expect(response.body.Data).to.have.property('ImageUrl');
            expect(response.body.Data).to.have.property('DurationInDays');
            
            expect(response.body.Data.TenantId).to.equal(getTestData('CourseCreateModel').TenantId);
            expect(response.body.Data.Name).to.equal(getTestData('CourseCreateModel').Name);
            expect(response.body.Data.Description).to.equal(getTestData('CourseCreateModel').Description);
            expect(response.body.Data.ImageUrl).to.equal(getTestData('CourseCreateModel').ImageUrl);
            expect(response.body.Data.DurationInDays).to.equal(getTestData('CourseCreateModel').DurationInDays);
            
        })
        .expect(201, done);
    });
    
    it('Get courses by id', function (done) {
        agent
        .get(`/api/v1/courses/${getTestData('COURSE_ID')}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .expect((response) => {
            expect(response.body.Data).to.have.property('TenantId');
            expect(response.body.Data).to.have.property('Name');
            expect(response.body.Data).to.have.property('Description');
            expect(response.body.Data).to.have.property('ImageUrl');
            expect(response.body.Data).to.have.property('DurationInDays');
            
            expect(response.body.Data.TenantId).to.equal(getTestData('CourseCreateModel').TenantId);
            expect(response.body.Data.Name).to.equal(getTestData('CourseCreateModel').Name);
            expect(response.body.Data.Description).to.equal(getTestData('CourseCreateModel').Description);
            expect(response.body.Data.ImageUrl).to.equal(getTestData('CourseCreateModel').ImageUrl);
            expect(response.body.Data.DurationInDays).to.equal(getTestData('CourseCreateModel').DurationInDays);
            
        })
        .expect(200, done);
    });
    
    it('Search courses records', function (done) {
        loadCourseQueryString();
        agent
        .get(`/api/v1/courses/search${loadCourseQueryString()}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .expect((response) => {
            expect(response.body.Data.CourseRecords).to.have.property('TotalCount');
            expect(response.body.Data.CourseRecords).to.have.property('RetrievedCount');
            expect(response.body.Data.CourseRecords).to.have.property('PageIndex');
            expect(response.body.Data.CourseRecords).to.have.property('ItemsPerPage');
            expect(response.body.Data.CourseRecords).to.have.property('Order');
            expect(response.body.Data.CourseRecords.TotalCount).to.be.greaterThan(0);
            expect(response.body.Data.CourseRecords.RetrievedCount).to.be.greaterThan(0);
            expect(response.body.Data.CourseRecords.Items.length).to.be.greaterThan(0);
        })
        .expect(200, done);
    });
    
    it('Update courses', function (done) {
        loadCourseUpdateModel();
        const updateModel = getTestData('CourseUpdateModel');
        agent
        .put(`/api/v1/courses/${getTestData('COURSE_ID')}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .send(updateModel)
        .expect((response) => {
            expect(response.body.Data).to.have.property('TenantId');
            expect(response.body.Data).to.have.property('Name');
            expect(response.body.Data).to.have.property('Description');
            expect(response.body.Data).to.have.property('ImageUrl');
            expect(response.body.Data).to.have.property('DurationInDays');
            
            expect(response.body.Data.TenantId).to.equal(getTestData('CourseUpdateModel').TenantId);
            expect(response.body.Data.Name).to.equal(getTestData('CourseUpdateModel').Name);
            expect(response.body.Data.Description).to.equal(getTestData('CourseUpdateModel').Description);
            expect(response.body.Data.ImageUrl).to.equal(getTestData('CourseUpdateModel').ImageUrl);
            expect(response.body.Data.DurationInDays).to.equal(getTestData('CourseUpdateModel').DurationInDays);
            
        })
        .expect(200, done);
    });
    
    it('Delete courses', function (done) {
        agent
        .delete(`/api/v1/courses/${getTestData('COURSE_ID')}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .expect((response) => {
            expect(response.body).to.have.property('Status');
            expect(response.body.Status).to.equal('success');
        })
        .expect(200, done);
    });
    
    it('Create courses again', function (done) {
        loadCourseCreateModel();
        const createModel = getTestData('CourseCreateModel');
        agent
        .post('/api/v1/courses')
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .send(createModel)
        .expect((response) => {
            setTestData(response.body.Data.id, 'COURSE_ID');
            expect(response.body.Data).to.have.property('TenantId');
            expect(response.body.Data).to.have.property('Name');
            expect(response.body.Data).to.have.property('Description');
            expect(response.body.Data).to.have.property('ImageUrl');
            expect(response.body.Data).to.have.property('DurationInDays');
            
            expect(response.body.Data.TenantId).to.equal(getTestData('CourseCreateModel').TenantId);
            expect(response.body.Data.Name).to.equal(getTestData('CourseCreateModel').Name);
            expect(response.body.Data.Description).to.equal(getTestData('CourseCreateModel').Description);
            expect(response.body.Data.ImageUrl).to.equal(getTestData('CourseCreateModel').ImageUrl);
            expect(response.body.Data.DurationInDays).to.equal(getTestData('CourseCreateModel').DurationInDays);
            
        })
        .expect(201, done);
    });
});

export const loadCourseCreateModel = async (
) => {
    const model = {
        TenantId: getTestData('TENANT_ID'),
        Name: faker.person.fullName(),
        Description: faker.word.words({ count: { min: 1, max: 2 } }),
        ImageUrl: faker.internet.url(),
        DurationInDays: faker.number.int({ min: 1, max: 10000 }),
        
    };
    setTestData(model, 'CourseCreateModel');
};

export const loadCourseUpdateModel = async (
) => {
    const model = {
        TenantId: getTestData('TENANT_ID'),
        Name: faker.person.fullName(),
        Description: faker.word.words({ count: { min: 1, max: 2 } }),
        ImageUrl: faker.internet.url(),
        DurationInDays: faker.number.int({ min: 1, max: 10000 }),
        
    };
    setTestData(model, 'CourseUpdateModel');
};

function loadCourseQueryString() {
    const queryString = '?';
    return queryString;
}

