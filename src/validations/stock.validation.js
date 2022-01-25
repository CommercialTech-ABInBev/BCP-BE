import Joi from 'joi';


export const checkInSchema = {
    title: Joi.string().required(),
    location: Joi.string().required(),
    brand: Joi.string().required(),
    prevQty: Joi.number().required(),
};