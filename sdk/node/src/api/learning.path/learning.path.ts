
import { LearningPathCreateModel, LearningPathUpdateModel, LearningPathSearchParams, ApiResponse } from './learning.path.model';
import { APIClient } from '../client';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { faker } from '@faker-js/faker';

export class LearningPath {
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

    public async create(data: Record<string, any>): Promise<ApiResponse<LearningPathCreateModel>> 
    {
        const validatedData = this.validateDataclass(data, LearningPathCreateModel);
        return this.apiClient.makeRequest<ApiResponse<LearningPathCreateModel>>('POST', 'learning_paths', validatedData);
    }

    public async getById(learning_paths_Id: string): Promise<ApiResponse<LearningPathCreateModel>> 
    {
        if (typeof learning_paths_Id !== 'string') {
            throw new TypeError(`Expected 'learning_paths_Id' to be a string, got ${typeof learning_paths_Id}.`);
        }
        return this.apiClient.makeRequest<ApiResponse<LearningPathCreateModel>>('GET', `learning_paths/${ learning_paths_Id }`);
    }

    public async search(queryParams: Record<string, any>): Promise<ApiResponse<LearningPathCreateModel[]>> 
    {
        const validatedData = this.validateDataclass(queryParams, LearningPathSearchParams);
        return this.apiClient.makeRequest<ApiResponse<LearningPathCreateModel[]>>('GET', `learning_paths/search`, validatedData);
    }

    public async update(learning_paths_Id: string, data: Record<string, any>): Promise<ApiResponse<LearningPathCreateModel>> 
    {
        if (typeof learning_paths_Id !== 'string') {
            throw new TypeError(`Expected 'learning_paths_Id' to be a string, got ${typeof learning_paths_Id}.`);
        }
        const validatedData = this.validateDataclass(data, LearningPathUpdateModel);
        return this.apiClient.makeRequest<ApiResponse<LearningPathCreateModel>>('PUT', `learning_paths/${ learning_paths_Id }`, validatedData);
    }

    public async delete(learning_paths_Id: string): Promise<ApiResponse<void>> 
    {
        if (typeof learning_paths_Id !== 'string') {
            throw new TypeError(`Expected 'learning_paths_Id' to be a string, got ${typeof learning_paths_Id}.`);
        }
        return this.apiClient.makeRequest<ApiResponse<void>>('DELETE', `learning_paths/${ learning_paths_Id }`);
    }

    public async learningPathOperations(): Promise<void> 
    {
        try {
            const learningPathCreateData = {
            "TenantId": "{{TENANT_ID}}",
            "Name": faker.person.fullName(),
            "Description": faker.lorem.words(3),
            "ImageUrl": faker.internet.url(),
            "DurationInDays": faker.number.int({ max: 9999 }),
            "PreferenceWeight": faker.number.int({ max: 9999 }),
            "Enabled": faker.datatype.boolean(),

            };

            const learningPathCreate = await this.create(learningPathCreateData);
            console.log('Create:', JSON.stringify(learningPathCreate.Data, null, 2));

            const learning_paths_Id = learningPathCreate.Data?.id; 
            if (!learning_paths_Id) throw new Error('LearningPath ID not returned.');

            const learningPathGetById = await this.getById(learning_paths_Id);
            console.log('GetById:', JSON.stringify(learningPathGetById.Data, null, 2));

            const learningPathSearchData = {
            "TenantId": "{{TENANT_ID}}",
            "Name": faker.person.fullName(),
            "Description": faker.lorem.words(3),
            "ImageUrl": faker.internet.url(),
            "DurationInDays": faker.number.int({ max: 9999 }),
            "PreferenceWeight": faker.number.int({ max: 9999 }),
            "Enabled": faker.datatype.boolean(),

            };
            console.log('Search Params:', learningPathSearchData);

            const learningPathSearch = await this.search(learningPathSearchData);
            console.log('Search:', JSON.stringify(learningPathSearch.Data, null, 2));

            const learningPathUpdateData = {
            "TenantId": "{{TENANT_ID}}",
            "Name": faker.person.fullName(),
            "Description": faker.lorem.words(3),
            "ImageUrl": faker.internet.url(),
            "DurationInDays": faker.number.int({ max: 9999 }),
            "PreferenceWeight": faker.number.int({ max: 9999 }),
            "Enabled": faker.datatype.boolean(),

            };

            const learningPathUpdate = await this.update(learning_paths_Id, learningPathUpdateData);
            console.log('Update:', JSON.stringify(learningPathUpdate.Data, null, 2));

            const learningPathDelete = await this.delete(learning_paths_Id);
            console.log('Delete:', JSON.stringify(learningPathDelete.Data, null, 2));

        } catch (error) {
            console.error('Error during learning_paths operations:', error);
        }
    }
}