import express from 'express';
import { UserLearningController } from './user.learning.controller';

import { verifyToken } from '../../auth/jwks/JwtAuthenticationMiddleware';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new UserLearningController();

    // Use the configured auth middleware
    const authMiddleware = verifyToken;

    router.post('/', authMiddleware, controller.create);
    router.get('/search', authMiddleware, controller.search);
    router.get('/:id', authMiddleware, controller.getById);
    router.put('/:id', authMiddleware, controller.update);
    router.delete('/:id', authMiddleware, controller.delete);

    // Non-CRUD routes
    router.put('/:userId/contents/:contentId', authMiddleware, controller.updateUserLearning);
    router.get('/:userId/learning-paths', authMiddleware, controller.getUserLearningPaths);
    router.get('/:userId/course-contents', authMiddleware, controller.getUserCourseContents);
    router.get('/:userId/learning-paths/:learningPathId/progress', authMiddleware, controller.getLearningPathProgress);
    router.get('/:userId/courses/:courseId/progress', authMiddleware, controller.getCourseProgress);
    router.get('/:userId/modules/:moduleId/progress', authMiddleware, controller.getModuleProgress);
    router.get('/:userId/contents/:contentId/progress', authMiddleware, controller.getContentProgress);

    app.use('/api/v1/user-learnings', router);
};
