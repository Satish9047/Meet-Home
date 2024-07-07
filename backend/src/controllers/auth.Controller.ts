import { Request, Response } from 'express';

export const handleLogin = (req: Request, res: Response) => {
  console.log(req.body);
  res.send('Hello from login');
};

export const handleRegister = (req: Request, res: Response) => {
  res.send('Hello from register');
};
