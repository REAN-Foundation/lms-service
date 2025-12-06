
import { CourseCreateModel, CourseUpdateModel, CourseSearchParams, ApiResponse } from './course.model';
import { APIClient } from '../client';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { faker } from '@faker-js/faker';

export class Course {
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

    public async create(data: Record<string, any>): Promise<ApiResponse<CourseCreateModel>> 
    {
        const validatedData = this.validateDataclass(data, CourseCreateModel);
        return this.apiClient.makeRequest<ApiResponse<CourseCreateModel>>('POST', 'courses', validatedData);
    }

    public async getById(courses_Id: string): Promise<ApiResponse<CourseCreateModel>> 
    {
        if (typeof courses_Id !== 'string') {
            throw new TypeError(`Expected 'courses_Id' to be a string, got ${typeof courses_Id}.`);
        }
        return this.apiClient.makeRequest<ApiResponse<CourseCreateModel>>('GET', `courses/${ courses_Id }`);
    }

    public async search(queryParams: Record<string, any>): Promise<ApiResponse<CourseCreateModel[]>> 
    {
        const validatedData = this.validateDataclass(queryParams, CourseSearchParams);
        return this.apiClient.makeRequest<ApiResponse<CourseCreateModel[]>>('GET', `courses/search`, validatedData);
    }

    public async update(courses_Id: string, data: Record<string, any>): Promise<ApiResponse<CourseCreateModel>> 
    {
        if (typeof courses_Id !== 'string') {
            throw new TypeError(`Expected 'courses_Id' to be a string, got ${typeof courses_Id}.`);
        }
        const validatedData = this.validateDataclass(data, CourseUpdateModel);
        return this.apiClient.makeRequest<ApiResponse<CourseCreateModel>>('PUT', `courses/${ courses_Id }`, validatedData);
    }

    public async delete(courses_Id: string): Promise<ApiResponse<void>> 
    {
        if (typeof courses_Id !== 'string') {
            throw new TypeError(`Expected 'courses_Id' to be a string, got ${typeof courses_Id}.`);
        }
        return this.apiClient.makeRequest<ApiResponse<void>>('DELETE', `courses/${ courses_Id }`);
    }

    public async courseOperations(): Promise<void> 
    {
        try {
            const courseCreateData = {
            "TenantId": "{{TENANT_ID}}",
            "Name": faker.person.fullName(),
            "Description": faker.lorem.words(3),
            "ImageUrl": faker.internet.url(),
            "DurationInDays": faker.number.int({ max: 9999 }),

            };

            const courseCreate = await this.create(courseCreateData);
            console.log('Create:', JSON.stringify(courseCreate.Data, null, 2));

            const courses_Id = courseCreate.Data?.id; 
            if (!courses_Id) throw new Error('Course ID not returned.');

            const courseGetById = await this.getById(courses_Id);
            console.log('GetById:', JSON.stringify(courseGetById.Data, null, 2));

            const courseSearchData = {
            "TenantId": "{{TENANT_ID}}",
            "Name": faker.person.fullName(),
            "Description": faker.lorem.words(3),
            "ImageUrl": faker.internet.url(),
            "DurationInDays": faker.number.int({ max: 9999 }),

            };
            console.log('Search Params:', courseSearchData);

            const courseSearch = await this.search(courseSearchData);
            console.log('Search:', JSON.stringify(courseSearch.Data, null, 2));

            const courseUpdateData = {
            "TenantId": "{{TENANT_ID}}",
            "Name": faker.person.fullName(),
            "Description": faker.lorem.words(3),
            "ImageUrl": faker.internet.url(),
            "DurationInDays": faker.number.int({ max: 9999 }),

            };

            const courseUpdate = await this.update(courses_Id, courseUpdateData);
            console.log('Update:', JSON.stringify(courseUpdate.Data, null, 2));

            const courseDelete = await this.delete(courses_Id);
            console.log('Delete:', JSON.stringify(courseDelete.Data, null, 2));

        } catch (error) {
            console.error('Error during courses operations:', error);
        }
    }
}