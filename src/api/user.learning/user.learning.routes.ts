import express from 'express';
import { UserLearningController } from './user.learning.controller';
import { UserLearningAuth } from './user.learning.auth';
import { auth } from '../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new UserLearningController();

    router.post('/', auth(UserLearningAuth.create), controller.create);
    router.get('/search', auth(UserLearningAuth.search), controller.search);
    router.get('/:id', auth(UserLearningAuth.getById), controller.getById);
    router.put('/:id', auth(UserLearningAuth.update), controller.update);
    router.delete('/:id', auth(UserLearningAuth.delete), controller.delete);

    // Non-CRUD routes
    router.put('/:userId/contents/:contentId', auth(UserLearningAuth.updateUserLearning), controller.updateUserLearning);
    router.get('/:userId/learning-paths', auth(UserLearningAuth.getUserLearningPaths), controller.getUserLearningPaths);
    router.get('/:userId/course-contents', auth(UserLearningAuth.getUserCourseContents), controller.getUserCourseContents);
    router.get('/:userId/learning-paths/:learningPathId/progress', auth(UserLearningAuth.getLearningPathProgress), controller.getLearningPathProgress);
    router.get('/:userId/courses/:courseId/progress', auth(UserLearningAuth.getCourseProgress), controller.getCourseProgress);
    router.get('/:userId/modules/:moduleId/progress', auth(UserLearningAuth.getModuleProgress), controller.getModuleProgress);
    router.get('/:userId/contents/:contentId/progress', auth(UserLearningAuth.getContentProgress), controller.getContentProgress);

    app.use('/api/v1/user-learnings', router);
};
