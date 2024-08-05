import { Router } from 'express';

import { validateReqBody } from '../middlewares/validator.middleware';
import { ScheduleSchema } from '../validator/validationSchema';
import {
  addVisitSchedule,
  deleteVisitSchedule,
  getVisitSchedule,
  updateVisitSchedule,
} from '../controllers/schedule.controller';
import { jwtVerify } from '../middlewares/jwt.middleware';

const scheduleRoute = Router();

scheduleRoute
  .route('/')
  .get(jwtVerify, getVisitSchedule)
  .post(jwtVerify, validateReqBody(ScheduleSchema), addVisitSchedule);
scheduleRoute
  .route('/:id')
  .put(jwtVerify, validateReqBody(ScheduleSchema), updateVisitSchedule)
  .delete(jwtVerify, deleteVisitSchedule);

export default scheduleRoute;
