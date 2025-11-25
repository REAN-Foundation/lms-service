import express from 'express';
import { CourseModuleController } from './course.module.controller';
import { CourseModuleAuth } from './course.module.auth';
import { auth } from '../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new CourseModuleController();

    router.post('/', auth(CourseModuleAuth.create), controller.create);
    router.get('/search', auth(CourseModuleAuth.search), controller.search);
    router.get('/:id', auth(CourseModuleAuth.getById), controller.getById);
    router.put('/:id', auth(CourseModuleAuth.update), controller.update);
    router.delete('/:id', auth(CourseModuleAuth.delete), controller.delete);

    app.use('/api/v1/course-modules', router);
};
