import express from 'express';
import { logger } from '../logger/logger';
// Routes imports start here -->

import { register as registerCourseModuleRoutes } from '../api/course.module/course.module.routes';
import { register as registerCourseContentRoutes } from '../api/course.content/course.content.routes';
import { register as registerCourseRoutes } from '../api/course/course.routes';
import { register as registerLearningPathCoursesRoutes } from '../api/learning.path.courses/learning.path.courses.routes';
import { register as registerLearningPathRoutes } from '../api/learning.path/learning.path.routes';
import { register as registerUserLearningRoutes } from '../api/user.learning/user.learning.routes';
import { register as registerCertificatesRoutes } from '../api/certificates/certificates.routes';
// Routes imports end here <--

////////////////////////////////////////////////////////////////////////////////////

export class RouteHandler {
    public static setup = async (expressApp: express.Application): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            try {
                //Handling the base route
                expressApp.get('/api/{{ApiVersion}}/', (_request, response) => {
                    response.send({
                        message: `{{Service}} Service API [Version ${process.env.API_VERSION}]`,
                    });
                });
                expressApp.get('/health-check', (_request, response) => {
                    response.send('ok');
                });

                // Routes start here -->

                registerCourseModuleRoutes(expressApp);
                registerCourseContentRoutes(expressApp);
                registerCourseRoutes(expressApp);
                registerLearningPathCoursesRoutes(expressApp);
                registerLearningPathRoutes(expressApp);
                registerUserLearningRoutes(expressApp);
                registerCertificatesRoutes(expressApp);
                // Routes end here <--

                resolve(true);
            } catch (error) {
                logger.error('Error initializing the router: ' + error.message);
                reject(false);
            }
        });
    };
}
