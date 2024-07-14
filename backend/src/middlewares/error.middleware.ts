import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      data: err.data,
      errors: err.errors,
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Internal server error',
    data: null,
    errors: [
      {
        message: 'Internal server error',
      },
    ],
  });
};

export default errorHandler;
