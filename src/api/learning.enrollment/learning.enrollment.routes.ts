import express from 'express';
import { LearningEnrollmentController } from './learning.enrollment.controller';
import { auth } from '../../auth/auth.handler';
import { LearningEnrollmentAuth } from './learning.enrollment.auth';

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new LearningEnrollmentController();

    router.post(
        '/users/:userId/learning-paths/:learningPathId',
        auth(LearningEnrollmentAuth.enroll),
        controller.enrollToLearningPath
    );
    router.post('/users/:userId/courses/:courseId', auth(LearningEnrollmentAuth.enroll), controller.enrollToCourse);
    router.get(
        '/users/:userId/active',
        auth(LearningEnrollmentAuth.getUserEnrollments),
        controller.getUserActiveEnrollments
    );
    router.get('/search', auth(LearningEnrollmentAuth.search), controller.search);
    router.get('/users/:userId', auth(LearningEnrollmentAuth.getUserEnrollments), controller.getUserEnrollments);
    router.get('/:id', auth(LearningEnrollmentAuth.getById), controller.getById);
    router.delete('/:id', auth(LearningEnrollmentAuth.delete), controller.delete);

    router.get(
        '/tenants/:tenantId/active',
        auth(LearningEnrollmentAuth.getActiveEnrollments),
        controller.getActiveEnrollments
    );

    app.use('/api/v1/enrollments', router);
};
