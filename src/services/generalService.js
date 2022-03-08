const { ApiError } = require('../utils');

const GeneralService = {
  /**
   * add entity to database
   * @async
   * @param {object} model - database model
   * @param {object} data - model data
   * @returns {Promis-Object} A promise object with entity details
   * @memberof GeneralService
   */
  async addEntity(model, data) {
    try {
      const { dataValues: value } = await model.create(data);
      return value;
    } catch (error) {
      throw new Error(error);
    }
  },

  /**
   * find entity in database by key
   * @async
   * @param {object} model - database model
   * @param {object} keys - object containing query key and value
   * e.g { id: 5 }
   * @returns {promise-Object} - A promise object with entity details
   * @memberof GeneralService
   */
  async findByKey(model, keys) {
    try {
      return model.findOne({ where: keys });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  /**
   * find multiple by keys
   * @async
   * @param {object} model - database model
   * @param {object} keys - object containing query key and value
   * e.g { id: 5 }
   * @returns {promise-Object} - A promise object with entity details
   * @memberof GeneralService
   */
  async findMultipleByKey(model, keys) {
    try {
      return model.findAll({
        where: keys,
      });
    } catch (error) {
      throw new Error(error);
    }
  },

  /**
   * update entity in database by key value
   * @async
   * @param {object} model - database model
   * @param {object} updateData - data to update
   * @param {object} keys - query key to update
   * @returns {promise-object | error} A promise object with entity detail
   * @memberof GeneralService
   */
  async updateByKey(model, updateData, keys) {
    try {
      const x = await model.update(updateData, {
        returning: true,
        where: keys,
      });
      // if (!rowaffected) throw new ApiError(404, 'Not Found');
      return x;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  /**
   * delete entity in database by key value
   * @async
   * @param {object} model - database model
   * @param {object} keys - query key to delete
   * @returns {promise-object | error} A number showing how many rows were deleted
   * @memberof GeneralService
   */
  async deleteByKey(model, keys) {
    try {
      const numberOfRowsDeleted = await model.destroy({ where: keys });
      if (!numberOfRowsDeleted) throw new ApiError(404, 'Not Found');
      return true;
    } catch (error) {
      throw new Error(error);
    }
  },

  /**
   * get all entities in database (no keys)
   * @async
   * @param {object} model - database model
   * @returns {promise-object | error} A number showing how many rows were deleted
   * @memberof GeneralService
   */
  async allEntities(model) {
    try {
      const entities = await model.findAll({ where: {} });
      return entities;
    } catch (error) {
      throw new Error(error);
    }
  },

  /**
   * increment entity in database by key value
   * @async
   * @param {object} model - database model
   * @param {object} updateData - data to incrcement
   * @param {object} keys - query key to increment
   * @returns {promise-object | error} A promise object with entity detail
   * @memberof GeneralService
   */
  async incrementByKeys(model, updateData, keys) {
    try {
      const [[rowaffected]] = await model.increment(updateData, {
        returning: true,
        where: keys,
      });
      if (!rowaffected) throw new ApiError(404, 'Not Found');
      return rowaffected;
    } catch (error) {
      throw new Error(error);
    }
  },

  /**
   * decrement entity in database by key value
   * @async
   * @param {object} model - database model
   * @param {object} updateData - data to decrement
   * @param {object} keys - query key to decrement
   * @returns {promise-object | error} A promise object with entity detail
   * @memberof GeneralService
   */
  async decremnentByKeys(model, updateData, keys) {
    try {
      const [[rowaffected]] = await model.decrement(updateData, {
        returning: true,
        where: keys,
      });
      if (!rowaffected) throw new ApiError(404, 'Not Found');
      return rowaffected;
    } catch (error) {
      throw new Error(error);
    }
  },

  /**
   *returns the counts of a Table
   * @async
   * @param {object} model - database model
   * @param {object} keys - query key to decrement
   * @returns {promise-object | error} A promise object with entity detail
   * @memberof GeneralService
   */
  async rowCountByKey(model, keys) {
    try {
      const entities = await model.findAndCountAll({
        returning: true,
        where: keys,
      });
      if (!entities) throw new ApiError(404, 'Not Found');
      return entities;
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = GeneralService;
