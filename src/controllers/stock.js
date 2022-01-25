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

    async approveCheckIn(req, res, next) {
        try {
            const { id } = req.query;
            const { role } = req.tokenData;
            const updatedCheckIn = await stockService.approveStock(role, id);

            res.status(200).send(updatedCheckIn);
        } catch (error) {
            next(error);
        }
    }

    async getApprovedStocks(req, res, next) {
        try {
            const approvedStocks = await stockService.getApprovedStocks();
            res.status(200).send(approvedStocks);
        } catch (error) {
            next(error);
        }
    }

    async getAllCheckIns(req, res, next) {
        try {
            const stocks = await stockService.getCheckIns();
            res.status(200).send(stocks);
        } catch (error) {
            next(error);
        }
    }

    async checkOut(req, res, next) {
        try {
            const { id } = req.query;
            const checkOutData = await stockService.checkOut(id, req.body);
            res.status(201).send(checkOutData);
        } catch (error) {
            next(error);
        }
    }
}