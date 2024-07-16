import { Router } from 'express';
import {
  getHouse,
  getHousesById,
  addHouse,
  updateHouse,
  deleteHouse,
} from '../controllers/house.controller';

const houseRoute = Router();

houseRoute.get('/', getHouse);
houseRoute.get('/:id', getHousesById);
houseRoute.post('/', addHouse);
houseRoute.put('/:id', updateHouse);
houseRoute.delete('/:id', deleteHouse);

export default houseRoute;
