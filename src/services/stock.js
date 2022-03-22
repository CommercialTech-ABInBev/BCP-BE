import sequelize from 'sequelize';

import db from '../models';
import DbService from './dbservice';
import paginate from '../utils/paginate';

const { Inventory, StockPrice, User } = db;
const { updateByKey } = DbService;
export default class StockService {
  async getStocks() {
    let totalFreeStock = 0;
    let totalInTransit = 0;

    const { count, rows } = await Inventory.findAndCountAll({ where: {} });
    const stockData = rows.map((stock) => {
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
      return Object.assign(
        {},
        {
          volume: stock.size,
          stockCode: stock.stockCode,
          warehouseId: stock.warehouse,
          stockName: stock.description,
          container: stock.packageType,
          inTransit: stock.inTransitCs,
          freeStock: stock.freeStockCs,
        }
      );
    });

    return stockData;
  }

  async getStockPrice({ stockCode }) {
    const stockPrice = await StockPrice.findOne({
      where: { stockCode },
    });

    return stockPrice;
  }

  async searchStock(query) {
    let options = {
      where: {
        [sequelize.Op.or]: [
          {
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
    };

    const stocks = await Inventory.findAll(options);

    return stocks;
  }

  async getWHstocks({ id }, query) {
    let totalFreeStock = 0;
    let totalInTransit = 0;
    const { limit, offset } = paginate(query);
    const userData = await User.findOne({ where: { id } });

    const { count, rows } = await Inventory.findAndCountAll({
      where: {
        warehouse: userData.inviteStatus,
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

  async updateStock(data) {
    data.forEach(async (elem) => {
      const { stockCode, quantity } = elem;
      const stock = await Inventory.findOne({
        where: { stockCode },
      });

      await updateByKey(
        Inventory,
        {
          freeStockCs: Number(stock.freeStockCs) + quantity,
        },
        { stockCode }
      );
    });

    return { message: `Stocks Successfully Updated!!` };
  }
}
