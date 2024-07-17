import { Router } from 'express';

import { jwtVerify } from '../middlewares/jwt.middleware';
import {
  getHouse,
  getHousesById,
  addHouse,
  updateHouse,
  deleteHouse,
} from '../controllers/house.controller';

const houseRoute = Router();

houseRoute.route('/').get(getHouse).post(jwtVerify, addHouse);
houseRoute
  .route('/:id')
  .get(getHousesById)
  .put(jwtVerify, updateHouse)
  .delete(jwtVerify, deleteHouse);

export default houseRoute;
