import express from 'express';
import { CourseModuleController } from './course.module.controller';
import { CourseModuleAuth } from './course.module.auth';
import { auth } from '../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new CourseModuleController();

    router.post('/', controller.create);
    router.get('/search', controller.search);
    router.get('/:id', controller.getById);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);

    app.use('/api/v1/course-modules', router);
};
