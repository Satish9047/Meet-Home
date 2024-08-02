import { Router } from 'express';
import { upload } from '../middlewares/multer.middleware';

import { admin, jwtVerify } from '../middlewares/jwt.middleware';
import { validateReqBody } from '../middlewares/validator.middleware';
import { houseSchema } from '../validator/validationSchema';
import {
  getHouse,
  getHousesById,
  addHouse,
  updateHouse,
  deleteHouse,
} from '../controllers/house.controller';

const houseRoute = Router();

houseRoute
  .route('/')
  .get(getHouse)
  .post(
    jwtVerify,
    admin,
    upload.single('imageUrl'),
    validateReqBody(houseSchema),
    addHouse,
  );
houseRoute
  .route('/:id')
  .get(getHousesById)
  .put(
    jwtVerify,
    upload.single('imageUrl'),
    validateReqBody(houseSchema),
    admin,
    updateHouse,
  )
  .delete(jwtVerify, admin, deleteHouse);

export default houseRoute;
