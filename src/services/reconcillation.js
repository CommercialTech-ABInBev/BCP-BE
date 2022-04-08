import db from '../models';
import DbService from './dbservice';
import AuthUtils from '../utils/auth';
import paginate from '../utils/paginate';
import { reconcillationField } from '../utils/tableFields';

const { Reconcillation, Customer, Inventory } = db;
const { addEntity, findMultipleByKey, updateByKey, findByKeys } = DbService;

export default class ReconcillationService {
    async postReconcillation({ status }, { productCode, quantity, customerId, total }) {
        const result = {
            amount: total,
            quantity,
            warehouse: status,
            account: customerId,
            stock: productCode,
        };
        const options = { stockCode: productCode, warehouse: status };
        const stock = await findByKeys(Inventory, options);

        const updateData = Number(stock.freeStockCs) + Number(quantity);
        console.log(updateData, '========', stock.freeStockCs, '========', quantity);
        await updateByKey(
            Inventory, {
                freeStockCs: updateData,
            },
            options
        );

        const customer = await findByKeys(Customer, {
            customerId,
        });

        let option = Number(customer.currentBalance) - Number(total);

        await updateByKey(
            Customer, {
                currentBalance: option,
            }, { customerId }
        );

        const reconcile = await addEntity(Reconcillation, {...result });
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