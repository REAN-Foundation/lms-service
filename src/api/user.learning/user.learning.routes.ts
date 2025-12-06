import express from 'express';
import { UserLearningController } from './user.learning.controller';
import { UserLearningAuth } from './user.learning.auth';
import { auth } from '../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new UserLearningController();

    // Endpoint for updating user learning progress
    router.put('/:userId/learning-paths/:learningPathId/contents/:contentId', auth(UserLearningAuth.updateUserLearning), controller.updateUserLearning);

    // List of learning paths and courses for a user
    router.get('/:userId/learning-paths', auth(UserLearningAuth.getUserLearningPaths), controller.getUserLearningPaths);
    router.get('/:userId/courses', auth(UserLearningAuth.getUserCourses), controller.getUserCourses);

    // Progress endpoints: Returns percentage progress for the learning path, course, module, or content 
    router.get('/:userId/learning-paths/:learningPathId/progress', auth(UserLearningAuth.getLearningPathProgress), controller.getLearningPathProgress);
    router.get('/:userId/courses/:courseId/progress', auth(UserLearningAuth.getCourseProgress), controller.getCourseProgress);
    router.get('/:userId/modules/:moduleId/progress', auth(UserLearningAuth.getModuleProgress), controller.getModuleProgress);
    router.get('/:userId/contents/:contentId/progress', auth(UserLearningAuth.getContentProgress), controller.getContentProgress);

    // Add additional endpoints for getting current completion state 
    router.get('/:userId/learning-paths/:learningPathId/completion-state', auth(UserLearningAuth.getLearningPathCompletionState), controller.getLearningPathCompletionState);
    router.get('/:userId/courses/:courseId/completion-state', auth(UserLearningAuth.getCourseCompletionState), controller.getCourseCompletionState);
    router.get('/:userId/modules/:moduleId/completion-state', auth(UserLearningAuth.getModuleCompletionState), controller.getModuleCompletionState);
    router.get('/:userId/contents/:contentId/completion-state', auth(UserLearningAuth.getContentCompletionState), controller.getContentCompletionState);

    app.use('/api/v1/user-learnings', router);
};
