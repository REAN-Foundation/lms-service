import { AuthOptions, RequestType, ResourceOwnership, ActionScope, DefaultAuthOptions } from '../../auth/auth.types';

///////////////////////////////////////////////////////////////////////////////////////

export class LearningPathAuth {
    static readonly _baseContext = `LearningPath`;

    static readonly create: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.Create`,
        Ownership: ResourceOwnership.Tenant,
        ActionScope: ActionScope.Tenant,
        RequestType: RequestType.CreateOne,
    };

    static readonly update: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.Update`,
        Ownership: ResourceOwnership.Tenant,
        ActionScope: ActionScope.Tenant,
        RequestType: RequestType.UpdateOne,
    };

    static readonly delete: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.Delete`,
        Ownership: ResourceOwnership.Tenant,
        ActionScope: ActionScope.Tenant,
        RequestType: RequestType.DeleteOne,
    };

    static readonly search: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.Search`,
        Ownership: ResourceOwnership.Tenant,
        ActionScope: ActionScope.Tenant,
        RequestType: RequestType.Search,
    };

    static readonly getById: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.GetById`,
        Ownership: ResourceOwnership.Tenant,
        ActionScope: ActionScope.Tenant,
        RequestType: RequestType.GetOne,
    };

    static readonly addCourse: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.AddCourse`,
        Ownership: ResourceOwnership.Tenant,
        ActionScope: ActionScope.Tenant,
        RequestType: RequestType.UpdateOne,
    };

    static readonly removeCourse: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.RemoveCourse`,
        Ownership: ResourceOwnership.Tenant,
        ActionScope: ActionScope.Tenant,
        RequestType: RequestType.UpdateOne,
    };

    static readonly reorderCourses: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.ReorderCourses`,
        Ownership: ResourceOwnership.Tenant,
        ActionScope: ActionScope.Tenant,
        RequestType: RequestType.UpdateMany,
    };

}
