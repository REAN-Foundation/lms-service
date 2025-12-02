
import { LearningPathCoursesCreateModel, LearningPathCoursesUpdateModel, LearningPathCoursesSearchParams, ApiResponse } from './learning.path.courses.model';
import { APIClient } from '../client';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { faker } from '@faker-js/faker';

export class LearningPathCourses {
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

    public async create(data: Record<string, any>): Promise<ApiResponse<LearningPathCoursesCreateModel>> 
    {
        const validatedData = this.validateDataclass(data, LearningPathCoursesCreateModel);
        return this.apiClient.makeRequest<ApiResponse<LearningPathCoursesCreateModel>>('POST', 'learning_path_courses', validatedData);
    }

    public async getById(learning_path_courses_Id: string): Promise<ApiResponse<LearningPathCoursesCreateModel>> 
    {
        if (typeof learning_path_courses_Id !== 'string') {
            throw new TypeError(`Expected 'learning_path_courses_Id' to be a string, got ${typeof learning_path_courses_Id}.`);
        }
        return this.apiClient.makeRequest<ApiResponse<LearningPathCoursesCreateModel>>('GET', `learning_path_courses/${ learning_path_courses_Id }`);
    }

    public async search(queryParams: Record<string, any>): Promise<ApiResponse<LearningPathCoursesCreateModel[]>> 
    {
        const validatedData = this.validateDataclass(queryParams, LearningPathCoursesSearchParams);
        return this.apiClient.makeRequest<ApiResponse<LearningPathCoursesCreateModel[]>>('GET', `learning_path_courses/search`, validatedData);
    }

    public async update(learning_path_courses_Id: string, data: Record<string, any>): Promise<ApiResponse<LearningPathCoursesCreateModel>> 
    {
        if (typeof learning_path_courses_Id !== 'string') {
            throw new TypeError(`Expected 'learning_path_courses_Id' to be a string, got ${typeof learning_path_courses_Id}.`);
        }
        const validatedData = this.validateDataclass(data, LearningPathCoursesUpdateModel);
        return this.apiClient.makeRequest<ApiResponse<LearningPathCoursesCreateModel>>('PUT', `learning_path_courses/${ learning_path_courses_Id }`, validatedData);
    }

    public async delete(learning_path_courses_Id: string): Promise<ApiResponse<void>> 
    {
        if (typeof learning_path_courses_Id !== 'string') {
            throw new TypeError(`Expected 'learning_path_courses_Id' to be a string, got ${typeof learning_path_courses_Id}.`);
        }
        return this.apiClient.makeRequest<ApiResponse<void>>('DELETE', `learning_path_courses/${ learning_path_courses_Id }`);
    }

    public async learningPathCoursesOperations(): Promise<void> 
    {
        try {
            const learningPathCoursesCreateData = {

            };

            const learningPathCoursesCreate = await this.create(learningPathCoursesCreateData);
            console.log('Create:', JSON.stringify(learningPathCoursesCreate.Data, null, 2));

            const learning_path_courses_Id = learningPathCoursesCreate.Data?.id; 
            if (!learning_path_courses_Id) throw new Error('LearningPathCourses ID not returned.');

            const learningPathCoursesGetById = await this.getById(learning_path_courses_Id);
            console.log('GetById:', JSON.stringify(learningPathCoursesGetById.Data, null, 2));

            const learningPathCoursesSearchData = {

            };
            console.log('Search Params:', learningPathCoursesSearchData);

            const learningPathCoursesSearch = await this.search(learningPathCoursesSearchData);
            console.log('Search:', JSON.stringify(learningPathCoursesSearch.Data, null, 2));

            const learningPathCoursesUpdateData = {

            };

            const learningPathCoursesUpdate = await this.update(learning_path_courses_Id, learningPathCoursesUpdateData);
            console.log('Update:', JSON.stringify(learningPathCoursesUpdate.Data, null, 2));

            const learningPathCoursesDelete = await this.delete(learning_path_courses_Id);
            console.log('Delete:', JSON.stringify(learningPathCoursesDelete.Data, null, 2));

        } catch (error) {
            console.error('Error during learning_path_courses operations:', error);
        }
    }
}