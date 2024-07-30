import { Router } from 'express';

import { handleLogin, handleRegister } from '../controllers/auth.controller';
import { validateReqBody } from '../middlewares/validator.middleware';
import { authSchema } from '../validator/validationSchema';

const authRoute = Router();

authRoute.post('/login', validateReqBody(authSchema), handleLogin);
authRoute.post('/register', validateReqBody(authSchema), handleRegister);

export default authRoute;
