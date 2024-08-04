import { Router } from 'express';
import authRoute from './auth.router';
import houseRoute from './house.router';
import scheduleRoute from './schedule.router';

const router = Router();

router.use('/auth', authRoute);
router.use('/house', houseRoute);
router.use('/schedule', scheduleRoute);

export default router;
