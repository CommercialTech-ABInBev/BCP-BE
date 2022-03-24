import Joi from 'joi';

export const createOrderchema = {
  comment: Joi.string(),
  account: Joi.string().required(),
  vatAmount: Joi.number().required(),
  customerId: Joi.string().required(),
  warehouseId: Joi.string().required(),
  totalAmount: Joi.number().required(),
  deliveryDate: Joi.string().required(),
  subTotalAmount: Joi.number().required(),
  items: Joi.array()
    .items(
      Joi.object({
        pallets: Joi.number(),
        cases: Joi.number().required(),
        total: Joi.number().required(),
        productCode: Joi.string().required(),
        productName: Joi.string().required(),
      })
    )
    .required(),
};
