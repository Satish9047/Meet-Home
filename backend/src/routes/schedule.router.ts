import { Router } from 'express';

import { validateReqBody } from '../middlewares/validator.middleware';
import { ScheduleSchema } from '../validator/validationSchema';
import {
  addVisitSchedule,
  deleteVisitSchedule,
  getVisitSchedule,
  updateVisitSchedule,
} from '../controllers/schedule.controller';

const scheduleRoute = Router();

scheduleRoute
  .route('/')
  .get(getVisitSchedule)
  .post(validateReqBody(ScheduleSchema), addVisitSchedule);
scheduleRoute
  .route('/:id')
  .put(updateVisitSchedule)
  .delete(deleteVisitSchedule);

export default scheduleRoute;
