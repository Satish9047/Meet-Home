import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';

export const handleLogin = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.body);
  res.send('Hello from login');
});

export const handleRegister = asyncHandler(
  async (req: Request, res: Response) => {
    res.send('Hello from register');
  },
);
