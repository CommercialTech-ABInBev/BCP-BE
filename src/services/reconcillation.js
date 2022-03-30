import db from '../models';
import DbService from './dbservice';
import AuthUtils from '../utils/auth';
import paginate from '../utils/paginate';
import { reconcillationField } from '../utils/tableFields';

const { Reconcillation, User } = db;
const { addEntity, findMultipleByKey } = DbService;

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

  async downloadReconcillation(res) {
    const data = await findMultipleByKey(Reconcillation);
    await AuthUtils.downloadResource(
      res,
      'reconcillation.csv',
      reconcillationField,
      data
    );
  }
}
