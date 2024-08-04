import { Router } from 'express';

import {
  addVisitSchedule,
  deleteVisitSchedule,
  getVisitSchedule,
  updateVisitSchedule,
} from '../controllers/schedule.controller';

const scheduleRoute = Router();

scheduleRoute.route('/').get(getVisitSchedule).post(addVisitSchedule);
scheduleRoute
  .route('/:id')
  .put(updateVisitSchedule)
  .delete(deleteVisitSchedule);

export default scheduleRoute;
