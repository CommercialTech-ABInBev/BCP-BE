import NoticationService from '../services/notification';

const notificationService = new NoticationService();

export class NotificationController {
  async getAllNotifications(req, res, next) {
    try {
      const notificationData = await notificationService.getAllNotifications();
      res.status(201).send(notificationData);
    } catch (error) {
      next(error);
    }
  }

  async getAuthUserNotifications(req, res, next) {
    try {
      const { id } = req.tokenData;
      const notificationData = await notificationService.getNotifications(id);

      res.status(201).send(notificationData);
    } catch (error) {
      next(error);
    }
  }

  async getStockUserNotifications(req, res, next) {
    try {
      const { id } = req.query;
      const notificationData =
        await notificationService.getNotificationsByStockId(id);

      res.status(201).send(notificationData);
    } catch (error) {
      next(error);
    }
  }
}
