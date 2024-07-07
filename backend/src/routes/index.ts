import { Router } from 'express';
import authRoute from './auth.Router';

const router = Router();

router.use('/auth', authRoute);

export default router;
