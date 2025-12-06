
import { CourseContentCreateModel, CourseContentUpdateModel, CourseContentSearchParams, ApiResponse } from './course.content.model';
import { APIClient } from '../client';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { faker } from '@faker-js/faker';

export class CourseContent {
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

    public async create(data: Record<string, any>): Promise<ApiResponse<CourseContentCreateModel>> 
    {
        const validatedData = this.validateDataclass(data, CourseContentCreateModel);
        return this.apiClient.makeRequest<ApiResponse<CourseContentCreateModel>>('POST', 'course_contents', validatedData);
    }

    public async getById(course_contents_Id: string): Promise<ApiResponse<CourseContentCreateModel>> 
    {
        if (typeof course_contents_Id !== 'string') {
            throw new TypeError(`Expected 'course_contents_Id' to be a string, got ${typeof course_contents_Id}.`);
        }
        return this.apiClient.makeRequest<ApiResponse<CourseContentCreateModel>>('GET', `course_contents/${ course_contents_Id }`);
    }

    public async search(queryParams: Record<string, any>): Promise<ApiResponse<CourseContentCreateModel[]>> 
    {
        const validatedData = this.validateDataclass(queryParams, CourseContentSearchParams);
        return this.apiClient.makeRequest<ApiResponse<CourseContentCreateModel[]>>('GET', `course_contents/search`, validatedData);
    }

    public async update(course_contents_Id: string, data: Record<string, any>): Promise<ApiResponse<CourseContentCreateModel>> 
    {
        if (typeof course_contents_Id !== 'string') {
            throw new TypeError(`Expected 'course_contents_Id' to be a string, got ${typeof course_contents_Id}.`);
        }
        const validatedData = this.validateDataclass(data, CourseContentUpdateModel);
        return this.apiClient.makeRequest<ApiResponse<CourseContentCreateModel>>('PUT', `course_contents/${ course_contents_Id }`, validatedData);
    }

    public async delete(course_contents_Id: string): Promise<ApiResponse<void>> 
    {
        if (typeof course_contents_Id !== 'string') {
            throw new TypeError(`Expected 'course_contents_Id' to be a string, got ${typeof course_contents_Id}.`);
        }
        return this.apiClient.makeRequest<ApiResponse<void>>('DELETE', `course_contents/${ course_contents_Id }`);
    }

    public async courseContentOperations(): Promise<void> 
    {
        try {
            const courseContentCreateData = {
            "Title": faker.lorem.sentence(3),
            "Description": faker.lorem.words(3),
            "ImageUrl": faker.internet.url(),
            "DurationInMins": faker.number.int({ max: 9999 }),
            "ContentType": "Text",
            "ResourceLink": faker.lorem.sentence(3),
            "ActionTemplateId": "{{ACTION_TEMPLATE_ID}}",
            "Sequence": faker.number.int({ max: 9999 }),

            };

            const courseContentCreate = await this.create(courseContentCreateData);
            console.log('Create:', JSON.stringify(courseContentCreate.Data, null, 2));

            const course_contents_Id = courseContentCreate.Data?.id; 
            if (!course_contents_Id) throw new Error('CourseContent ID not returned.');

            const courseContentGetById = await this.getById(course_contents_Id);
            console.log('GetById:', JSON.stringify(courseContentGetById.Data, null, 2));

            const courseContentSearchData = {
            "Title": faker.lorem.sentence(3),
            "Description": faker.lorem.words(3),
            "ImageUrl": faker.internet.url(),
            "DurationInMins": faker.number.int({ max: 9999 }),
            "ContentType": "Text",
            "ResourceLink": faker.lorem.sentence(3),
            "ActionTemplateId": "{{ACTION_TEMPLATE_ID}}",
            "Sequence": faker.number.int({ max: 9999 }),

            };
            console.log('Search Params:', courseContentSearchData);

            const courseContentSearch = await this.search(courseContentSearchData);
            console.log('Search:', JSON.stringify(courseContentSearch.Data, null, 2));

            const courseContentUpdateData = {
            "Title": faker.lorem.sentence(3),
            "Description": faker.lorem.words(3),
            "ImageUrl": faker.internet.url(),
            "DurationInMins": faker.number.int({ max: 9999 }),
            "ContentType": "Text",
            "ResourceLink": faker.lorem.sentence(3),
            "ActionTemplateId": "{{ACTION_TEMPLATE_ID}}",
            "Sequence": faker.number.int({ max: 9999 }),

            };

            const courseContentUpdate = await this.update(course_contents_Id, courseContentUpdateData);
            console.log('Update:', JSON.stringify(courseContentUpdate.Data, null, 2));

            const courseContentDelete = await this.delete(course_contents_Id);
            console.log('Delete:', JSON.stringify(courseContentDelete.Data, null, 2));

        } catch (error) {
            console.error('Error during course_contents operations:', error);
        }
    }
}