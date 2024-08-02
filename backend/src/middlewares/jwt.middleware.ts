import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

import config from '../configs/app.config';
import { User } from '../models/user.model';
import { ApiResponse } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';

/**
 * @description   Verify user
 * @param         req - express request
 * @param         res - express response
 * @param         next - express next
 * @returns       void
 */
export const jwtVerify = asyncHandler(
  async (
    req: Request & { user?: JwtPayload },
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.cookies.jwtToken)
      return res
        .status(401)
        .json(new ApiResponse(401, {}, 'Unauthorized user'));

    jwt.verify(
      req.cookies.jwtToken,
      config.JWT_TOKEN_SECRET,
      (err: VerifyErrors | null, decoded: any) => {
        if (err)
          return res
            .status(401)
            .json(new ApiResponse(401, {}, 'token expired'));
        req.user = decoded as JwtPayload;
        next();
      },
    );
  },
);

/**
 * @description   Admin route guard
 * @param         req - express request
 * @param         res - express response
 * @param         next - express next function
 * @returns       void
 */
export const admin = asyncHandler(
  async (
    req: Request & { user?: JwtPayload },
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.user || req.user.isAdmin === false) {
      return res.status(403).json(new ApiResponse(403, {}, 'access Forbidden'));
    }

    const user = await User.findById(req.user._id);
    if (!user || !user.isAdmin) {
      return res.status(403).json(new ApiResponse(403, {}, 'access Forbidden'));
    }
    req.user = user;
    next();
  },
);
