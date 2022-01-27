const { Op } = require('sequelize');
import CommonService from './common';
import env from '../config/env';
import DbService from '../repositories';
import AuthUtils from '../utils/auth';
import { HttpError } from '@src/middlewares/api-error-validator';
import db from '../models';

const { Stocks, CheckOuts, Users } = db;

const { addEntity, findByKeys, updateByKey, deleteByKey, findMultipleByKey } =
DbService;

export default class stockService {
    async createStock(body, file) {
        const imageUrl = await CommonService.uploadImage(file);
        const data = {
            ...body,
            stockType: 'Stock',
            status: 'Awaiting Admin',
            supportDocFile: imageUrl,
        };

        const stockItem = await addEntity(Stocks, data);
        return stockItem;
    }

    async approveStock(role, id) {
        role === 'WM' ?
            await updateByKey(Stocks, { status: 'Approved' }, { id }) :
            await updateByKey(Stocks, { status: 'Awaiting WM' }, { id });

        const getStockToApprove = await findByKeys(Stocks, { id });

        return getStockToApprove;
    }

    async rejectCheckOuts(id) {
        const checkoutData = await findByKeys(CheckOuts, { id });
        const getStock = await findByKeys(Stocks, { id: checkoutData.stockId });

        await updateByKey(
            Stocks, {
                currQty: parseInt(getStock.currQty) + parseInt(checkoutData.quantity),
                prevQty: parseInt(getStock.prevQty) - parseInt(checkoutData.quantity),
            }, { id: checkoutData.stockId }
        );
        await updateByKey(CheckOuts, { status: 'Rejected' }, { id });

        const getRejectedCheckOut = await findByKeys(CheckOuts, { id });
        return getRejectedCheckOut;
    }

    async rejectCheckIns(id) {
        await updateByKey(Stocks, { status: 'Rejected' }, { id });
        const getRejectedCheckIn = await findByKeys(Stocks, { id });
        return getRejectedCheckIn;
    }

    async getApprovedStocks() {
        const data = await findMultipleByKey(Stocks, { status: 'Approved' });
        return data;
    }

    async getCheckIns(role, id) {
        let data;
        const getUser = await findByKeys(Users, { id });

        role === 'AM' ?
            (data = await findMultipleByKey(Stocks)) :
            role === 'WM' ?
            (data = await findMultipleByKey(Stocks, {
                location: getUser.location,
                status: {
                    [Op.ne]: 'Awaiting Admin',
                },
            })) :
            (data = await findMultipleByKey(Stocks, {
                location: getUser.location,
            }));

        return data;
    }

    async checkOut(id, { comment, newQty }) {
        const getStock = await findByKeys(Stocks, { id });
        if (getStock.status !== 'Approved') {
            throw new HttpError(404, 'Not allowed, Stock not approved yet !!');
        }
        if (getStock.currQty < newQty) {
            throw new HttpError(
                404,
                'Number cannot be higher the total stock in the db'
            );
        }
        await updateByKey(
            Stocks, {
                prevQty: getStock.currQty,
                currQty: getStock.currQty - newQty,
            }, { id }
        );

        const date = new Date();

        const data = {
            title: getStock.title,
            location: getStock.location,
            stockId: getStock.id,
            stockType: getStock.stockType,
            status: getStock.status,
            brand: getStock.brand,
            quantity: newQty,
            comment: comment,
            requestDate: date.toISOString(),
        };

        const checkOutData = await addEntity(CheckOuts, data);

        return checkOutData;
    }

    async getCheckOuts(role, id) {
        let data;
        const getUser = await findByKeys(Users, { id });

        role !== 'AM' ?
            (data = await findMultipleByKey(CheckOuts, {
                location: getUser.location,
            })) :
            (data = await findMultipleByKey(CheckOuts));

        return data;
    }

    async adjustedStock(id, { newQty }) {
        const getStock = await findByKeys(Stocks, { id });

        if (!getStock) throw new HttpError(404, 'Stocks Not Found!');
        await updateByKey(Stocks, {
            stockAdjustTo: newQty,
            stockAdjustStatus: 'Pending',
            stockAdjustFrom: getStock.currQty
        }, { id });

        const data = await findByKeys(Stocks, { id });

        return data;
    }

    async approveAdjustment(id, { status }) {
        console.log(status, '=======<<<>>>><<<>>>><<<<>>>><');
        const getStock = await findByKeys(Stocks, { id });

        if (!getStock) throw new HttpError(404, 'Stocks Not Found!');
        status === 'Approved' ?
            await updateByKey(Stocks, {
                stockAdjustStatus: status,
                currQty: getStock.stockAdjustTo
            }, { id }) : await updateByKey(Stocks, {
                stockAdjustStatus: status,
            }, { id });

        const data = await findByKeys(Stocks, { id });

        return data;
    }
}