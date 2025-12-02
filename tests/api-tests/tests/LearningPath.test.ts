
import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import  Application  from '../../../src/app';
import { setTestData, getTestData } from '../init';

const infra = Application.instance();

describe('LearningPath API tests', function () {
    var agent = request.agent(infra._expressApp);
    
    it('Create learning-paths', function (done) {
        loadLearningPathCreateModel();
        const createModel = getTestData('LearningPathCreateModel');
        agent
        .post('/api/v1/learning-paths')
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .send(createModel)
        .expect((response) => {
            setTestData(response.body.Data.id, 'LEARNING_PATH_ID');
            expect(response.body.Data).to.have.property('TenantId');
            expect(response.body.Data).to.have.property('Name');
            expect(response.body.Data).to.have.property('Description');
            expect(response.body.Data).to.have.property('ImageUrl');
            expect(response.body.Data).to.have.property('DurationInDays');
            expect(response.body.Data).to.have.property('PreferenceWeight');
            expect(response.body.Data).to.have.property('Enabled');
            
            expect(response.body.Data.TenantId).to.equal(getTestData('LearningPathCreateModel').TenantId);
            expect(response.body.Data.Name).to.equal(getTestData('LearningPathCreateModel').Name);
            expect(response.body.Data.Description).to.equal(getTestData('LearningPathCreateModel').Description);
            expect(response.body.Data.ImageUrl).to.equal(getTestData('LearningPathCreateModel').ImageUrl);
            expect(response.body.Data.DurationInDays).to.equal(getTestData('LearningPathCreateModel').DurationInDays);
            expect(response.body.Data.PreferenceWeight).to.equal(getTestData('LearningPathCreateModel').PreferenceWeight);
            expect(response.body.Data.Enabled).to.equal(getTestData('LearningPathCreateModel').Enabled);
            
        })
        .expect(201, done);
    });
    
    it('Get learning-paths by id', function (done) {
        agent
        .get(`/api/v1/learning-paths/${getTestData('LEARNING_PATH_ID')}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .expect((response) => {
            expect(response.body.Data).to.have.property('TenantId');
            expect(response.body.Data).to.have.property('Name');
            expect(response.body.Data).to.have.property('Description');
            expect(response.body.Data).to.have.property('ImageUrl');
            expect(response.body.Data).to.have.property('DurationInDays');
            expect(response.body.Data).to.have.property('PreferenceWeight');
            expect(response.body.Data).to.have.property('Enabled');
            
            expect(response.body.Data.TenantId).to.equal(getTestData('LearningPathCreateModel').TenantId);
            expect(response.body.Data.Name).to.equal(getTestData('LearningPathCreateModel').Name);
            expect(response.body.Data.Description).to.equal(getTestData('LearningPathCreateModel').Description);
            expect(response.body.Data.ImageUrl).to.equal(getTestData('LearningPathCreateModel').ImageUrl);
            expect(response.body.Data.DurationInDays).to.equal(getTestData('LearningPathCreateModel').DurationInDays);
            expect(response.body.Data.PreferenceWeight).to.equal(getTestData('LearningPathCreateModel').PreferenceWeight);
            expect(response.body.Data.Enabled).to.equal(getTestData('LearningPathCreateModel').Enabled);
            
        })
        .expect(200, done);
    });
    
    it('Search learning-paths records', function (done) {
        loadLearningPathQueryString();
        agent
        .get(`/api/v1/learning-paths/search${loadLearningPathQueryString()}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .expect((response) => {
            expect(response.body.Data.LearningPathRecords).to.have.property('TotalCount');
            expect(response.body.Data.LearningPathRecords).to.have.property('RetrievedCount');
            expect(response.body.Data.LearningPathRecords).to.have.property('PageIndex');
            expect(response.body.Data.LearningPathRecords).to.have.property('ItemsPerPage');
            expect(response.body.Data.LearningPathRecords).to.have.property('Order');
            expect(response.body.Data.LearningPathRecords.TotalCount).to.be.greaterThan(0);
            expect(response.body.Data.LearningPathRecords.RetrievedCount).to.be.greaterThan(0);
            expect(response.body.Data.LearningPathRecords.Items.length).to.be.greaterThan(0);
        })
        .expect(200, done);
    });
    
    it('Update learning-paths', function (done) {
        loadLearningPathUpdateModel();
        const updateModel = getTestData('LearningPathUpdateModel');
        agent
        .put(`/api/v1/learning-paths/${getTestData('LEARNING_PATH_ID')}`)
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
            expect(response.body.Data).to.have.property('PreferenceWeight');
            expect(response.body.Data).to.have.property('Enabled');
            
            expect(response.body.Data.TenantId).to.equal(getTestData('LearningPathUpdateModel').TenantId);
            expect(response.body.Data.Name).to.equal(getTestData('LearningPathUpdateModel').Name);
            expect(response.body.Data.Description).to.equal(getTestData('LearningPathUpdateModel').Description);
            expect(response.body.Data.ImageUrl).to.equal(getTestData('LearningPathUpdateModel').ImageUrl);
            expect(response.body.Data.DurationInDays).to.equal(getTestData('LearningPathUpdateModel').DurationInDays);
            expect(response.body.Data.PreferenceWeight).to.equal(getTestData('LearningPathUpdateModel').PreferenceWeight);
            expect(response.body.Data.Enabled).to.equal(getTestData('LearningPathUpdateModel').Enabled);
            
        })
        .expect(200, done);
    });
    
    it('Delete learning-paths', function (done) {
        agent
        .delete(`/api/v1/learning-paths/${getTestData('LEARNING_PATH_ID')}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .expect((response) => {
            expect(response.body).to.have.property('Status');
            expect(response.body.Status).to.equal('success');
        })
        .expect(200, done);
    });
    
    it('Create learning-paths again', function (done) {
        loadLearningPathCreateModel();
        const createModel = getTestData('LearningPathCreateModel');
        agent
        .post('/api/v1/learning-paths')
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .send(createModel)
        .expect((response) => {
            setTestData(response.body.Data.id, 'LEARNING_PATH_ID');
            expect(response.body.Data).to.have.property('TenantId');
            expect(response.body.Data).to.have.property('Name');
            expect(response.body.Data).to.have.property('Description');
            expect(response.body.Data).to.have.property('ImageUrl');
            expect(response.body.Data).to.have.property('DurationInDays');
            expect(response.body.Data).to.have.property('PreferenceWeight');
            expect(response.body.Data).to.have.property('Enabled');
            
            expect(response.body.Data.TenantId).to.equal(getTestData('LearningPathCreateModel').TenantId);
            expect(response.body.Data.Name).to.equal(getTestData('LearningPathCreateModel').Name);
            expect(response.body.Data.Description).to.equal(getTestData('LearningPathCreateModel').Description);
            expect(response.body.Data.ImageUrl).to.equal(getTestData('LearningPathCreateModel').ImageUrl);
            expect(response.body.Data.DurationInDays).to.equal(getTestData('LearningPathCreateModel').DurationInDays);
            expect(response.body.Data.PreferenceWeight).to.equal(getTestData('LearningPathCreateModel').PreferenceWeight);
            expect(response.body.Data.Enabled).to.equal(getTestData('LearningPathCreateModel').Enabled);
            
        })
        .expect(201, done);
    });
});

export const loadLearningPathCreateModel = async (
) => {
    const model = {
        TenantId: getTestData('TENANT_ID'),
        Name: faker.person.fullName(),
        Description: faker.word.words({ count: { min: 1, max: 2 } }),
        ImageUrl: faker.internet.url(),
        DurationInDays: faker.number.int({ min: 1, max: 10000 }),
        PreferenceWeight: faker.number.int({ min: 1, max: 10000 }),
        Enabled: faker.datatype.boolean(),
        
    };
    setTestData(model, 'LearningPathCreateModel');
};

export const loadLearningPathUpdateModel = async (
) => {
    const model = {
        TenantId: getTestData('TENANT_ID'),
        Name: faker.person.fullName(),
        Description: faker.word.words({ count: { min: 1, max: 2 } }),
        ImageUrl: faker.internet.url(),
        DurationInDays: faker.number.int({ min: 1, max: 10000 }),
        PreferenceWeight: faker.number.int({ min: 1, max: 10000 }),
        Enabled: faker.datatype.boolean(),
        
    };
    setTestData(model, 'LearningPathUpdateModel');
};

function loadLearningPathQueryString() {
    const queryString = '?';
    return queryString;
}

