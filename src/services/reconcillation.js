import db from '../models';
import DbService from './dbservice';
import AuthUtils from '../utils/auth';
import paginate from '../utils/paginate';
import { reconcillationField } from '../utils/tableFields';

const { Reconcillation, User } = db;
const { addEntity, findMultipleByKey } = DbService;

export default class ReconcillationService {
  async postReconcillation({ status }, data) {
    const result = {
      warehouse: status,
      ...data,
    };
    const reconcile = await addEntity(Reconcillation, { ...result });

    return reconcile;
  }

  async getWHMwarehouse({ status }, query) {
    const { limit, offset } = paginate(query);
    const { count, rows } = await Reconcillation.findAndCountAll({
      where: {
        warehouse: status,
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

  async downloadReconcillation({ status }, res) {
    const data = await findMultipleByKey(Reconcillation, {
      warehouse: status,
    });
    await AuthUtils.downloadResource(
      res,
      'reconcillation.csv',
      reconcillationField,
      data
    );
  }
}
