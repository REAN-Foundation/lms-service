import express from 'express';

////////////////////////////////////////////////////////////////////////

export interface IUserAuthorizer {

    authorize(
        request: express.Request) : Promise<boolean>;

}


