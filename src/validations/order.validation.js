import Joi from 'joi';

export const createOrderchema = {
    warehouseId: Joi.string().required(),
    customerId: Joi.string().required(),
    account: Joi.string().required(),
    deliveryDate: Joi.string().required(),
    vatAmount: Joi.number().required(),
    subTotalAmount: Joi.number().required(),
    totalAmount: Joi.number().required(),
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