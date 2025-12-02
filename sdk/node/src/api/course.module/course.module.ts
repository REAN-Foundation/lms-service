
import { CourseModuleCreateModel, CourseModuleUpdateModel, CourseModuleSearchParams, ApiResponse } from './course.module.model';
import { APIClient } from '../client';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { faker } from '@faker-js/faker';

export class CourseModule {
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

    public async create(data: Record<string, any>): Promise<ApiResponse<CourseModuleCreateModel>> 
    {
        const validatedData = this.validateDataclass(data, CourseModuleCreateModel);
        return this.apiClient.makeRequest<ApiResponse<CourseModuleCreateModel>>('POST', 'course_modules', validatedData);
    }

    public async getById(course_modules_Id: string): Promise<ApiResponse<CourseModuleCreateModel>> 
    {
        if (typeof course_modules_Id !== 'string') {
            throw new TypeError(`Expected 'course_modules_Id' to be a string, got ${typeof course_modules_Id}.`);
        }
        return this.apiClient.makeRequest<ApiResponse<CourseModuleCreateModel>>('GET', `course_modules/${ course_modules_Id }`);
    }

    public async search(queryParams: Record<string, any>): Promise<ApiResponse<CourseModuleCreateModel[]>> 
    {
        const validatedData = this.validateDataclass(queryParams, CourseModuleSearchParams);
        return this.apiClient.makeRequest<ApiResponse<CourseModuleCreateModel[]>>('GET', `course_modules/search`, validatedData);
    }

    public async update(course_modules_Id: string, data: Record<string, any>): Promise<ApiResponse<CourseModuleCreateModel>> 
    {
        if (typeof course_modules_Id !== 'string') {
            throw new TypeError(`Expected 'course_modules_Id' to be a string, got ${typeof course_modules_Id}.`);
        }
        const validatedData = this.validateDataclass(data, CourseModuleUpdateModel);
        return this.apiClient.makeRequest<ApiResponse<CourseModuleCreateModel>>('PUT', `course_modules/${ course_modules_Id }`, validatedData);
    }

    public async delete(course_modules_Id: string): Promise<ApiResponse<void>> 
    {
        if (typeof course_modules_Id !== 'string') {
            throw new TypeError(`Expected 'course_modules_Id' to be a string, got ${typeof course_modules_Id}.`);
        }
        return this.apiClient.makeRequest<ApiResponse<void>>('DELETE', `course_modules/${ course_modules_Id }`);
    }

    public async courseModuleOperations(): Promise<void> 
    {
        try {
            const courseModuleCreateData = {
            "Name": faker.person.fullName(),
            "Description": faker.lorem.words(3),
            "ImageUrl": faker.internet.url(),
            "DurationInMins": faker.number.int({ max: 9999 }),
            "Sequence": faker.number.int({ max: 9999 }),

            };

            const courseModuleCreate = await this.create(courseModuleCreateData);
            console.log('Create:', JSON.stringify(courseModuleCreate.Data, null, 2));

            const course_modules_Id = courseModuleCreate.Data?.id; 
            if (!course_modules_Id) throw new Error('CourseModule ID not returned.');

            const courseModuleGetById = await this.getById(course_modules_Id);
            console.log('GetById:', JSON.stringify(courseModuleGetById.Data, null, 2));

            const courseModuleSearchData = {
            "Name": faker.person.fullName(),
            "Description": faker.lorem.words(3),
            "ImageUrl": faker.internet.url(),
            "DurationInMins": faker.number.int({ max: 9999 }),
            "Sequence": faker.number.int({ max: 9999 }),

            };
            console.log('Search Params:', courseModuleSearchData);

            const courseModuleSearch = await this.search(courseModuleSearchData);
            console.log('Search:', JSON.stringify(courseModuleSearch.Data, null, 2));

            const courseModuleUpdateData = {
            "Name": faker.person.fullName(),
            "Description": faker.lorem.words(3),
            "ImageUrl": faker.internet.url(),
            "DurationInMins": faker.number.int({ max: 9999 }),
            "Sequence": faker.number.int({ max: 9999 }),

            };

            const courseModuleUpdate = await this.update(course_modules_Id, courseModuleUpdateData);
            console.log('Update:', JSON.stringify(courseModuleUpdate.Data, null, 2));

            const courseModuleDelete = await this.delete(course_modules_Id);
            console.log('Delete:', JSON.stringify(courseModuleDelete.Data, null, 2));

        } catch (error) {
            console.error('Error during course_modules operations:', error);
        }
    }
}