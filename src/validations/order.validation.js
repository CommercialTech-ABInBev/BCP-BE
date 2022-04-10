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
        volume: Joi.number().required(),
        productCode: Joi.string().required(),
        productName: Joi.string().required(),
      })
    )
    .required(),
};

export const paginationSchema = {
  page: Joi.number().required(),
  pageSize: Joi.number(),
};

export const paginateQueryOrder = {
  id: Joi.string(),
  status: Joi.string(),
  loadId: Joi.string(),
};

export const queryId = {
  id: Joi.string().required(),
};

export const planLoadSchema = {
  orderId: Joi.array().items(Joi.string()).required(),
  truckId: Joi.string().required(),
};

export const searchOrder = {
  search: Joi.string().required(),
};

export const rePlanOrderSchema = {
  loadId: Joi.string().required(),
  truckId: Joi.string().required(),
};

export const addStockSchema = Joi.array().items();
