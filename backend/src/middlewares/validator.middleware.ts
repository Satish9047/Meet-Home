import Joi, { Schema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/apiResponse';

/**
 * @description Validate request body against Joi schema
 * @param       Joi.Schema
 * @returns     next middleware function || error response
 */
export const validateReqBody = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(401).json(new ApiResponse(401, {}, error.message));
    }
    req.body = value;
    next();
  };
};
