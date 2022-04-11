const { Op } = require('sequelize');
import CommonService from './common';
import DbService from '../repositories';
import AuthUtils from '../utils/auth';
import { HttpError } from '@src/middlewares/api-error-validator';
import db from '../models';

const { Stocks, CheckOuts, Users, Notifications } = db;
const { addEntity, findByKeys, updateByKey, findMultipleByKey } = DbService;
const roleData = {
    BM: 'Brand Manager',
    WM: 'Ware-House Manager',
    AM: 'Admin',
};

const fields = [{
        label: 'ID',
        value: 'id',
    },
    {
        label: 'BRAND',
        value: 'brand',
    },
    {
        label: 'TITLE',
        value: 'title',
    },
    {
        label: 'STATUS',
        value: 'status',
    },
    {
        label: 'LOCATION',
        value: 'location',
    },
    {
        label: 'CURRENT QTY',
        value: 'currQty',
    },
    {
        label: 'PREVIOUS QTY',
        value: 'prevQty',
    },
    {
        label: 'STOCK TYPE',
        value: 'stockType',
    },
    {
        label: 'SUPPORTING DOCYYPE',
        value: 'supportDocFile',
    },
    {
        label: 'RECENT ADJUSTMENT(from)',
        value: 'stockAdjustFrom',
    },
    {
        label: 'RECENT ADJUSTMENT(to)',
        value: 'stockAdjustTo',
    },
    {
        label: 'ADJUSTMENT STATUS',
        value: 'stockAdjustStatus',
    },
];

export default class StockService {
    async createStock(body, file, { id, role }) {
        const imageUrl = await CommonService.uploadImage(file);
        const data = {
            ...body,
            stockType: 'Stock',
            status: 'Awaiting Admin',
            supportDocFile: imageUrl,
        };

        const stockItem = await addEntity(Stocks, data);
        const getUser = await findByKeys(Users, { id });

        const stockNotificationData = {
            fromId: id,
            stockId: stockItem.id,
            subject: 'Check-in',
            fromName: getUser.fullName,
            message: `Stock check-in ${stockItem.id} was requested by ${roleData[role]} - ${getUser.fullName}`,
        };
        await addEntity(Notifications, stockNotificationData);

        return stockItem;
    }

    async approveStock({ role, id }, stockId) {
        role === 'WM' ?
            await updateByKey(
                Stocks, { status: 'Approved' }, {
                    id: stockId,
                }
            ) :
            await updateByKey(
                Stocks, { status: 'Awaiting WM' }, {
                    id: stockId,
                }
            );

        const getStockToApprove = await findByKeys(Stocks, { id: stockId });

        const stockNotificationData = {
            fromId: id,
            stockId: stockId,
            subject: 'Check-in Approval',
            message: `Stock check-in: ${stockId} was approved by ${roleData[role]}`,
        };
        await addEntity(Notifications, stockNotificationData);

        return getStockToApprove;
    }

    async rejectCheckOuts({ role, id: userId }, id) {
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

        const stockNotificationData = {
            fromId: userId,
            stockId: id,
            subject: 'Check-out Rejection',
            message: `Stock check-out: ${id} was rejected by ${roleData[role]} - ${userId}`,
        };
        await addEntity(Notifications, stockNotificationData);

        return getRejectedCheckOut;
    }

    async rejectCheckIns({ role, id: userId }, id) {
        await updateByKey(Stocks, { status: 'Rejected' }, { id });
        const getRejectedCheckIn = await findByKeys(Stocks, { id });

        const stockNotificationData = {
            fromId: userId,
            stockId: id,
            subject: 'Check-in Rejection',
            message: `Stock check-in: ${id} was rejected by ${roleData[role]} - ${userId}`,
        };
        await addEntity(Notifications, stockNotificationData);

        return getRejectedCheckIn;
    }

    async getApprovedStocks() {
        const data = await findMultipleByKey(Stocks, { status: 'Approved' });
        return data;
    }

