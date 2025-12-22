import express from 'express';
import { UserController } from './user.controller';
import { UserAuth } from './user.auth';
import { auth } from '../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new UserController();

    router.post('/', auth(UserAuth.create), controller.create);
    router.get('/search', auth(UserAuth.search), controller.search);
    router.get('/:id', auth(UserAuth.getById), controller.getById);
    router.put('/:id', auth(UserAuth.update), controller.update);
    router.delete('/:id', auth(UserAuth.delete), controller.delete);
    
    app.use('/api/v1/user', router);
};
