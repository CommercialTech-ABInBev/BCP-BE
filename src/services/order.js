import sequelize from 'sequelize';

import db from '../models';
import DbService from './dbservice';
import CommonService from './common';
import AuthUtils from '../utils/auth';
import paginate from '../utils/paginate';
import { orderfields } from '../utils/tableFields';

const { Order, Order_items, Truck, CustomerAddress, User, Inventory } = db;
const { addEntity, findMultipleByKey, updateByKey, findByKeys } = DbService;

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

    const date = new Date();
    const dateString = date.toString();
    const orderObject = items.map((obj) => ({ ...obj, orderId: order.id }));

    const orderitems = await Order_items.bulkCreate(orderObject);
    order.item = orderitems;

    items.map(async ({ total, productCode }) => {
      const options = { stockCode: productCode, warehouse: warehouseId };

      const stock = await Inventory.findOne({
        where: options,
      });

      await updateByKey(
        Inventory,
        {
          freeStockCs: Number(stock.freeStockCs) - Number(total),
          dateLastStockMove: dateString,
        },
        options
      );
    });

    return order;
  }

  async getAllOrders(query) {
    const { limit, offset } = paginate(query);
    const { count, rows } = await Order.findAndCountAll({
      include: ['orderItems'],
      limit,
      offset,
      distinct: true,
    });

    return {
      TotalCount: count,
      data: rows,
    };
  }

  async getWHMorders({ status }, query) {
    const { limit, offset } = paginate(query);

    const { count, rows } = await Order.findAndCountAll({
      where: {
        warehouseId: status,
      },
      include: ['orderItems'],
      limit,
      offset,
      distinct: true,
    });

    return {
      TotalCount: count,
      data: rows,
    };
  }
  async queryOrders({ id, warehouseId, status }) {
    let whereStatement = {};
    if (id) whereStatement.id = id;
    if (status) whereStatement.status = status;
    if (warehouseId) whereStatement.warehouseId = warehouseId;

    const data = await Order.findAll({
      where: whereStatement,
      include: ['orderItems'],
    });
    return data;
  }

  async printOrders({ role, status }, res) {
    const data =
      role === 'cic'
        ? await findMultipleByKey(Order)
        : await findMultipleByKey(Order, { warehouseId: status });
    await AuthUtils.downloadResource(res, 'orders.csv', orderfields, data);
  }

  async planOrderLoad(data) {
    const { orderId, truckId } = data;

    const {
      isAvailable,
      depot,
      shipOwner,
      shipSize,
      truckStatus,
      supplierName,
    } = await findByKeys(Truck, { shipRegister: truckId });

    if (!isAvailable)
      return { status: 'Failed', data: 'Truck not available for selection' };

    orderId.forEach(async (id) => {
      await updateByKey(
        Order,
        {
          truckId,
          truckStatus,
          status: 'planned',
          truckDepot: depot,
          truckOwner: shipOwner,
          truckShipSize: shipSize,
          truckSupplierName: supplierName,
          loadId: CommonService.generateReference('G00'),
        },
        { salesOrderId: id }
      );
    });

    await updateByKey(
      Truck,
      {
        isAvailable: false,
      },
      { shipRegister: truckId }
    );

    return { status: 'success', data: 'Order Successfully Planned' };
  }

  async generateOrderInvoice({ id }) {
    const { customerId } = await Order.findOne({ where: { id } });
    const { shipToAddr1 } = await findByKeys(CustomerAddress, {
      customerId,
    });

    await updateByKey(
      Order,
      {
        status: 'invoiced',
        shipTo: shipToAddr1,
        invoiceId: CommonService.generateReference('RTY'),
      },
      { id }
    );
    const getOrders = await Order.findOne({
      where: { id },
      include: ['orderItems'],
    });

    return getOrders;
  }

  async pickOrder({ id }) {
    await updateByKey(
      Order,
      {
        picked: true,
        status: 'picked',
      },
      { id }
    );

    const getOrders = await Order.findOne({
      where: { id },
      include: ['orderItems'],
    });

    return getOrders;
  }

  async searchOrder({ role, status }, query) {
    let optionsObj = {
      where: {
        [sequelize.Op.or]: [
          {
            salesOrderId: {
              [sequelize.Op.like]: '%' + query + '%',
            },
          },
          {
            account: {
              [sequelize.Op.like]: '%' + query + '%',
            },
          },
        ],
      },
      include: ['orderItems'],
      distinct: true,
    };

    let queryOptions;

    if (role === 'cic') {
      queryOptions = optionsObj;
    } else {
      optionsObj.where.warehouseId = status;
      queryOptions = optionsObj;
    }

    const { count, rows } = await Order.findAndCountAll(queryOptions);
    return { TotalCount: count, orders: rows };
  }

  async cicCancelOrder({ id }) {
    const date = new Date();
    const dateString = date.toString();

    const order = await Order.findOne({
      where: { id },
      include: ['orderItems'],
    });

    if (!order) return { status: 'Failed', message: 'Order not found!!!' };
    if (order.status === 'planned' || order.status === 'cancelled')
      return { status: 'failed', message: 'Ooops! Order planned already' };

    await updateByKey(
      Order,
      {
        status: 'cancelled',
      },
      { id }
    );

    order.orderItems.forEach(async ({ total, productCode }) => {
      const options = { stockCode: productCode, warehouse: order.warehouseId };

      const stock = await Inventory.findOne({
        where: options,
      });

      await updateByKey(
        Inventory,
        {
          freeStockCs: Number(stock.freeStockCs) + Number(total),
          dateLastStockMove: dateString,
        },
        options
      );
    });

    return { status: 'Success', message: 'Order Cancelled Successfully !!' };
  }
}
