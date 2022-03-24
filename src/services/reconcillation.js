import db from '../models';
import DbService from './dbservice';
import paginate from '../utils/paginate';

const { Reconcillation, User } = db;
const { addEntity } = DbService;

export default class ReconcillationService {
  async postReconcillation({ id }, data) {
    const userData = await User.findOne({ where: { id } });
    const result = {
      amount: data.quantity * 1000,
      warehouse: userData.inviteStatus,
      ...data,
    };
    const reconcile = await addEntity(Reconcillation, { ...result });

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
