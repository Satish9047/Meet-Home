import { Router } from 'express';

import { admin, jwtVerify } from '../middlewares/jwt.middleware';
import {
  getHouse,
  getHousesById,
  addHouse,
  updateHouse,
  deleteHouse,
} from '../controllers/house.controller';

const houseRoute = Router();

houseRoute.route('/').get(getHouse).post(jwtVerify, admin, addHouse);
houseRoute
  .route('/:id')
  .get(getHousesById)
  .put(jwtVerify, admin, updateHouse)
  .delete(jwtVerify, admin, deleteHouse);

export default houseRoute;
