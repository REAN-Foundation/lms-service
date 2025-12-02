
import { CertificatesCreateModel, CertificatesUpdateModel, CertificatesSearchParams, ApiResponse } from './certificates.model';
import { APIClient } from '../client';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { faker } from '@faker-js/faker';

export class Certificates {
    constructor(private apiClient: APIClient) {}

    private validateDataclass<T extends object>(data: Record<string, any>, DataClass: new () => T): T 
    {
        const instance = plainToInstance(DataClass, data as Partial<T>); 
        const errors = validateSync(instance);
        if (errors.length > 0) {
            throw new Error(`Validation failed: ${JSON.stringify(errors)}`);
        }
        return instance;
    }

    public async create(data: Record<string, any>): Promise<ApiResponse<CertificatesCreateModel>> 
    {
        const validatedData = this.validateDataclass(data, CertificatesCreateModel);
        return this.apiClient.makeRequest<ApiResponse<CertificatesCreateModel>>('POST', 'certificates', validatedData);
    }

    public async getById(certificates_Id: string): Promise<ApiResponse<CertificatesCreateModel>> 
    {
        if (typeof certificates_Id !== 'string') {
            throw new TypeError(`Expected 'certificates_Id' to be a string, got ${typeof certificates_Id}.`);
        }
        return this.apiClient.makeRequest<ApiResponse<CertificatesCreateModel>>('GET', `certificates/${ certificates_Id }`);
    }

    public async search(queryParams: Record<string, any>): Promise<ApiResponse<CertificatesCreateModel[]>> 
    {
        const validatedData = this.validateDataclass(queryParams, CertificatesSearchParams);
        return this.apiClient.makeRequest<ApiResponse<CertificatesCreateModel[]>>('GET', `certificates/search`, validatedData);
    }

    public async update(certificates_Id: string, data: Record<string, any>): Promise<ApiResponse<CertificatesCreateModel>> 
    {
        if (typeof certificates_Id !== 'string') {
            throw new TypeError(`Expected 'certificates_Id' to be a string, got ${typeof certificates_Id}.`);
        }
        const validatedData = this.validateDataclass(data, CertificatesUpdateModel);
        return this.apiClient.makeRequest<ApiResponse<CertificatesCreateModel>>('PUT', `certificates/${ certificates_Id }`, validatedData);
    }

    public async delete(certificates_Id: string): Promise<ApiResponse<void>> 
    {
        if (typeof certificates_Id !== 'string') {
            throw new TypeError(`Expected 'certificates_Id' to be a string, got ${typeof certificates_Id}.`);
        }
        return this.apiClient.makeRequest<ApiResponse<void>>('DELETE', `certificates/${ certificates_Id }`);
    }

    public async certificatesOperations(): Promise<void> 
    {
        try {
            const certificatesCreateData = {
            "UserId": "{{USER_ID}}",
            "CertificateNumber": faker.lorem.sentence(3),
            "CertificateName": faker.person.fullName(),
            "CertificateType": faker.lorem.sentence(3),
            "IssuedDate": faker.lorem.sentence(3),
            "ExpiryDate": faker.date.recent().toISOString(),
            "CertificateUrl": faker.internet.url(),
            "FinalGrade": faker.number.float({ min: 1, max: 100 }),
            "CreditHours": faker.number.int({ max: 9999 }),
            "Skills": faker.lorem.sentence(3),
            "IsVerified": faker.datatype.boolean(),
            "VerificationUrl": faker.internet.url(),
            "IssuedBy": faker.string.uuid(),

            };

            const certificatesCreate = await this.create(certificatesCreateData);
            console.log('Create:', JSON.stringify(certificatesCreate.Data, null, 2));

            const certificates_Id = certificatesCreate.Data?.id; 
            if (!certificates_Id) throw new Error('Certificates ID not returned.');

            const certificatesGetById = await this.getById(certificates_Id);
            console.log('GetById:', JSON.stringify(certificatesGetById.Data, null, 2));

            const certificatesSearchData = {
            "UserId": "{{USER_ID}}",
            "CertificateNumber": faker.lorem.sentence(3),
            "CertificateName": faker.person.fullName(),
            "CertificateType": faker.lorem.sentence(3),
            "IssuedDate": faker.lorem.sentence(3),
            "ExpiryDate": faker.date.recent().toISOString(),
            "CertificateUrl": faker.internet.url(),
            "FinalGrade": faker.number.float({ min: 1, max: 100 }),
            "CreditHours": faker.number.int({ max: 9999 }),
            "Skills": faker.lorem.sentence(3),
            "IsVerified": faker.datatype.boolean(),
            "VerificationUrl": faker.internet.url(),
            "IssuedBy": faker.string.uuid(),

            };
            console.log('Search Params:', certificatesSearchData);

            const certificatesSearch = await this.search(certificatesSearchData);
            console.log('Search:', JSON.stringify(certificatesSearch.Data, null, 2));

            const certificatesUpdateData = {
            "UserId": "{{USER_ID}}",
            "CertificateNumber": faker.lorem.sentence(3),
            "CertificateName": faker.person.fullName(),
            "CertificateType": faker.lorem.sentence(3),
            "IssuedDate": faker.lorem.sentence(3),
            "ExpiryDate": faker.date.recent().toISOString(),
            "CertificateUrl": faker.internet.url(),
            "FinalGrade": faker.number.float({ min: 1, max: 100 }),
            "CreditHours": faker.number.int({ max: 9999 }),
            "Skills": faker.lorem.sentence(3),
            "IsVerified": faker.datatype.boolean(),
            "VerificationUrl": faker.internet.url(),
            "IssuedBy": faker.string.uuid(),

            };

            const certificatesUpdate = await this.update(certificates_Id, certificatesUpdateData);
            console.log('Update:', JSON.stringify(certificatesUpdate.Data, null, 2));

            const certificatesDelete = await this.delete(certificates_Id);
            console.log('Delete:', JSON.stringify(certificatesDelete.Data, null, 2));

        } catch (error) {
            console.error('Error during certificates operations:', error);
        }
    }
}