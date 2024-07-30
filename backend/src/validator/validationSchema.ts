import Joi from 'joi';

export const authSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'any.only': 'Email must be a valid email',
  }),
  password: Joi.string().required().min(8).messages({
    'any.required': 'Password is required',
    'any.only': 'Password must be at least 8 characters',
  }),
});
