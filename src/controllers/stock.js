import StockService from '../services/stock';

const stockService = new StockService();
export class StockController {
  async getStocks(req, res, next) {
    try {
      const stocks = await stockService.getStocks();
      res.status(200).send(stocks);
    } catch (error) {
      next(error);
    }
  }

  async conditionalFindStock(req, res, next) {
    try {
      const stocks = await stockService.stockParamSearch(req.query);
      res.status(200).send(stocks);
    } catch (error) {
      next(error);
    }
  }
}
