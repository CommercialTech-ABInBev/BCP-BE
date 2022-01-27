import StockService from '../services/stocks';

const stockService = new StockService();
export class StockController {
    async stockCheckIn(req, res, next) {
        try {
            const newStock = await stockService.createStock(req.body, req.file, req.tokenData);
            res.status(201).send(newStock);
        } catch (error) {
            next(error);
        }
    }

    async approveCheckIn(req, res, next) {
        try {
            const { id } = req.query;

            const updatedCheckIn = await stockService.approveStock(req.tokenData, id);

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
            const { role, id } = req.tokenData;
            const stocks = await stockService.getCheckIns(role, id);
            res.status(200).send(stocks);
        } catch (error) {
            next(error);
        }
    }

    async checkOut(req, res, next) {
        try {
            const { id } = req.query;
            const checkOutData = await stockService.checkOut(id, req.body, req.tokenData);
            res.status(201).send(checkOutData);
        } catch (error) {
            next(error);
        }
    }

    async getCheckOut(req, res, next) {
        try {
            const { role, id } = req.tokenData;
            const checkOutData = await stockService.getCheckOuts(role, id);

            res.status(200).send(checkOutData);
        } catch (error) {
            next(error);
        }
    }

    async rejectCheckOut(req, res, next) {
        try {
            const { id } = req.query;

            const rejectedCheckOut = await stockService.rejectCheckOuts(req.tokenData, id);
            res.status(200).send(rejectedCheckOut);
        } catch (error) {
            next(error);
        }
    }

    async rejectCheckIn(req, res, next) {
        try {
            const { id } = req.query;

            const rejectedCheckIn = await stockService.rejectCheckIns(req.tokenData, id);
            res.status(200).send(rejectedCheckIn);
        } catch (error) {
            next(error);
        }
    }

    async stockAdjustment(req, res, next) {
        try {
            const { id } = req.query;

            const adjustedStock = await stockService.adjustedStock(id, req.body, req.tokenData);
            res.status(200).send(adjustedStock);
        } catch (error) {
            next(error);
        }
    }

    async approveStockAdjustment(req, res, next) {
        try {
            const { id } = req.query;

            const adjustedStock = await stockService.approveAdjustment(id, req.body, req.tokenData);
            res.status(200).send(adjustedStock);
        } catch (error) {
            next(error);
        }
    }
}