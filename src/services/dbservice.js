import { HttpError } from '@src/middlewares/api-error-validator';

const BaseRepository = {
    async addEntity(model, data) {
        try {
            const { dataValues: value } = await model.create(data);
            return value;
        } catch (error) {
            throw new HttpError(404, error.message);
        }
    },
    async findByKeys(model, keys = {}) {
        const results = await model.findOne({ where: keys });

        if (!results)
            throw new HttpError(404, ` Not Found in ${this.model} schema!!`);
        return results;
    },

    async findMultipleByKey(model, keys = {}) {
        const results = model.findAll({
            where: keys,
        });
        if (!results)
            throw new HttpError(404, ` Not Found in ${this.model} schema!!`);
        return results;
    },

    async updateByKey(model, updateData, keys) {
        const rowaffected = await model.update(updateData, {
            returning: true,
            where: keys,
        });
        return rowaffected;
    },

    async deleteByKey(model, keys) {
        try {
            const numberOfRowsDeleted = await model.destroy({ where: keys });
            if (!numberOfRowsDeleted)
                throw new HttpError(404, ` Not Found in ${this.model} schema!!`);
            return true;
        } catch (error) {
            throw new Error(error);
        }
    },

    async allEntities(model) {
        const entities = await model.findAll({ where: {} });
        return entities;
    },

    async rowCountByKey(model, keys) {
        const entities = await model.findAndCountAll({
            returning: true,
            where: keys,
        });
        if (!entities)
            throw new HttpError(404, ` Not Found in ${this.model} schema!!`);
        return entities;
    },
};
export default BaseRepository;