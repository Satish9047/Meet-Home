import { Router } from 'express';
import authRoute from './auth.router';
import houseRoute from './house.router';

const router = Router();

router.use('/auth', authRoute);
router.use('/house', houseRoute);

export default router;
