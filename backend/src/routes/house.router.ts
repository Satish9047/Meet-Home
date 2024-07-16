import { Router } from 'express';
import {
  getHouse,
  getHousesById,
  addHouse,
  updateHouse,
  deleteHouse,
} from '../controllers/house.controller';

const houseRoute = Router();

houseRoute.route('/').get(getHouse).post(addHouse);
houseRoute
  .route('/:id')
  .get(getHousesById)
  .put(updateHouse)
  .delete(deleteHouse);

export default houseRoute;
