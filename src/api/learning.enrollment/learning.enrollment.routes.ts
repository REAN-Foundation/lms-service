import express from 'express';
import { LearningEnrollmentController } from './learning.enrollment.controller';
import { auth } from '../../auth/auth.handler';
import { LearningEnrollmentAuth } from './learning.enrollment.auth';

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new LearningEnrollmentController();

    router.post('/users/:userId/enroll', auth(LearningEnrollmentAuth.enroll), controller.enroll);
    router.get('/search', auth(LearningEnrollmentAuth.search), controller.search);
    router.get('/users/:userId/enrollments', auth(LearningEnrollmentAuth.getUserEnrollments), controller.getUserEnrollments);
    router.get(
        '/users/:userId/active-enrollments',
        auth(LearningEnrollmentAuth.getUserActiveEnrollments),
        controller.getUserActiveEnrollments
    );
    router.post('/:id/stop', auth(LearningEnrollmentAuth.stop), controller.stop);
    router.get('/:id', auth(LearningEnrollmentAuth.getById), controller.getById);
    router.delete('/:id', auth(LearningEnrollmentAuth.delete), controller.delete);

    app.use('/api/v1/learning-enrollments', router);
};

