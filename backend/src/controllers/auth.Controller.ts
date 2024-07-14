import { Request, Response } from 'express';

import { ApiError } from '../utils/apiError';
import { IUser, User } from '../models/user.model';
import { ApiResponse } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';

//LOGIN HANDLER
export const handleLogin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userExists = (await User.findOne({ email: email })) as IUser;

  if (!userExists) {
    throw new ApiError(400, "User didn't exist", [
      {
        message: "User didn't exist",
      },
    ]);
  }

  const isPasswordCorrect = await userExists.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new ApiError(400, 'Invalid password', [
      {
        message: 'Invalid password',
      },
    ]);
  } else {
    const token = userExists.generateJwtToken();
    const { _id, email, createdAt, updatedAt } = userExists.toObject();
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { _id, email, createdAt, updatedAt, jwtToken: token },
          'Login successful',
        ),
      );
  }
});

// REGISTER HANDLER
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
      const { email, _id, createdAt, updatedAt } = newUser.toObject();
      const response = new ApiResponse(
        201,
        { _id, email, createdAt, updatedAt },
        'User created successfully',
      );
      res.status(201).json(response);
    }
  },
);
