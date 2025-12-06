import express from 'express';
import { CertificatesController } from './certificates.controller';
import { CertificatesAuth } from './certificates.auth';
import { auth } from '../../auth/auth.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new CertificatesController();

    router.post('/', auth(CertificatesAuth.create), controller.create);
    router.get('/search', auth(CertificatesAuth.search), controller.search);
    router.get('/:id', auth(CertificatesAuth.getById), controller.getById);
    router.put('/:id', auth(CertificatesAuth.update), controller.update);
    router.delete('/:id', auth(CertificatesAuth.delete), controller.delete);

    app.use('/api/v1/certificates', router);
};
