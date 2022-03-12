import db from '../models';
import DbService from './dbservice';
import CommonService from './common';
import AuthUtils from '../utils/auth';
import { HttpError } from '@src/middlewares/api-error-validator';

const { Order, Order_items } = db;
const { findByKeys, updateByKey, deleteByKey, addEntity } = DbService;



export default class OrderService {
    async createOrder(data, { name }) {
        console.log(name);
        const {
            warehouseId,
            account,
            deliveryDate,
            vatAmount,
            subTotalAmount,
            totalAmount,
            items
        } = data;

        const orderBodyData = {
            warehouseId,
            account,
            deliveryDate,
            vatAmount,
            subTotalAmount,
            totalAmount,
            createdBy: name,
            status: 'captured',
            salesOrderId: 'example 1'
        }

        const order = await addEntity(Order, {...orderBodyData });

        const orderItems = items.map(stock => {
            return Object.assign({}, {
                orderId: order.id,
                total: stock.total,
                cases: stock.cases,
                productCode: stock.productCode,
                productName: stock.productName,
            })
        })

        const orderitems = await Order_items.bulkCreate(orderItems);
        order.item = orderitems
        return order;
    }
}