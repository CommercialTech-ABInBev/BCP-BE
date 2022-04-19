import { literal } from 'sequelize';

import paginate from '../utils/paginate';
import DbService from '../repositories';
import db from '../models';

const { Notifications } = db;
const { findMultipleByKey } = DbService;

export default class NotificationService {
  option = {
    order: literal('createdAt DESC'),
  };

  async getAllNotifications(query) {
    const { limit, offset } = paginate(query);

    this.option.limit = limit;
    this.option.offset = offset;
    const { count, rows } = await Notifications.findAndCountAll(this.option);

    return { total: count, data: rows };
  }

  async getNotifications(query, id) {
    const { limit, offset } = paginate(query);
    this.option.limit = limit;
    this.option.offset = offset;
    this.option.where = { fromId: id };

    const { count, rows } = await Notifications.findAndCountAll(this.option);

    return { total: count, data: rows };
  }

  async getNotificationsByStockId(query, id) {
    const { limit, offset } = paginate(query);
    this.option.limit = limit;
    this.option.offset = offset;
    this.option.where = { stockId: id };

    const { count, rows } = await Notifications.findAndCountAll(this.option);

    return { total: count, data: rows };
  }
}
