import { HttpError } from '@src/middlewares/api-error-validator';

export default class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async addEntity(data) {
        const { dataValues: value } = await this.model.create(data);
        return value;
    }
    async findByKeys(keys = {}) {
        const results = this.model.findOne({ where: keys });
        if (!results) throw new HttpError(404, ` Not Found in ${this.model} schema!!`);
        return results;
    }

    async findMultipleByKey(keys = {}) {
        const results = this.model.findAll({
            where: keys
        });;
        if (!results) throw new HttpError(404, ` Not Found in ${this.model} schema!!`);
        return results;
    }

    async updateByKey(updateData, keys) {

        const rowaffected = await this.model.update(
            updateData, { returning: true, where: keys }
        );
        return rowaffected;
    }

    async deleteByKey(keys) {
        try {
            const numberOfRowsDeleted = await this.model.destroy({ where: keys });
            if (!numberOfRowsDeleted) throw new HttpError(404, ` Not Found in ${this.model} schema!!`);
            return true;
        } catch (error) {
            throw new Error(error);
        }
    }

    async allEntities() {
        const entities = await this.model.findAll({ where: {} });
        return entities
    }

    async rowCountByKey(keys) {
        const entities = await this.model.findAndCountAll({ returning: true, where: keys });
        if (!entities) throw new HttpError(404, ` Not Found in ${this.model} schema!!`);
        return entities;
    }
}