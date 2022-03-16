import db from '../models';
import DbService from './dbservice';
import CommonService from './common';
import AuthUtils from '../utils/auth';
import { HttpError } from '@src/middlewares/api-error-validator';

const { Inventory, Truck } = db;
const { addEntity, findMultipleByKey, allEntities, updateByKey } = DbService;

export default class StockService {
  async getStocks() {
    let totalFreeStock = 0;
    let totalInTransit = 0;

    const inventories = await allEntities(Inventory);
    const stockData = inventories.map((stock) => {
      totalFreeStock += Number(stock.freeStockCs);
      totalInTransit += Number(stock.inTransitCs);

      return Object.assign(
        {},
        {
          volume: stock.size,
          stockCode: stock.stockCode,
          stockName: stock.description,
          container: stock.packageType,
          inTransit: stock.inTransitCs,
          freeStock: stock.freeStockCs,
        }
      );
    });

    const getUnique = [
      ...new Map(stockData.map((item) => [item.stockCode, item])).values(),
    ];

    return {
      totalFreeStock,
      totalInTransit,
      data: getUnique,
    };
  }

  async stockParamSearch({ location, container, volume }) {
    let whereStatement = {};
    if (location) whereStatement.site = location;
    if (container) whereStatement.packageType = container;
    if (volume) whereStatement.size = volume;

    const filterStockData = await Inventory.findAll({
      where: whereStatement,
    });

    const stockData = filterStockData.map((stock) => {
      return Object.assign(
        {},
        {
          volume: stock.size,
          stockCode: stock.stockCode,
          stockName: stock.description,
          container: stock.packageType,
          inTransit: stock.inTransitCs,
          freeStock: stock.freeStockCs,
        }
      );
    });

    return stockData;
  }
}
