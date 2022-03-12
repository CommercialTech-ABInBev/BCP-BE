import db from '../models';
import DbService from './dbservice';
import CommonService from './common';
import AuthUtils from '../utils/auth';
import { HttpError } from '@src/middlewares/api-error-validator';

const { Order, Order_items } = db;
const { findByKeys, updateByKey, deleteByKey, addEntity, findMultipleByKey } =
  DbService;

export default class OrderService {
  async createOrder(data, { name }) {
    const {
      items,
      account,
      vatAmount,
      customerId,
      warehouseId,
      totalAmount,
      deliveryDate,
      subTotalAmount,
    } = data;

    const orderBodyData = {
      account,
      vatAmount,
      customerId,
      totalAmount,
      warehouseId,
      deliveryDate,
      subTotalAmount,
      createdBy: name,
      status: 'captured',
      salesOrderId: CommonService.generateReference('CTO_'),
    };

    const order = await addEntity(Order, { ...orderBodyData });

    const orderItems = items.map((stock) => {
      return Object.assign(
        {},
        {
          orderId: order.id,
          total: stock.total,
          cases: stock.cases,
          productCode: stock.productCode,
          productName: stock.productName,
        }
      );
    });

    const orderitems = await Order_items.bulkCreate(orderItems);
    order.item = orderitems;

    return order;
  }

  async getAllOrders() {
    const data = await Order.findAll({ include: ['orderItems'] });
    return data;
  }
}
