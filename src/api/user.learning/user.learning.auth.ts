import { AuthOptions, RequestType, ResourceOwnership, ActionScope, DefaultAuthOptions } from '../../auth/auth.types';

///////////////////////////////////////////////////////////////////////////////////////

export class UserLearningAuth {
    static readonly _baseContext = `UserLearning`;

    static readonly create: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.Create`,
        Ownership: ResourceOwnership.System,
        ActionScope: ActionScope.Tenant,
        RequestType: RequestType.CreateOne,
    };

    static readonly update: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.Update`,
        Ownership: ResourceOwnership.System,
        ActionScope: ActionScope.Tenant,
        RequestType: RequestType.UpdateOne,
    };

    static readonly delete: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.Delete`,
        Ownership: ResourceOwnership.System,
        ActionScope: ActionScope.Tenant,
        RequestType: RequestType.DeleteOne,
    };

    static readonly search: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.Search`,
        Ownership: ResourceOwnership.System,
        ActionScope: ActionScope.Tenant,
        RequestType: RequestType.Search,
    };

    static readonly getById: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.GetById`,
        Ownership: ResourceOwnership.System,
        ActionScope: ActionScope.Tenant,
        RequestType: RequestType.GetOne,
    };

    static readonly updateUserLearning: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.UpdateUserLearning`,
        Ownership: ResourceOwnership.Owner,
        ActionScope: ActionScope.Owner,
        RequestType: RequestType.UpdateOne,
    };

    static readonly getUserLearningPaths: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.GetUserLearningPaths`,
        Ownership: ResourceOwnership.Owner,
        ActionScope: ActionScope.Owner,
        RequestType: RequestType.GetMany,
    };

    static readonly getUserCourseContents: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.GetUserCourseContents`,
        Ownership: ResourceOwnership.Owner,
        ActionScope: ActionScope.Owner,
        RequestType: RequestType.GetMany,
    };

    static readonly getLearningPathProgress: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.GetLearningPathProgress`,
        Ownership: ResourceOwnership.Owner,
        ActionScope: ActionScope.Owner,
        RequestType: RequestType.GetOne,
    };

    static readonly getCourseProgress: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.GetCourseProgress`,
        Ownership: ResourceOwnership.Owner,
        ActionScope: ActionScope.Owner,
        RequestType: RequestType.GetOne,
    };

    static readonly getModuleProgress: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.GetModuleProgress`,
        Ownership: ResourceOwnership.Owner,
        ActionScope: ActionScope.Owner,
        RequestType: RequestType.GetOne,
    };

    static readonly getContentProgress: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.GetContentProgress`,
        Ownership: ResourceOwnership.Owner,
        ActionScope: ActionScope.Owner,
        RequestType: RequestType.GetOne,
    };
}
