import express from 'express';
import { CourseController } from './course.controller';
import { CourseAuth } from './course.auth';
import { auth } from '../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new CourseController();

    // router.post('/', auth(CourseAuth.create), controller.create);
    router.post('/', controller.create);
    router.get('/search', controller.search);
    router.get('/:id', controller.getById);
    router.put('/:id', controller.update);
    router.delete('/:id',controller.delete);

    app.use('/api/v1/courses', router);
};
