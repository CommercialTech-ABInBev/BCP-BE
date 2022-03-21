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

  async getStockPrices(req, res, next) {
    try {
      const stockPrice = await stockService.getStockPrice(req.query);
      res.status(200).send(stockPrice);
    } catch (error) {
      next(error);
    }
  }

  async searchStocks(req, res, next) {
    try {
      const stockPrice = await stockService.searchStock(req.query.search);
      res.status(200).send(stockPrice);
    } catch (error) {
      next(error);
    }
  }

  async getWHMstocks(req, res, next) {
    try {
      const stocks = await stockService.getWHstocks(req.tokenData, req.query);
      res.status(200).send(stocks);
    } catch (error) {
      next(error);
    }
  }
}
