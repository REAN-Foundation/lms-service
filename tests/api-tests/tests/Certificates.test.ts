
import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import  Application  from '../../../src/app';
import { setTestData, getTestData } from '../init';

const infra = Application.instance();

describe('Certificates API tests', function () {
    var agent = request.agent(infra._expressApp);
    
    it('Create certificates', function (done) {
        loadCertificatesCreateModel();
        const createModel = getTestData('CertificatesCreateModel');
        agent
        .post('/api/v1/certificates')
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .send(createModel)
        .expect((response) => {
            setTestData(response.body.Data.id, 'CERTIFICATES_ID');
            expect(response.body.Data).to.have.property('CourseId');
            expect(response.body.Data).to.have.property('UserId');
            expect(response.body.Data).to.have.property('CertificateNumber');
            expect(response.body.Data).to.have.property('CertificateName');
            expect(response.body.Data).to.have.property('CertificateType');
            expect(response.body.Data).to.have.property('IssuedDate');
            expect(response.body.Data).to.have.property('ExpiryDate');
            expect(response.body.Data).to.have.property('CertificateUrl');
            expect(response.body.Data).to.have.property('FinalGrade');
            expect(response.body.Data).to.have.property('CreditHours');
            expect(response.body.Data).to.have.property('Skills');
            expect(response.body.Data).to.have.property('IsVerified');
            expect(response.body.Data).to.have.property('VerificationUrl');
            expect(response.body.Data).to.have.property('IssuedBy');
            
            expect(response.body.Data.CourseId).to.equal(getTestData('CertificatesCreateModel').CourseId);
            expect(response.body.Data.UserId).to.equal(getTestData('CertificatesCreateModel').UserId);
            expect(response.body.Data.CertificateNumber).to.equal(getTestData('CertificatesCreateModel').CertificateNumber);
            expect(response.body.Data.CertificateName).to.equal(getTestData('CertificatesCreateModel').CertificateName);
            expect(response.body.Data.CertificateType).to.equal(getTestData('CertificatesCreateModel').CertificateType);
            expect(response.body.Data.IssuedDate).to.equal(getTestData('CertificatesCreateModel').IssuedDate);
            expect(response.body.Data.ExpiryDate).to.equal(getTestData('CertificatesCreateModel').ExpiryDate);
            expect(response.body.Data.CertificateUrl).to.equal(getTestData('CertificatesCreateModel').CertificateUrl);
            expect(response.body.Data.FinalGrade).to.equal(getTestData('CertificatesCreateModel').FinalGrade);
            expect(response.body.Data.CreditHours).to.equal(getTestData('CertificatesCreateModel').CreditHours);
            expect(response.body.Data.Skills).to.equal(getTestData('CertificatesCreateModel').Skills);
            expect(response.body.Data.IsVerified).to.equal(getTestData('CertificatesCreateModel').IsVerified);
            expect(response.body.Data.VerificationUrl).to.equal(getTestData('CertificatesCreateModel').VerificationUrl);
            expect(response.body.Data.IssuedBy).to.equal(getTestData('CertificatesCreateModel').IssuedBy);
            
        })
        .expect(201, done);
    });
    
    it('Get certificates by id', function (done) {
        agent
        .get(`/api/v1/certificates/${getTestData('CERTIFICATES_ID')}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .expect((response) => {
            expect(response.body.Data).to.have.property('CourseId');
            expect(response.body.Data).to.have.property('UserId');
            expect(response.body.Data).to.have.property('CertificateNumber');
            expect(response.body.Data).to.have.property('CertificateName');
            expect(response.body.Data).to.have.property('CertificateType');
            expect(response.body.Data).to.have.property('IssuedDate');
            expect(response.body.Data).to.have.property('ExpiryDate');
            expect(response.body.Data).to.have.property('CertificateUrl');
            expect(response.body.Data).to.have.property('FinalGrade');
            expect(response.body.Data).to.have.property('CreditHours');
            expect(response.body.Data).to.have.property('Skills');
            expect(response.body.Data).to.have.property('IsVerified');
            expect(response.body.Data).to.have.property('VerificationUrl');
            expect(response.body.Data).to.have.property('IssuedBy');
            
            expect(response.body.Data.CourseId).to.equal(getTestData('CertificatesCreateModel').CourseId);
            expect(response.body.Data.UserId).to.equal(getTestData('CertificatesCreateModel').UserId);
            expect(response.body.Data.CertificateNumber).to.equal(getTestData('CertificatesCreateModel').CertificateNumber);
            expect(response.body.Data.CertificateName).to.equal(getTestData('CertificatesCreateModel').CertificateName);
            expect(response.body.Data.CertificateType).to.equal(getTestData('CertificatesCreateModel').CertificateType);
            expect(response.body.Data.IssuedDate).to.equal(getTestData('CertificatesCreateModel').IssuedDate);
            expect(response.body.Data.ExpiryDate).to.equal(getTestData('CertificatesCreateModel').ExpiryDate);
            expect(response.body.Data.CertificateUrl).to.equal(getTestData('CertificatesCreateModel').CertificateUrl);
            expect(response.body.Data.FinalGrade).to.equal(getTestData('CertificatesCreateModel').FinalGrade);
            expect(response.body.Data.CreditHours).to.equal(getTestData('CertificatesCreateModel').CreditHours);
            expect(response.body.Data.Skills).to.equal(getTestData('CertificatesCreateModel').Skills);
            expect(response.body.Data.IsVerified).to.equal(getTestData('CertificatesCreateModel').IsVerified);
            expect(response.body.Data.VerificationUrl).to.equal(getTestData('CertificatesCreateModel').VerificationUrl);
            expect(response.body.Data.IssuedBy).to.equal(getTestData('CertificatesCreateModel').IssuedBy);
            
        })
        .expect(200, done);
    });
    
    it('Search certificates records', function (done) {
        loadCertificatesQueryString();
        agent
        .get(`/api/v1/certificates/search${loadCertificatesQueryString()}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .expect((response) => {
            expect(response.body.Data.CertificatesRecords).to.have.property('TotalCount');
            expect(response.body.Data.CertificatesRecords).to.have.property('RetrievedCount');
            expect(response.body.Data.CertificatesRecords).to.have.property('PageIndex');
            expect(response.body.Data.CertificatesRecords).to.have.property('ItemsPerPage');
            expect(response.body.Data.CertificatesRecords).to.have.property('Order');
            expect(response.body.Data.CertificatesRecords.TotalCount).to.be.greaterThan(0);
            expect(response.body.Data.CertificatesRecords.RetrievedCount).to.be.greaterThan(0);
            expect(response.body.Data.CertificatesRecords.Items.length).to.be.greaterThan(0);
        })
        .expect(200, done);
    });
    
    it('Update certificates', function (done) {
        loadCertificatesUpdateModel();
        const updateModel = getTestData('CertificatesUpdateModel');
        agent
        .put(`/api/v1/certificates/${getTestData('CERTIFICATES_ID')}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .send(updateModel)
        .expect((response) => {
            expect(response.body.Data).to.have.property('CourseId');
            expect(response.body.Data).to.have.property('UserId');
            expect(response.body.Data).to.have.property('CertificateNumber');
            expect(response.body.Data).to.have.property('CertificateName');
            expect(response.body.Data).to.have.property('CertificateType');
            expect(response.body.Data).to.have.property('IssuedDate');
            expect(response.body.Data).to.have.property('ExpiryDate');
            expect(response.body.Data).to.have.property('CertificateUrl');
            expect(response.body.Data).to.have.property('FinalGrade');
            expect(response.body.Data).to.have.property('CreditHours');
            expect(response.body.Data).to.have.property('Skills');
            expect(response.body.Data).to.have.property('IsVerified');
            expect(response.body.Data).to.have.property('VerificationUrl');
            expect(response.body.Data).to.have.property('IssuedBy');
            
            expect(response.body.Data.CourseId).to.equal(getTestData('CertificatesUpdateModel').CourseId);
            expect(response.body.Data.UserId).to.equal(getTestData('CertificatesUpdateModel').UserId);
            expect(response.body.Data.CertificateNumber).to.equal(getTestData('CertificatesUpdateModel').CertificateNumber);
            expect(response.body.Data.CertificateName).to.equal(getTestData('CertificatesUpdateModel').CertificateName);
            expect(response.body.Data.CertificateType).to.equal(getTestData('CertificatesUpdateModel').CertificateType);
            expect(response.body.Data.IssuedDate).to.equal(getTestData('CertificatesUpdateModel').IssuedDate);
            expect(response.body.Data.ExpiryDate).to.equal(getTestData('CertificatesUpdateModel').ExpiryDate);
            expect(response.body.Data.CertificateUrl).to.equal(getTestData('CertificatesUpdateModel').CertificateUrl);
            expect(response.body.Data.FinalGrade).to.equal(getTestData('CertificatesUpdateModel').FinalGrade);
            expect(response.body.Data.CreditHours).to.equal(getTestData('CertificatesUpdateModel').CreditHours);
            expect(response.body.Data.Skills).to.equal(getTestData('CertificatesUpdateModel').Skills);
            expect(response.body.Data.IsVerified).to.equal(getTestData('CertificatesUpdateModel').IsVerified);
            expect(response.body.Data.VerificationUrl).to.equal(getTestData('CertificatesUpdateModel').VerificationUrl);
            expect(response.body.Data.IssuedBy).to.equal(getTestData('CertificatesUpdateModel').IssuedBy);
            
        })
        .expect(200, done);
    });
    
    it('Delete certificates', function (done) {
        agent
        .delete(`/api/v1/certificates/${getTestData('CERTIFICATES_ID')}`)
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .expect((response) => {
            expect(response.body).to.have.property('Status');
            expect(response.body.Status).to.equal('success');
        })
        .expect(200, done);
    });
    
    it('Create certificates again', function (done) {
        loadCertificatesCreateModel();
        const createModel = getTestData('CertificatesCreateModel');
        agent
        .post('/api/v1/certificates')
        .set('Content-Type', 'application/json')
        .set('x-api-key', `${process.env.TEST_API_KEY}`)
        .set('Authorization', `Bearer ${process.env.JWT_ACCESS_TOKEN}`)
        .send(createModel)
        .expect((response) => {
            setTestData(response.body.Data.id, 'CERTIFICATES_ID');
            expect(response.body.Data).to.have.property('CourseId');
            expect(response.body.Data).to.have.property('UserId');
            expect(response.body.Data).to.have.property('CertificateNumber');
            expect(response.body.Data).to.have.property('CertificateName');
            expect(response.body.Data).to.have.property('CertificateType');
            expect(response.body.Data).to.have.property('IssuedDate');
            expect(response.body.Data).to.have.property('ExpiryDate');
            expect(response.body.Data).to.have.property('CertificateUrl');
            expect(response.body.Data).to.have.property('FinalGrade');
            expect(response.body.Data).to.have.property('CreditHours');
            expect(response.body.Data).to.have.property('Skills');
            expect(response.body.Data).to.have.property('IsVerified');
            expect(response.body.Data).to.have.property('VerificationUrl');
            expect(response.body.Data).to.have.property('IssuedBy');
            
            expect(response.body.Data.CourseId).to.equal(getTestData('CertificatesCreateModel').CourseId);
            expect(response.body.Data.UserId).to.equal(getTestData('CertificatesCreateModel').UserId);
            expect(response.body.Data.CertificateNumber).to.equal(getTestData('CertificatesCreateModel').CertificateNumber);
            expect(response.body.Data.CertificateName).to.equal(getTestData('CertificatesCreateModel').CertificateName);
            expect(response.body.Data.CertificateType).to.equal(getTestData('CertificatesCreateModel').CertificateType);
            expect(response.body.Data.IssuedDate).to.equal(getTestData('CertificatesCreateModel').IssuedDate);
            expect(response.body.Data.ExpiryDate).to.equal(getTestData('CertificatesCreateModel').ExpiryDate);
            expect(response.body.Data.CertificateUrl).to.equal(getTestData('CertificatesCreateModel').CertificateUrl);
            expect(response.body.Data.FinalGrade).to.equal(getTestData('CertificatesCreateModel').FinalGrade);
            expect(response.body.Data.CreditHours).to.equal(getTestData('CertificatesCreateModel').CreditHours);
            expect(response.body.Data.Skills).to.equal(getTestData('CertificatesCreateModel').Skills);
            expect(response.body.Data.IsVerified).to.equal(getTestData('CertificatesCreateModel').IsVerified);
            expect(response.body.Data.VerificationUrl).to.equal(getTestData('CertificatesCreateModel').VerificationUrl);
            expect(response.body.Data.IssuedBy).to.equal(getTestData('CertificatesCreateModel').IssuedBy);
            
        })
        .expect(201, done);
    });
});

export const loadCertificatesCreateModel = async (
) => {
    const model = {
        CourseId: getTestData('COURSE_ID'),
        UserId: getTestData('USER_ID'),
        CertificateNumber: faker.lorem.sentence(3),
        CertificateName: faker.person.fullName(),
        CertificateType: faker.lorem.sentence(3),
        IssuedDate: faker.lorem.sentence(3),
        ExpiryDate: faker.date.past().toISOString(),
        CertificateUrl: faker.internet.url(),
        FinalGrade: faker.number.float({ min: 10, max: 100, multipleOf: 0.02 }),
        CreditHours: faker.number.int({ min: 1, max: 10000 }),
        Skills: faker.lorem.sentence(3),
        IsVerified: faker.datatype.boolean(),
        VerificationUrl: faker.internet.url(),
        IssuedBy: faker.string.uuid(),
        
    };
    setTestData(model, 'CertificatesCreateModel');
};

export const loadCertificatesUpdateModel = async (
) => {
    const model = {
        CourseId: getTestData('COURSE_ID'),
        UserId: getTestData('USER_ID'),
        CertificateNumber: faker.lorem.sentence(3),
        CertificateName: faker.person.fullName(),
        CertificateType: faker.lorem.sentence(3),
        IssuedDate: faker.lorem.sentence(3),
        ExpiryDate: faker.date.past().toISOString(),
        CertificateUrl: faker.internet.url(),
        FinalGrade: faker.number.float({ min: 10, max: 100, multipleOf: 0.02 }),
        CreditHours: faker.number.int({ min: 1, max: 10000 }),
        Skills: faker.lorem.sentence(3),
        IsVerified: faker.datatype.boolean(),
        VerificationUrl: faker.internet.url(),
        IssuedBy: faker.string.uuid(),
        
    };
    setTestData(model, 'CertificatesUpdateModel');
};

function loadCertificatesQueryString() {
    const queryString = '?';
    return queryString;
}

