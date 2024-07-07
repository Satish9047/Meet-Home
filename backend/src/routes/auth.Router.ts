import { Router } from 'express';
import { handleLogin, handleRegister } from '../controllers/auth.Controller';

const authRoute = Router();

authRoute.post('/login', handleLogin);

authRoute.post('/register', handleRegister);

export default authRoute;
