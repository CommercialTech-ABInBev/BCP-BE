import sequelize from 'sequelize';

import db from '../models';
import DbService from './dbservice';
import CommonService from './common';
import AuthUtils from '../utils/auth';
import paginate from '../utils/paginate';
import { orderfields } from '../utils/tableFields';

const { Truck, Order, Customer, Inventory, Order_items, CustomerAddress } = db;
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
        const dateString = date.toString();
        const orderObject = items.map((obj) => ({...obj, orderId: order.id }));

        const orderitems = await Order_items.bulkCreate(orderObject);
        order.item = orderitems;

        items.map(async({ cases, productCode }) => {
            const options = { stockCode: productCode, warehouse: warehouseId };
            const stock = await findByKeys(Inventory, options);
            const data = Number(stock.freeStockCs) - Number(cases).toFixed();
            await updateByKey(
                Inventory, {
                    freeStockCs: data,
                    dateLastStockMove: dateString,
                },
                options
            );
        });

        const customer = await findByKeys(Customer, { customerId });
        if (customer.currentBalance !== null) {
            let option = (
                Number(customer.currentBalance) + Number(totalAmount)
            ).toFixed();

            await updateByKey(
                Customer, {
                    currentBalance: option,
                }, { customerId }
            );
        } else {
            await updateByKey(
                Order, {
                    status: 'cancelled',
                }, { id: order.id }
            );
        }

        return order;
    }

    async editCustomer(data, id) {
        await updateByKey(Customer, {...data }, { id });
        const datas = await findByKeys(Customer, { id });

        return datas;
    }

    async getAllOrders(query) {
        const { limit, offset } = paginate(query);
        const { count, rows } = await Order.findAndCountAll({
            include: ['orderItems'],
            limit,
            offset,
            distinct: true,
            order: sequelize.literal('createdAt DESC'),
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
            order: sequelize.literal('createdAt DESC'),
        });

        return {
            TotalCount: count,
            data: rows,
        };
    }
    async queryOrders(tokenData, { id, status, loadId }) {
        let whereStatement = {};
        if (id) whereStatement.id = id;
        if (status) whereStatement.status = status;
        if (loadId) whereStatement.loadId = loadId;
        if (tokenData.role !== 'cic') whereStatement.warehouseId = tokenData.status;

        const data = await Order.findAll({
            where: whereStatement,
            include: ['orderItems'],
            order: sequelize.literal('createdAt DESC'),
        });
        return data;
    }

    async printOrders({ role, status }, res) {
        const data =
            role === 'cic' ?
            await Order.findAll({
                include: ['orderItems'],
            }) :
            await Order.findAll({
                where: { warehouseId: status },
                include: ['orderItems'],
                order: sequelize.literal('createdAt DESC'),
            });

        let printData = Object.values(data)
            .map((order) =>
                order.orderItems.map((item) => {
                    return {
                        total: item.total,
                        cases: item.cases,
                        status: order.status,
                        loadId: order.loadId,
                        volume: item.volume,
                        shipTo: order.shipTo,
                        pallets: item.pallets,
                        truckId: order.truckId,
                        account: order.account,
                        comment: order.comment,
                        vatAmount: order.vatAmount,
                        invoiceId: order.invoiceId,
                        createdBy: order.createdBy,
                        truckOwner: order.truckOwner,
                        customerId: order.customerId,
                        warehouseId: order.warehouseId,
                        productName: item.productName,
                        productCode: item.productCode,
                        totalAmount: order.totalAmount,
                        deliveryDate: order.deliveryDate,
                        salesOrderId: order.salesOrderId,
                        subTotalAmount: order.subTotalAmount,
                    };
                })
            )
            .flat();

        await AuthUtils.downloadResource(res, 'orders.csv', orderfields, printData);
    }

    async planOrderLoad(data) {
        const { orderId, truckId } = data;

        const {
            depot,
            shipSize,
            shipOwner,
            isAvailable,
            truckStatus,
            supplierName,
        } = await findByKeys(Truck, { shipRegister: truckId });

        if (!isAvailable)
            return { status: 'Failed', data: 'Truck not available for selection' };

        const loadId = CommonService.generateReference('G00');
        orderId.forEach(async(id) => {
            await updateByKey(
                Order, {
                    loadId,
                    truckId,
                    truckStatus,
                    status: 'planned',
                    truckDepot: depot,
                    truckOwner: shipOwner,
                    truckShipSize: shipSize,
                    truckSupplierName: supplierName,
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
        const { customerId } = await findByKeys(Order, { id });
        const { shipToAddr1 } = await findByKeys(CustomerAddress, {
            customerId,
        });

        await updateByKey(
            Order, {
                status: 'invoiced',
                shipTo: shipToAddr1,
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

    async searchOrder({ role, status }, { search, orderStatus }) {
        let optionsObj = {
            where: {
                [sequelize.Op.or]: [{
                        salesOrderId: {
                            [sequelize.Op.like]: '%' + search + '%',
                        },
                    },
                    {
                        account: {
                            [sequelize.Op.like]: '%' + search + '%',
                        },
                    },
                ],
            },
            include: ['orderItems'],
            distinct: true,
        };
        if (orderStatus) optionsObj.where.status = orderStatus;
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
            Order, {
                status: 'cancelled',
            }, { id }
        );

        order.orderItems.forEach(async({ total, productCode }) => {
            const options = { stockCode: productCode, warehouse: order.warehouseId };
            const stock = await findByKeys(Inventory, options);

            await updateByKey(
                Inventory, {
                    freeStockCs: Number(stock.freeStockCs) + Number(total),
                    dateLastStockMove: dateString,
                },
                options
            );
        });

        return { status: 'Success', message: 'Order Cancelled Successfully !!' };
    }

    async distReplanLoad({ loadId }, { truckId }) {
        const orders = await findMultipleByKey(Order, { loadId });

        const { depot, shipOwner, shipSize, truckStatus, supplierName } =
        await findByKeys(Truck, { shipRegister: truckId });

        await updateByKey(
            Truck, {
                isAvailable: true,
            }, { shipRegister: orders[0].truckId }
        );

        orders.forEach(async({ salesOrderId }) => {
            await updateByKey(
                Order, {
                    truckId,
                    truckStatus,
                    status: 'planned',
                    truckDepot: depot,
                    truckOwner: shipOwner,
                    truckShipSize: shipSize,
                    truckSupplierName: supplierName,
                }, { salesOrderId }
            );
        });

        await updateByKey(
            Truck, {
                isAvailable: false,
            }, { shipRegister: truckId }
        );

        return { status: 'success', data: 'Order Successfully Re-planned' };
    }
}