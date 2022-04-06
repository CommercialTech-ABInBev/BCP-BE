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
      const stock = await stockService.searchStock(
        req.tokenData,
        req.query.search
      );
      res.status(200).send(stock);
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

  async addStock(req, res, next) {
    try {
      const stocks = await stockService.updateStock(
        req.tokenData,
        req.body,
        next
      );
      res.status(200).send(stocks);
    } catch (error) {
      next(error);
    }
  }

  async csvDownloadStock(req, res, next) {
    try {
      const csvData = await stockService.printStocks(req.tokenData, res);
      res.status(200).send(csvData);
    } catch (error) {
      next(error);
    }
  }
}
