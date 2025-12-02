import { AuthOptions, RequestType, ResourceOwnership, ActionScope, DefaultAuthOptions } from '../../auth/auth.types';

export class LearningEnrollmentAuth {
    static readonly _baseContext = `LearningEnrollment`;

    static readonly enroll: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.Enroll`,
        Ownership: ResourceOwnership.Owner,
        ActionScope: ActionScope.Owner,
        RequestType: RequestType.CreateOne,
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
        Ownership: ResourceOwnership.Owner,
        ActionScope: ActionScope.Owner,
        RequestType: RequestType.GetOne,
    };

    static readonly getUserEnrollments: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.GetUserEnrollments`,
        Ownership: ResourceOwnership.Owner,
        ActionScope: ActionScope.Owner,
        RequestType: RequestType.GetMany,
    };

    static readonly getUserActiveEnrollments: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.GetUserActiveEnrollments`,
        Ownership: ResourceOwnership.Owner,
        ActionScope: ActionScope.Owner,
        RequestType: RequestType.GetMany,
    };

    static readonly stop: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.Stop`,
        Ownership: ResourceOwnership.Owner,
        ActionScope: ActionScope.Owner,
        RequestType: RequestType.UpdateOne,
    };

    static readonly delete: AuthOptions = {
        ...DefaultAuthOptions,
        Context: `${this._baseContext}.Delete`,
        Ownership: ResourceOwnership.System,
        ActionScope: ActionScope.Tenant,
        RequestType: RequestType.DeleteOne,
    };
}

