import { Request, Response } from 'express';

import { ApiError } from '../utils/apiError';
import { IUser, User } from '../models/user.model';
import { ApiResponse } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import logger from '../utils/logger';

/**
 * @description    Login user
 * @route          POST /api/v1/auth/login
 * @access         Public
 */
export const handleLogin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userExists = (await User.findOne({ email: email })) as IUser;

  if (!userExists) {
    logger.error(`failed to login user ${email}, user didn't already exist.`);
    throw new ApiError(400, "User didn't exist", [
      {
        message: "User didn't exist",
      },
    ]);
  }

  const isPasswordCorrect = await userExists.comparePassword(password);
  if (!isPasswordCorrect) {
    logger.error(`failed to login user ${email}, password didn't match.`);
    throw new ApiError(400, 'Invalid password', [
      {
        message: 'Invalid password',
      },
    ]);
  } else {
    const token = userExists.generateJwtToken();
    const { _id, email, isAdmin, createdAt, updatedAt } = userExists.toObject();
    logger.info(`User ${email} logged in`);
    res.cookie('jwtToken', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { _id, email, isAdmin, createdAt, updatedAt },
          'Login successful',
        ),
      );
  }
});

/**
 * @description    Register user
 * @route          POST /api/v1/auth/register
 * @access         Public
 */
export const handleRegister = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      logger.error(`failed to register user ${email}, user already exist.`);
      throw new ApiError(400, 'User already exists', [
        {
          message: 'User already exists',
        },
      ]);
    }

    const newUser = await User.create({
      email,
      password,
      isAdmin: false,
    });

    if (newUser) {
      const { email, _id, isAdmin, createdAt, updatedAt } = newUser.toObject();
      const response = new ApiResponse(
        201,
        { _id, email, isAdmin, createdAt, updatedAt },
        'User created successfully',
      );
      logger.info(`New user ${email} is registered successfully.`);
      res.status(201).json(response);
    }
  },
);
