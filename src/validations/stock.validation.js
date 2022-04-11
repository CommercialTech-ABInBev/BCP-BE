import Joi from 'joi';

export const checkInSchema = {
  title: Joi.string().required(),
  location: Joi.string().required(),
  stockType: Joi.string().required(),
  currQty: Joi.number().required(),
};
