import db from '../models';
import DbService from './dbservice';
import CommonService from './common';
import AuthUtils from '../utils/auth';
import { HttpError } from '@src/middlewares/api-error-validator';

const { Inventory, Truck, StockPrice } = db;
const { addEntity, findMultipleByKey, allEntities, updateByKey } = DbService;

export default class StockService {
    async getStocks() {
        let totalFreeStock = 0;
        let totalInTransit = 0;

        const { count, rows } = await Inventory.findAndCountAll({ where: {} });
        const stockData = rows.map((stock) => {
            totalFreeStock += Number(stock.freeStockCs);
            totalInTransit += Number(stock.inTransitCs);

            return Object.assign({}, {
                volume: stock.size,
                stockCode: stock.stockCode,
                stockName: stock.description,
                container: stock.packageType,
                inTransit: stock.inTransitCs,
                freeStock: stock.freeStockCs,
            });
        });

        const getUnique = [
            ...new Map(stockData.map((item) => [item.stockCode, item])).values(),
        ];

        return {
            totalFreeStock,
            totalInTransit,
            totalCount: count,
            data: getUnique,
        };
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
            });
        });

        return stockData;
    }

    async getStockPrice({ stockCode }) {
        const stockPrice = await StockPrice.findOne({
            where: { stockCode },
        })

        return stockPrice;
    }
}