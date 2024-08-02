import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 *
 * @param     requestHandler - function to be executed
 * @returns   middleware - function to be used in express
 */
export const asyncHandler = (requestHandler: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};
