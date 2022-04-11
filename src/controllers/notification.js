import NoticationService from '../services/notification';

const notificationService = new NoticationService();

export class NotificationController {
  async getAllNotifications(req, res, next) {
    try {
      const notificationData = await notificationService.getAllNotifications(
        req.query
      );
      res.status(200).send(notificationData);
    } catch (error) {
      next(error);
    }
  }

  async getAuthUserNotifications(req, res, next) {
    try {
      const { id } = req.tokenData;
      const notificationData = await notificationService.getNotifications(
        req.query,
        id
      );

      res.status(200).send(notificationData);
    } catch (error) {
      next(error);
    }
  }

  async getStockUserNotifications(req, res, next) {
    try {
      const { id } = req.query;
      const notificationData =
        await notificationService.getNotificationsByStockId(req.query, id);

      res.status(200).send(notificationData);
    } catch (error) {
      next(error);
    }
  }
}
