import sequelize from 'sequelize';

import db from '../models';
import DbService from './dbservice';
import AuthUtils from '../utils/auth';
import paginate from '../utils/paginate';
import { reconcillationField } from '../utils/tableFields';

const { Reconcillation, Customer, Inventory } = db;
const { addEntity, findMultipleByKey, updateByKey, findByKeys } = DbService;

export default class ReconcillationService {
  async postReconcillation(
    { status },
    { productCode, quantity, customerId, total, account, stock }
  ) {
    const result = {
      stock,
      quantity,
      account,
      customerId,
      productCode,
      amount: total,
      warehouse: status,
    };
    const options = { stockCode: productCode, warehouse: status };
    const stockData = await findByKeys(Inventory, options);

    const updateData =
      stockData.freeStockCs !== 0
        ? Number(stockData.freeStockCs) + Number(quantity)
        : quantity;

    await updateByKey(
      Inventory,
      {
        freeStockCs: updateData,
      },
      options
    );

    const customer = await findByKeys(Customer, {
      customerId,
    });

    let option = Number(customer.currentBalance) - Number(total);

    await updateByKey(
      Customer,
      {
        currentBalance: option,
      },
      { customerId }
    );

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
      order: sequelize.literal('createdAt DESC'),
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
