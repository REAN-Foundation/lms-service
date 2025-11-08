import express from 'express';
import {
    UserLearningController
} from './user.learning.controller';

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

    app.use('/api/v1/user-learnings', router);
};
