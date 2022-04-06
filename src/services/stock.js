import sequelize from 'sequelize';

import db from '../models';
import DbService from './dbservice';
import AuthUtils from '../utils/auth';
import paginate from '../utils/paginate';
import { stockField } from '../utils/tableFields';
import HttpError from '../middlewares/api-error-validator';

const { Inventory, StockPrice, User } = db;
const { updateByKey, findMultipleByKey } = DbService;
export default class StockService {
    async getStocks() {
        let totalFreeStock = 0;
        let totalInTransit = 0;

        const { count, rows } = await Inventory.findAndCountAll({ where: {} });
        const stockData = rows.map((stock) => {
            totalFreeStock += Number(stock.freeStockCs);
            totalInTransit += Number(stock.inTransitCs);

            return Object.assign({}, {
                id: stock.id,
                volume: stock.size,
                stockCode: stock.stockCode,
                stockName: stock.description,
                container: stock.packageType,
                inTransit: stock.inTransitCs,
                freeStock: stock.freeStockCs,
                emptyStockCode: stock.emptyStockCode,
                emptyDesc: stock.emptyDesc,
                emptyPrices: stock.emptyPrices,
            });
        });

        // const getUnique = [
        //     ...new Map(stockData.map((item) => [item.stockCode, item])).values(),
        // ];

        return {
            totalFreeStock,
            totalInTransit,
            totalCount: count,
            data: stockData,
        };
    }

    async printStocks({ role, status }, res) {
        const data =
            role === 'cic' ?
            await findMultipleByKey(Inventory) :
            await findMultipleByKey(Inventory, { warehouse: status });
        await AuthUtils.downloadResource(res, 'stock.csv', stockField, data);
    }

    async stockParamSearch({ location, container, volume, warehouseId }) {
        let whereStatement = {};
        if (volume) whereStatement.size = volume;
        if (location) whereStatement.site = location;
        if (container) whereStatement.packageType = container;
        if (warehouseId) whereStatement.warehouse = warehouseId;

        const filterStockData = await Inventory.findAll({
            where: whereStatement,
        });

        const stockData = filterStockData.map((stock) => {
            return Object.assign({}, {
                volume: stock.size,
                stockCode: stock.stockCode,
                warehouseId: stock.warehouse,
                stockName: stock.description,
                container: stock.packageType,
                inTransit: stock.inTransitCs,
                freeStock: stock.freeStockCs,
                emptyStockCode: stock.emptyStockCode,
                emptyDesc: stock.emptyDesc,
                emptyPrices: stock.emptyPrices,
            });
        });

        return stockData;
    }

    async getStockPrice({ stockCode }) {
        const stockPrice = await StockPrice.findOne({
            where: { stockCode },
        });

        return stockPrice;
    }

    async searchStock({ role, status }, query) {
        let optionsObj = {
            where: {
                [sequelize.Op.or]: [{
                        stockCode: {
                            [sequelize.Op.like]: '%' + query + '%',
                        },
                    },
                    {
                        description: {
                            [sequelize.Op.like]: '%' + query + '%',
                        },
                    },
                ],
            },
            distinct: true,
        };

        let queryOptions;

        if (role === 'cic') {
            queryOptions = optionsObj;
        } else {
            optionsObj.where.warehouse = status;
            queryOptions = optionsObj;
        }

        const { count, rows } = await Inventory.findAndCountAll(queryOptions);

        return { TotalCount: count, stocks: rows };
    }

    async getWHstocks({ status }, query) {
        let totalFreeStock = 0;
        let totalInTransit = 0;
        const { limit, offset } = paginate(query);

        const { count, rows } = await Inventory.findAndCountAll({
            where: {
                warehouse: status,
            },
            limit,
            offset,
            distinct: true,
        });

        rows.map((stock) => {
            totalFreeStock += Number(stock.freeStockCs);
            totalInTransit += Number(stock.inTransitCs);
        });

        return {
            TotalCount: count,
            totalFreeStock,
            totalInTransit,
            data: rows,
        };
    }

    // async updateStock({ status }, data) {
    //     data.forEach(async(elem) => {
    //         const { stockCode, quantity } = elem;
    //         const options = { stockCode, warehouse: status };

    //         const stock = await findMultipleByKey(Inventory, options);
    //         console.log(stock.freeStockCs, '=======>>>><<<');
    //         if (stock.freeStockC === undefined) return { erro: 'Something went wrong' }

    //         await updateByKey(
    //             Inventory, {
    //                 freeStockCs: Number(stock.freeStockCs) + quantity,
    //             },
    //             options
    //         );
    //     });

    //     return { message: `Stocks Successfully Updated!!` };
    // }
}