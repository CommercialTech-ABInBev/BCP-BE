import CommonService from './common';
import env from '../config/env';
import DbService from '../repositories';
import AuthUtils from '../utils/auth';
import { HttpError } from '@src/middlewares/api-error-validator';
import db from '../models';

const { Tokens, Users, Stocks } = db;

const { addEntity, findByKeys, updateByKey, deleteByKey, findMultipleByKey } = DbService;


export default class stockService {
    async createStock(body, file) {
        const imageUrl = await CommonService.uploadImage(file);
        const data = {
            ...body,
            stockType: 'Stock',
            status: 'Awaiting WM',
            supportDocFile: imageUrl
        }

        const stockItem = await addEntity(Stocks, data);
        return stockItem;
    }

    async approveStock(role, id) {
        role === 'Admin' ?
            await updateByKey(Stocks, { status: 'Approved' }, { id }) :
            await updateByKey(Stocks, { status: 'Awaiting Admin' }, { id });

        const getStockToApprove = await findByKeys(Stocks, { id });

        return getStockToApprove;
    }

    async getApprovedStocks() {
        const data = await findMultipleByKey(Stocks, { status: 'Approved' });
        return data;
    }

    async getCheckIns() {
        const data = await findMultipleByKey(Stocks);
        return data;
    }
}