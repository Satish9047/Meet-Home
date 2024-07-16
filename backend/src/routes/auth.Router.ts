import { Router } from 'express';

import { handleLogin, handleRegister } from '../controllers/auth.controller';

const authRoute = Router();

authRoute.post('/login', handleLogin);
authRoute.post('/register', handleRegister);

export default authRoute;
