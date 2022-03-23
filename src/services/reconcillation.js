import sequelize from 'sequelize';

import db from '../models';
import DbService from './dbservice';
import AuthUtils from '../utils/auth';
import paginate from '../utils/paginate';
import { stockField } from '../utils/tableFields';

const { Reconcillation, User } = db;
const { updateByKey, findMultipleByKey, addEntity } = DbService;

export default class ReconcillationService {
  async postReconcillation(data) {
    const res = { amount: data.quantity * 1000, ...data };
    const reconcile = await addEntity(Reconcillation, { ...res });

    return reconcile;
  }

  async getWHMwarehouse({ id }, query) {
    const { limit, offset } = paginate(query);
    const userData = await User.findOne({ where: { id } });
    const { count, rows } = await Reconcillation.findAndCountAll({
      where: {
        warehouse: userData.inviteStatus,
      },
      limit,
      offset,
      distinct: true,
    });

    return {
      TotalCount: count,
      data: rows,
    };
  }
}
