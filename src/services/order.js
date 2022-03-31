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

        const order = await addEntity(Order, {...orderBodyData });

        const date = new Date();
        let dateString = date.toString();
        const orderObject = items.map((obj) => ({...obj, orderId: order.id }));

        const orderitems = await Order_items.bulkCreate(orderObject);
        order.item = orderitems;

        items.map(async({ total, productCode }) => {
            const options = { stockCode: productCode, warehouse: warehouseId };

            const stock = await Inventory.findOne({
                where: options,
            });

            await updateByKey(
                Inventory, {
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

    async getWHMorders({ id }, query) {
        const { limit, offset } = paginate(query);
        const userData = await User.findOne({ where: { id } });

        const { count, rows } = await Order.findAndCountAll({
            where: {
                warehouseId: userData.inviteStatus,
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

        if (!getTruck.isAvailable)
            return { status: 'Failed', data: 'Truck not available for selection' };

        orderId.forEach(async(id) => {
            await updateByKey(
                Order, {
                    truckId,
                    status: 'planned',
                    truckDepot: getTruck.depot,
                    truckOwner: getTruck.shipOwner,
                    truckShipSize: getTruck.shipSize,
                    truckStatus: getTruck.truckStatus,
                    truckSupplierName: getTruck.supplierName,
                    loadId: CommonService.generateReference('G00'),
                }, { salesOrderId: id }
            );
        });

        await updateByKey(
            Truck, {
                isAvailable: false,
            }, { shipRegister: truckId }
        );

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

    async searchOrder(query) {
        let options = {
            where: {
                [sequelize.Op.or]: [{
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

        const { count, rows } = await Order.findAndCountAll(options);
        return { TotalCount: count, orders: rows };
    }
}