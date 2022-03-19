import db from '../models';
import DbService from './dbservice';
import CommonService from './common';
import AuthUtils from '../utils/auth';
import { orderfields } from '../utils/tableFields';
import paginate from '../utils/paginate'
import { HttpError } from '@src/middlewares/api-error-validator';
import {get } from 'request';

const { Order, Order_items, Truck, CustomerAddress } = db;
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

        const order = await addEntity(Order, {...orderBodyData });

        const orderItems = items.map((stock) => {
            return Object.assign({}, {
                orderId: order.id,
                total: stock.total,
                cases: stock.cases,
                productCode: stock.productCode,
                productName: stock.productName,
            });
        });

        const orderitems = await Order_items.bulkCreate(orderItems);
        order.item = orderitems;

        return order;
    }

    async getAllOrders(query) {
        const { limit, offset } = paginate(query);
        const data = await Order.findAll({
            include: ['orderItems'],
            limit,
            offset
        });
        return data;
    }

    async queryOrders({ id, warehouseId, status }) {
        let whereStatement = {};
        if (id) whereStatement.id = id;
        if (warehouseId) whereStatement.warehouseId = warehouseId;
        if (status) whereStatement.status = status;

        const data = await Order.findAll({
            where: whereStatement,
            include: ['orderItems'],
        });
        return data;
    }

    async printOrders(res) {
        const data = await findMultipleByKey(Order);
        await AuthUtils.downloadResource(res, 'orders.csv', orderfields, data);
    }

    async planOrderLoad(data) {
        const { orderId, truckId } = data;
        const getTruck = await findByKeys(Truck, { shipRegister: truckId });
        orderId.map(async(id) => {
            await updateByKey(
                Order, {
                    truckId,
                    loadId: CommonService.generateReference('G00'),
                    status: 'planned',
                    truckOwner: getTruck.shipOwner,
                }, { salesOrderId: id }
            );
        });

        return { status: 'success', data: 'Order Successfully Planned' };
    }

    async generateOrderInvoice({ id }) {
        const getOrder = await Order.findOne({ where: { id } });
        const customerDetails = await findByKeys(CustomerAddress, {
            customerId: getOrder.customerId,
        });

        await updateByKey(
            Order, {
                status: 'invoiced',
                shipTo: customerDetails.shipToAddr1,
                invoiceId: CommonService.generateReference('RTY'),
            }, { id }
        );
        const getOrders = await Order.findOne({
            where: { id },
            include: ['orderItems'],
        });

        return getOrders;
    }

    async pickOrder({ id }) {
        await updateByKey(
            Order, {
                picked: true,
                status: 'picked',
            }, { id }
        );

        const getOrders = await Order.findOne({
            where: { id },
            include: ['orderItems'],
        });

        return getOrders;
    }
}