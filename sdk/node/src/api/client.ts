import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import fs from 'fs';
import CacheUtils from '../common/cache_utils';
import { CourseModule } from '../api/course.module/course.module'
import { CourseContent } from '../api/course.content/course.content'
import { Course } from '../api/course/course'
import { LearningPathCourses } from '../api/learning.path.courses/learning.path.courses'
import { LearningPath } from '../api/learning.path/learning.path'
import { UserLearning } from '../api/user.learning/user.learning'
import { Certificates } from '../api/certificates/certificates'


interface Config {
  API_KEY: string;
}

const config: Config = JSON.parse(fs.readFileSync('./src/config.json', 'utf-8'));
export const BASE_URL = 'http://localhost:5551/api/v1';

export class APIClient {
    private apiKey: string;
    private baseUrl: string = BASE_URL; 
    public accessToken: string | null = null;
    private axiosInstance: AxiosInstance;
public course_modules: CourseModule;
public course_contents: CourseContent;
public courses: Course;
public learning_path_courses: LearningPathCourses;
public learning_paths: LearningPath;
public user_learnings: UserLearning;
public certificates: Certificates;


  constructor() {
    const cache = CacheUtils.loadCache();
    this.apiKey = cache.api_key || config.API_KEY; 
    this.accessToken = cache.access_token || null;

    this.axiosInstance = this.createAxiosInstance();
    this.initializeServices();
  }

  private createAxiosInstance(): AxiosInstance {
    const instance = axios.create({
      baseURL: this.baseUrl,
      headers: this.getHeaders(),
    });

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 403 && this.accessToken) {
          await this.refreshToken();
          const config = error.config;
          config.headers = this.getHeaders();
          return instance.request(config);
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }

  private getHeaders(): Record<string, string> {
    return {
      Authorization: this.accessToken ? `Bearer ${this.accessToken}` : '',
      'x-api-key': this.apiKey, 
      'Content-Type': 'application/json',
    };
  }

  private initializeServices(): void {
this.course_modules = new CourseModule(this);
this.course_contents = new CourseContent(this);
this.courses = new Course(this);
this.learning_path_courses = new LearningPathCourses(this);
this.learning_paths = new LearningPath(this);
this.user_learnings = new UserLearning(this);
this.certificates = new Certificates(this);

  }

  async makeRequest<T>(method: string, endpoint: string, data?: any): Promise<T> {
    try {
        console.log(`Making API request: Method=${method}, Endpoint=${this.baseUrl}${endpoint}, Data=`, data);

        const config: AxiosRequestConfig = {
            method,
            url: endpoint,
            ...(method === 'GET' ? { params: data } : { data }),
            headers: this.getHeaders(),
        };

        const response = await this.axiosInstance.request(config);
        return response.data;
    } catch (error: any) {
        console.error(`Error in API request: ${error.config?.method} ${error.config?.url}`);
        console.error(`Response Data:`, error.response?.data);
        throw new Error(`API Request Failed: ${error.response?.status} - ${error.response?.statusText}`);
    }
  }

  async refreshToken(): Promise<void> {
    try {
      const response = await this.axiosInstance.post('/auth/refresh');
      this.setAccessToken(response.data.access_token);
    } catch (error) {
      this.accessToken = null;
      CacheUtils.clearCache();
      throw new Error('Token refresh failed');
    }
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
    this.axiosInstance = this.createAxiosInstance();
    CacheUtils.saveCache(this.apiKey, this.accessToken);
  }
}