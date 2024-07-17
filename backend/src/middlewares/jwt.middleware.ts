import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// import { asyncHandler } from '../utils/asyncHandler';
import config from '../configs/app.config';
import { ApiResponse } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';

export const jwtVerify = asyncHandler(
  async (
    req: Request & { user?: JwtPayload },
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.cookies.jwtToken)
      return res.status(401).json(new ApiResponse(401, {}, 'Unauthorized'));

    const decode = jwt.verify(
      req.cookies.jwtToken,
      config.JWT_TOKEN_SECRET,
    ) as JwtPayload;
    console.log('user data :', decode);
    req.user = decode;
    next();
  },
);

export const admin = asyncHandler(
  async (
    req: Request & { user?: JwtPayload },
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.user || req.user?.isAdmin === false) {
      return res.status(403).json(new ApiResponse(403, {}, 'Forbidden'));
    }
    next();
  },
);
