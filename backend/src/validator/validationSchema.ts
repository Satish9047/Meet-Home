import Joi from 'joi';

export const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});

export const houseSchema = Joi.object({
  houseName: Joi.string().required(),
  price: Joi.number().required(),
  location: Joi.string().required(),
  area: Joi.string().required(),
  kitchen: Joi.number().required(),
  bedrooms: Joi.number().required(),
  bathrooms: Joi.number().required(),
  washrooms: Joi.number().required(),
  totalFloor: Joi.number().required(),
  available: Joi.boolean().required(),
  description: Joi.string().required(),
});
