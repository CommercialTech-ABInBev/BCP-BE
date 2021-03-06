import sequelize from 'sequelize';

import db from '../models';
import DbService from './dbservice';

const { Order, Order_items, Truck, CustomerAddress, User, Customer } = db;
const { addEntity, findMultipleByKey, updateByKey, findByKeys } = DbService;

export default class CustomerService {
  async getOrdersByCustomerId(key) {
    try {
      const entities = await Customer.findOne({
        where: key,
      });

      const orders = await Order.findAll({
        include: ['orderItems'],
        where: key,
      });
      return { ...entities.dataValues, orders };
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async searchCustomer(query) {
    let options = {
      where: {
        [sequelize.Op.or]: [
          {
            customerId: {
              [sequelize.Op.like]: '%' + query + '%',
            },
          },
          {
            customerName: {
              [sequelize.Op.like]: '%' + query + '%',
            },
          },
        ],
      },
      include: [
        {
          model: CustomerAddress,
          as: 'address',
        },
        {
          model: Order,
          as: 'orders',
          include: ['orderItems'],
        },
      ],
    };

    const { count, rows } = await Customer.findAndCountAll(options);
    return { TotalCount: count, customer: rows };
  }
}
