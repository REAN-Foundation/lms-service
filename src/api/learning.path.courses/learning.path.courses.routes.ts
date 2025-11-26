import express from 'express';
import { LearningPathCoursesController } from './learning.path.courses.controller';
import { LearningPathCoursesAuth } from './learning.path.courses.auth';
import { auth } from '../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new LearningPathCoursesController();

    router.post('/', controller.create);
    router.get('/search', auth(LearningPathCoursesAuth.search), controller.search);
    router.get('/:id', auth(LearningPathCoursesAuth.getById), controller.getById);
    router.put('/:id', auth(LearningPathCoursesAuth.update), controller.update);
    router.delete('/:id', auth(LearningPathCoursesAuth.delete), controller.delete);

    app.use('/api/v1/learning-path-courses', router);
};
