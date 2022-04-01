import ReconcillationService from '../services/reconcillation';

const reconcillationService = new ReconcillationService();

export class ReconcileController {
  async createReconcile(req, res, next) {
    try {
      const reconcile = await reconcillationService.postReconcillation(
        req.tokenData,
        req.body
      );
      res.status(201).send(reconcile);
    } catch (error) {
      next(error);
    }
  }

  async getWHMreconcillationn(req, res, next) {
    try {
      const reconcileData = await reconcillationService.getWHMwarehouse(
        req.tokenData,
        req.query
      );
      res.status(201).send(reconcileData);
    } catch (error) {
      next(error);
    }
  }

  async csvDownloadReconcillation(req, res, next) {
    try {
      const csvData = await reconcillationService.downloadReconcillation(
        req.tokenData,
        res
      );
      res.status(200).send(csvData);
    } catch (error) {
      next(error);
    }
  }
}
