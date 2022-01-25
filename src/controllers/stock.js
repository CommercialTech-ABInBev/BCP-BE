import StockService from '../services/stocks';

const stockService = new StockService();
export class StockController {
    async stockCheckIn(req, res, next) {
        try {
            const newStock = await stockService.createStock(req.body, req.file);
            res.status(201).send(newStock)
        } catch (error) {
            next(error);
        }
    }
}