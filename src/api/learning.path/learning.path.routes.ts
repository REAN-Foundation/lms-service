import express from 'express';
import { LearningPathController } from './learning.path.controller';
import { LearningPathAuth } from './learning.path.auth';
import { auth } from '../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new LearningPathController();

    router.post('/:id/courses/:courseId', auth(LearningPathAuth.addCourseToLearningPath), controller.addCourseToLearningPath);
    router.delete('/:id/courses/:courseId', auth(LearningPathAuth.removeCourseFromLearningPath), controller.removeCourseFromLearningPath);
    router.put('/:id/reorder-courses', auth(LearningPathAuth.reorderCoursesInLearningPath), controller.reorderCoursesInLearningPath);
    
    router.post('/', auth(LearningPathAuth.create), controller.create);
    router.get('/search', auth(LearningPathAuth.search), controller.search);
    router.get('/:id', auth(LearningPathAuth.getById), controller.getById);
    router.put('/:id', auth(LearningPathAuth.update), controller.update);
    router.delete('/:id', auth(LearningPathAuth.delete), controller.delete);

    app.use('/api/v1/learning-paths', router);
};
