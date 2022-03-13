import { parse } from 'fast-csv';
import { createReadStream, unlink } from 'fs';

import database from '../models';
import { ToolBox } from '../utils';
import { GeneralService } from '../services';

const { allEntities } = GeneralService;
const { successResponse, errorResponse } = ToolBox;
const { Customer, CustomerAddress, Truck, Inventory, Balance, StockPrice } =
  database;

const addDataController = {
  /**
   * Admin bulk create eligible customers
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with customers details
   * @memberof const AddDataController
   */
  async createBulkCustomers(req, res) {
    try {
      if (req.file == undefined) {
        return res.status(400).send('Please upload a CSV file!');
      }

      let customers = [];

      let path = req.file.path;
      createReadStream(path)
        .pipe(parse({ headers: true }))
        .on('error', (error) => {
          throw error.message;
        })
        .on('data', (row) => {
          customers.push(row);
        })
        .on('end', () => {
          Customer.bulkCreate(customers)
            .then(() => {
              res.status(200).send({
                message:
                  'Uploaded the file successfully: ' + req.file.originalname,
              });
            })
            .then(
              unlink(path, (err) => {
                if (err) throw err;
              })
            )
            .catch((error) => {
              res.status(500).send({
                message: 'Fail to import data into database!',
                error: error.message,
              });
            });
        });
    } catch (error) {
      res.status(500).send({
        message: 'Could not upload the file: ' + req.file.originalname,
      });
    }
  },

  /**
   * Admin get all customers
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with customers in db
   * @memberof const AddDataController
   */
  async getAllEligibleCustomers(req, res) {
    try {
      const customers = await allEntities(Customer);
      return successResponse(res, { customers }, 200);
    } catch (error) {
      errorResponse(res, { error });
    }
  },

  /**
   * Admin reset customers DB
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with customers in db
   * @memberof const AddDataController
   */
  async resetCustomerDB(req, res) {
    try {
      await Customer.destroy({ truncate: true });
      return successResponse(
        res,
        { message: 'Customers Deleted Successfully' },
        200
      );
    } catch (error) {
      errorResponse(res, { error });
    }
  },

  /**
   * Admin bulk create eligible address
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with address details
   * @memberof const AddDataController
   */
  async createBulkAddress(req, res) {
    try {
      if (req.file == undefined) {
        return res.status(400).send('Please upload a CSV file!');
      }

      let address = [];

      let path = req.file.path;
      createReadStream(path)
        .pipe(parse({ headers: true }))
        .on('error', (error) => {
          throw error.message;
        })
        .on('data', (row) => {
          address.push(row);
        })
        .on('end', () => {
          CustomerAddress.bulkCreate(address)
            .then(() => {
              res.status(200).send({
                message:
                  'Uploaded the file successfully: ' + req.file.originalname,
              });
            })
            .then(
              unlink(path, (err) => {
                if (err) throw err;
              })
            )
            .catch((error) => {
              res.status(500).send({
                message: 'Fail to import data into database!',
                error: error.message,
              });
            });
        });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'Could not upload the file: ' + req.file.originalname,
      });
    }
  },

  /**
   * Admin get all customers
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with customers in db
   * @memberof const AddDataController
   */
  async getAllEligibleAddress(req, res) {
    try {
      const address = await allEntities(CustomerAddress);
      return successResponse(res, { address }, 200);
    } catch (error) {
      errorResponse(res, { error });
    }
  },

  /**
   * Admin reset customers DB
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with customers in db
   * @memberof const AddDataController
   */
  async resetAddressDB(req, res) {
    try {
      await CustomerAddress.destroy({ truncate: true });
      return successResponse(
        res,
        { message: 'address Deleted Successfully' },
        200
      );
    } catch (error) {
      errorResponse(res, { error });
    }
  },

  /**
   * Admin bulk create eligible truck
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with truck details
   * @memberof const AddDataController
   */
  async createBulkTruck(req, res) {
    try {
      if (req.file == undefined) {
        return res.status(400).send('Please upload a CSV file!');
      }

      let trucks = [];

      let path = req.file.path;
      createReadStream(path)
        .pipe(parse({ headers: true }))
        .on('error', (error) => {
          throw error.message;
        })
        .on('data', (row) => {
          trucks.push(row);
        })
        .on('end', () => {
          Truck.bulkCreate(trucks)
            .then(() => {
              res.status(200).send({
                message:
                  'Uploaded the file successfully: ' + req.file.originalname,
              });
            })
            .then(
              unlink(path, (err) => {
                if (err) throw err;
              })
            )
            .catch((error) => {
              res.status(500).send({
                message: 'Fail to import data into database!',
                error: error.message,
              });
            });
        });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'Could not upload the file: ' + req.file.originalname,
      });
    }
  },

  /**
   * Admin get all customers
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with customers in db
   * @memberof const AddDataController
   */
  async getAllEligibleTrucks(req, res) {
    try {
      const trucks = await allEntities(Truck);
      return successResponse(res, { trucks }, 200);
    } catch (error) {
      errorResponse(res, { error });
    }
  },

  /**
   * Admin reset customers DB
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with customers in db
   * @memberof const AddDataController
   */
  async resetTruckDB(req, res) {
    try {
      await Truck.destroy({ truncate: true });
      return successResponse(
        res,
        { message: 'trucks Deleted Successfully' },
        200
      );
    } catch (error) {
      errorResponse(res, { error });
    }
  },

  /**
   * Admin bulk create eligible inventories
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with truck details
   * @memberof const AddDataController
   */
  async createBulkInventories(req, res) {
    try {
      if (req.file == undefined) {
        return res.status(400).send('Please upload a CSV file!');
      }

      let inventories = [];
      console.log(inventories);
      let path = req.file.path;
      createReadStream(path)
        .pipe(parse({ headers: true }))
        .on('error', (error) => {
          throw error.message;
        })
        .on('data', (row) => {
          inventories.push(row);
        })
        .on('end', () => {
          Inventory.bulkCreate(inventories)
            .then(() => {
              res.status(200).send({
                message:
                  'Uploaded the file successfully: ' + req.file.originalname,
              });
            })
            .then(
              unlink(path, (err) => {
                if (err) throw err;
              })
            )
            .catch((error) => {
              res.status(500).send({
                message: 'Fail to import data into database!',
                error: error.message,
              });
            });
        });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'Could not upload the file: ' + req.file.originalname,
      });
    }
  },

  /**
   * Admin get all customers
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with customers in db
   * @memberof const AddDataController
   */
  async getAllEligibleInventories(req, res) {
    try {
      const inventories = await allEntities(Inventory);
      return successResponse(res, { inventories }, 200);
    } catch (error) {
      errorResponse(res, { error });
    }
  },

  /**
   * Admin reset customers DB
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with customers in db
   * @memberof const AddDataController
   */
  async resetInventoriesDB(req, res) {
    try {
      await Inventory.destroy({ truncate: true });
      return successResponse(
        res,
        { message: 'trucks Deleted Successfully' },
        200
      );
    } catch (error) {
      errorResponse(res, { error });
    }
  },

  /**
   * Admin bulk create eligible StockPrice
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with StockPrice details
   * @memberof const AddDataController
   */
  async createBulkStockPrice(req, res) {
    try {
      if (req.file == undefined) {
        return res.status(400).send('Please upload a CSV file!');
      }

      let stocks = [];
      console.log(stocks);
      let path = req.file.path;
      createReadStream(path)
        .pipe(parse({ headers: true }))
        .on('error', (error) => {
          throw error.message;
        })
        .on('data', (row) => {
          stocks.push(row);
        })
        .on('end', () => {
          StockPrice.bulkCreate(stocks)
            .then(() => {
              res.status(200).send({
                message:
                  'Uploaded the file successfully: ' + req.file.originalname,
              });
            })
            .then(
              unlink(path, (err) => {
                if (err) throw err;
              })
            )
            .catch((error) => {
              res.status(500).send({
                message: 'Fail to import data into database!',
                error: error.message,
              });
            });
        });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'Could not upload the file: ' + req.file.originalname,
      });
    }
  },

  /**
   * Admin get all StockPrice
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with StockPrice in db
   * @memberof const AddDataController
   */
  async getAllEligibleStockPrice(req, res) {
    try {
      const stocks = await allEntities(StockPrice);
      return successResponse(res, { stocks }, 200);
    } catch (error) {
      errorResponse(res, { error });
    }
  },

  /**
   * Admin reset StockPrice DB
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with StockPrice in db
   * @memberof const AddDataController
   */
  async resetStockPriceDB(req, res) {
    try {
      await StockPrice.destroy({ truncate: true });
      return successResponse(
        res,
        { message: 'trucks Deleted Successfully' },
        200
      );
    } catch (error) {
      errorResponse(res, { error });
    }
  },

  /**
   * Admin bulk create eligible Balance
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with truck details
   * @memberof const AddDataController
   */
  async createBulkBalance(req, res) {
    try {
      if (req.file == undefined) {
        return res.status(400).send('Please upload a CSV file!');
      }

      let balance = [];
      console.log(balance);
      let path = req.file.path;
      createReadStream(path)
        .pipe(parse({ headers: true }))
        .on('error', (error) => {
          throw error.message;
        })
        .on('data', (row) => {
          balance.push(row);
        })
        .on('end', () => {
          Balance.bulkCreate(balance)
            .then(() => {
              res.status(200).send({
                message:
                  'Uploaded the file successfully: ' + req.file.originalname,
              });
            })
            .then(
              unlink(path, (err) => {
                if (err) throw err;
              })
            )
            .catch((error) => {
              res.status(500).send({
                message: 'Fail to import data into database!',
                error: error.message,
              });
            });
        });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'Could not upload the file: ' + req.file.originalname,
      });
    }
  },

  /**
   * Admin get all Balance
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with customers in db
   * @memberof const AddDataController
   */
  async getAllEligibleBalance(req, res) {
    try {
      const balance = await allEntities(Balance);
      return successResponse(res, { balance }, 200);
    } catch (error) {
      errorResponse(res, { error });
    }
  },

  /**
   * Admin reset Balance DB
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with customers in db
   * @memberof const AddDataController
   */
  async resetBalanceDB(req, res) {
    try {
      await Balance.destroy({ truncate: true });
      return successResponse(
        res,
        { message: 'trucks Deleted Successfully' },
        200
      );
    } catch (error) {
      errorResponse(res, { error });
    }
  },
};

export default addDataController;
