import db from '../models';
import DbService from './dbservice';
import paginate from '../utils/paginate';

const { Reconcillation, User } = db;
const { addEntity } = DbService;

export default class ReconcillationService {
    async postReconcillation(data) {
        const result = { amount: data.quantity * 1000, ...data };
        const reconcile = await addEntity(Reconcillation, {...result });

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