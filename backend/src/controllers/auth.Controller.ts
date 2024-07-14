import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { User } from '../models/user.model';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';

export const handleLogin = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.body);
  res.send('Hello from login');
});

export const handleRegister = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      throw new ApiError(400, 'User already exists', [
        {
          message: 'User already exists',
        },
      ]);
    }
    const newUser = await User.create({
      email,
      password,
    });

    if (newUser) {
      const { password, ...data } = newUser.toObject();
      const response = new ApiResponse(201, data, 'User created successfully');
      res.status(201).json(response);
    }
  },
);
