import DbService from '../repositories';
import db from '../models';

const { Notifications } = db;
const { findMultipleByKey } = DbService;

export default class NotificationService {
  async getAllNotifications() {
    const data = await findMultipleByKey(Notifications);
    return data;
  }

  async getNotifications(id) {
    const data = await findMultipleByKey(Notifications, { fromId: id });
    return data;
  }

  async getNotificationsByStockId(id) {
    const data = await findMultipleByKey(Notifications, { stockId: id });
    return data;
  }
}
