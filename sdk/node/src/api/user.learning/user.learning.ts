
import { UserLearningCreateModel, UserLearningUpdateModel, UserLearningSearchParams, ApiResponse } from './user.learning.model';
import { APIClient } from '../client';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { faker } from '@faker-js/faker';

export class UserLearning {
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

    public async create(data: Record<string, any>): Promise<ApiResponse<UserLearningCreateModel>> 
    {
        const validatedData = this.validateDataclass(data, UserLearningCreateModel);
        return this.apiClient.makeRequest<ApiResponse<UserLearningCreateModel>>('POST', 'user_learnings', validatedData);
    }

    public async getById(user_learnings_Id: string): Promise<ApiResponse<UserLearningCreateModel>> 
    {
        if (typeof user_learnings_Id !== 'string') {
            throw new TypeError(`Expected 'user_learnings_Id' to be a string, got ${typeof user_learnings_Id}.`);
        }
        return this.apiClient.makeRequest<ApiResponse<UserLearningCreateModel>>('GET', `user_learnings/${ user_learnings_Id }`);
    }

    public async search(queryParams: Record<string, any>): Promise<ApiResponse<UserLearningCreateModel[]>> 
    {
        const validatedData = this.validateDataclass(queryParams, UserLearningSearchParams);
        return this.apiClient.makeRequest<ApiResponse<UserLearningCreateModel[]>>('GET', `user_learnings/search`, validatedData);
    }

    public async update(user_learnings_Id: string, data: Record<string, any>): Promise<ApiResponse<UserLearningCreateModel>> 
    {
        if (typeof user_learnings_Id !== 'string') {
            throw new TypeError(`Expected 'user_learnings_Id' to be a string, got ${typeof user_learnings_Id}.`);
        }
        const validatedData = this.validateDataclass(data, UserLearningUpdateModel);
        return this.apiClient.makeRequest<ApiResponse<UserLearningCreateModel>>('PUT', `user_learnings/${ user_learnings_Id }`, validatedData);
    }

    public async delete(user_learnings_Id: string): Promise<ApiResponse<void>> 
    {
        if (typeof user_learnings_Id !== 'string') {
            throw new TypeError(`Expected 'user_learnings_Id' to be a string, got ${typeof user_learnings_Id}.`);
        }
        return this.apiClient.makeRequest<ApiResponse<void>>('DELETE', `user_learnings/${ user_learnings_Id }`);
    }

    public async userLearningOperations(): Promise<void> 
    {
        try {
            const userLearningCreateData = {
            "UserId": "{{USER_ID}}",
            "ActionId": "{{ACTION_ID}}",
            "ProgressStatus": "InProgress",
            "PercentageCompletion": faker.number.int({ max: 9999 }),

            };

            const userLearningCreate = await this.create(userLearningCreateData);
            console.log('Create:', JSON.stringify(userLearningCreate.Data, null, 2));

            const user_learnings_Id = userLearningCreate.Data?.id; 
            if (!user_learnings_Id) throw new Error('UserLearning ID not returned.');

            const userLearningGetById = await this.getById(user_learnings_Id);
            console.log('GetById:', JSON.stringify(userLearningGetById.Data, null, 2));

            const userLearningSearchData = {
            "UserId": "{{USER_ID}}",
            "ActionId": "{{ACTION_ID}}",
            "ProgressStatus": "InProgress",
            "PercentageCompletion": faker.number.int({ max: 9999 }),

            };
            console.log('Search Params:', userLearningSearchData);

            const userLearningSearch = await this.search(userLearningSearchData);
            console.log('Search:', JSON.stringify(userLearningSearch.Data, null, 2));

            const userLearningUpdateData = {
            "UserId": "{{USER_ID}}",
            "ActionId": "{{ACTION_ID}}",
            "ProgressStatus": "InProgress",
            "PercentageCompletion": faker.number.int({ max: 9999 }),

            };

            const userLearningUpdate = await this.update(user_learnings_Id, userLearningUpdateData);
            console.log('Update:', JSON.stringify(userLearningUpdate.Data, null, 2));

            const userLearningDelete = await this.delete(user_learnings_Id);
            console.log('Delete:', JSON.stringify(userLearningDelete.Data, null, 2));

        } catch (error) {
            console.error('Error during user_learnings operations:', error);
        }
    }
}