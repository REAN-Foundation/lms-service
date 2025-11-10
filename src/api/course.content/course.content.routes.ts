import express from 'express';
import {
    CourseContentController
} from './course.content.controller';

import { verifyToken } from '../../auth/jwks/JwtAuthenticationMiddleware';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const controller = new CourseContentController();
    

    // Use the configured auth middleware
    const authMiddleware = verifyToken;

    router.post('/', authMiddleware, controller.create);
    router.get('/by-course/:courseId', authMiddleware, controller.getContentsForCourse);
    router.get('/by-learning-path/:learningPathId', authMiddleware, controller.getContentsForLearningPath);
    router.get('/search', authMiddleware, controller.search);
    router.get('/:id', authMiddleware, controller.getById);
    router.put('/:id', authMiddleware, controller.update);
    router.delete('/:id', authMiddleware, controller.delete);

    app.use('/api/v1/course-contents', router);
};
