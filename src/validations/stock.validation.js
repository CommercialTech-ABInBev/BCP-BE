import Joi from 'joi';

export const stockSearchParamSchema = {
  location: Joi.string(),
  container: Joi.string(),
  volume: Joi.string(),
  warehouseId: Joi.string(),
};

export const stockPriceSchema = {
  stockCode: Joi.string().required(),
};

export const searchStock = {
  search: Joi.string().required(),
};

export const paginationStockSchema = {
  page: Joi.number().required(),
  pageSize: Joi.number(),
};