    async printAprrovedSTocks(res) {
        const data = await findMultipleByKey(Stocks);
        await AuthUtils.downloadResource(res, 'stocks.csv', fields, data);
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

    async checkOut(id, { comment, newQty }, { role, id: userId }) {
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
            status: 'Awaiting Admin',
            brand: getStock.brand,
            quantity: newQty,
            comment: comment,
            requestDate: date.toISOString(),
        };

        const checkOutData = await addEntity(CheckOuts, data);
        const getUser = await findByKeys(Users, { id: userId });
        const stockNotificationData = {
            stockId: id,
            fromId: userId,
            fromName: getUser.fullName,
            subject: 'Check-out Request',
            message: `Stock check-out ${id} was requested by ${roleData[role]} - ${getUser.fullName}`,
        };
        await addEntity(Notifications, stockNotificationData);

        return checkOutData;
    }

    async approveCheckOuts({ role, id }, stockId) {
        role === 'AM' ?
            await updateByKey(
                CheckOuts, { status: 'Approved' }, {
                    id: stockId,
                }
            ) :
            await updateByKey(
                CheckOuts, { status: 'Awaiting WM' }, {
                    id: stockId,
                }
            );

        const getStockToApprove = await findByKeys(CheckOuts, { id: stockId });

        const stockNotificationData = {
            fromId: id,
            stockId: stockId,
            subject: 'Check-out Approval',
            message: `Stock check-out: ${stockId} was approved by ${roleData[role]}`,
        };
        await addEntity(Notifications, stockNotificationData);

        return getStockToApprove;
    }

    async getCheckOuts(role, id) {
        let data;
        const getUser = await findByKeys(Users, { id });

        role !== 'AM' ?
            (data = await findMultipleByKey(CheckOuts, {
                location: getUser.location,
            })) :
            (data = await findMultipleByKey(CheckOuts));

        return {
            status: 'success',
            data
        };
    }

    async printCheckOuts(res) {
        const data = await findMultipleByKey(CheckOuts);
        await AuthUtils.downloadResource(res, 'checkout.csv', fields, data);
    }

    async adjustedStock(id, { newQty }, { role, id: userId }) {
        const getStock = await findByKeys(Stocks, { id });

        if (!getStock) throw new HttpError(404, 'Stocks Not Found!');
        await updateByKey(
            Stocks, {
                stockAdjustTo: newQty,
                stockAdjustStatus: 'Pending',
                stockAdjustFrom: getStock.currQty,
            }, { id }
        );

        const data = await findByKeys(Stocks, { id });

        const getUser = await findByKeys(Users, { id: userId });
        const stockNotificationData = {
            stockId: id,
            fromId: userId,
            fromName: getUser.fullName,
            subject: 'Stock Adjustment Request',
            message: `Stock Adjustment for stock-${id} was requested by ${roleData[role]} - ${getUser.fullName}`,
        };

        await addEntity(Notifications, stockNotificationData);
        return data;
    }

    async approveAdjustment(id, { status }, { role, id: userId }) {
        const getStock = await findByKeys(Stocks, { id });

        if (!getStock) throw new HttpError(404, 'Stocks Not Found!');
        status === 'Approved' ?
            await updateByKey(
                Stocks, {
                    stockAdjustStatus: status,
                    currQty: getStock.stockAdjustTo,
                }, { id }
            ) :
            await updateByKey(
                Stocks, {
                    stockAdjustStatus: status,
                }, { id }
            );

        const data = await findByKeys(Stocks, { id });

        const getUser = await findByKeys(Users, { id: userId });
        const stockNotificationData = {
            stockId: id,
            fromId: userId,
            fromName: getUser.fullName,
            subject: 'Stock Adjectment Approval/rejection',
            message: `Stock Adjustment for stock-${id} was ${status} by ${roleData[role]} - ${getUser.fullName}`,
        };

        await addEntity(Notifications, stockNotificationData);

        return data;
    }

    async adminDashboard() {
        const { count, rows } = await Stocks.findAndCountAll({
            where: { status: 'Approved' },
        });

        const option = {
            where: {
                status: 'Approved',
            },
            order: [
                ['createdAt', 'DESC']
            ],
        };

        const getLatestCheckIn = await Stocks.findOne(option);
        const getLatestCheckOut = await CheckOuts.findOne(option);
        console.log(getLatestCheckOut, getLatestCheckIn, '=======>>>>>>><<<<<<<>>>>><<<>>');

        if (getLatestCheckIn === null || getLatestCheckOut === null)
            throw new HttpError(404, 'Stocks Not Available!');

        const output = {
            totalStocks: count,
            lastApprovedCheckin: getLatestCheckIn.title,
            lastApprovedCheckout: getLatestCheckOut.title,
            stockData: rows,
        };

        return output;
    }
}