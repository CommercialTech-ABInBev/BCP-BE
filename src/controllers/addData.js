import { parse } from 'fast-csv';
import { createReadStream, unlink } from 'fs';

import database from '../models';
import { ToolBox } from '../utils';
import paginate from '../utils/paginate';
import { GeneralService, CustomerService } from '../services';
const customerService = new CustomerService();
const { getOrdersByCustomerId, searchCustomer } = customerService;
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
      const { limit, offset } = paginate(req.query);
      const { count, rows } = await Customer.findAndCountAll({
        limit,
        offset,
        distinct: true,
      });
      return successResponse(res, { TotalCount: count, customers: rows }, 200);
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
  async joinBulkAddress(req, res) {
    try {
      if (req.file == undefined) {
        return res.status(400).send('Please upload a CSV file!');
      }

      let addresses = [];

      let path = req.file.path;
      createReadStream(path)
        .pipe(parse({ headers: true }))
        .on('error', (error) => {
          throw error.message;
        })
        .on('data', (row) => {
          addresses.push(row);
        })
        .on('end', () => {
          allEntities(Customer)
          .then((customers) => {
            const updatedCustomers = customers.map((customer) => {
              const addressInfo = addresses.find(
                (address) => address.customerId === customer.dataValues.customerId
              );

              let result;
              if (addressInfo !== undefined) {
                result = {
                  ...customer.dataValues,
                  ...addressInfo,
                }
              }

              return result;
            });

            Customer.bulkCreate(updatedCustomers, { updateOnDuplicate: ['contact', 'phoneNumber', 'shipToAddr1', 'shipToAddr2', 'shipToAddr3', 'shipToAddr4', 'shipToAddr5' ] })
            .then((data) => {
              res.status(200).json({
                message: 'Uploaded the file successfully: ' + req.file.originalname,
                data,
              });
            })
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
      const { limit, offset } = paginate(req.query);
      const { count, rows } = await CustomerAddress.findAndCountAll({
        limit,
        offset,
        distinct: true,
      });
      return successResponse(res, { TotalCount: count, address: rows }, 200);
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
      const { limit, offset } = paginate(req.query);
      const { count, rows } = await Truck.findAndCountAll({
        limit,
        offset,
      });
      return successResponse(res, { TotalCount: count, trucks: rows }, 200);
    } catch (error) {
      errorResponse(res, { error });
    }
  },

  async getruckByDepot(req, res) {
    try {
      const data = await Truck.findAll({ where: { depot: req.query.depot } });
      return successResponse(res, data, 200);
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
      const { limit, offset } = paginate(req.query);

      const { count, rows } = await Inventory.findAndCountAll({
        limit,
        offset,
      });
      return successResponse(
        res,
        { TotalCount: count, Inventories: rows },
        200
      );
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

      let balances = [];

      let path = req.file.path;
      createReadStream(path)
        .pipe(parse({ headers: true }))
        .on('error', (error) => {
          throw error.message;
        })
        .on('data', (row) => {
          balances.push(row);
        })
        .on('end', () => {
          allEntities(Customer)
            .then((customers) => {
              const updatedCustomers = customers.map((customer) => {
                const balanceInfo = balances.find(
                  (balance) => balance.customerId === customer.dataValues.customerId
                );

                let result;
                if (balanceInfo !== undefined) {
                  result = {
                    ...customer.dataValues,
                    ...balanceInfo,
                    currentLimit: balanceInfo.currentLimit,
                    currentBalance: balanceInfo.currentBalance,
                  }
                }

                return result;
              });

              Customer.bulkCreate(updatedCustomers, { updateOnDuplicate: ['currentBalance', 'creditLimit', 'area', 'valCurrentInv', 'val30daysInv', 'val60daysInv', 'val90daysInv', 'val120daysInv', 'termsCode', 'customerClass'] })
                .then((data) => {
                  res.status(200).json({
                    message: 'Uploaded the file successfully: ' + req.file.originalname,
                    data,
                  });
                })
            })
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

  /**
   * Admin get single customers
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with customers in db
   * @memberof const AddDataController
   */
  async getSingleCustomer(req, res) {
    try {
      if (!req.query.customerId)
        return errorResponse(res, { message: 'customerId is required' });

      const customer = await getOrdersByCustomerId({
        customerId: req.query.customerId,
      });

      return successResponse(res, { customer }, 200);
    } catch (error) {
      errorResponse(res, { error });
    }
  },

  /**
   * Admin get single customers
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with customers in db
   * @memberof const AddDataController
   */
  async searchForCustomer(req, res) {
    try {
      if (!req.query.search)
        return errorResponse(res, { message: 'search name is required' });

      const customer = await searchCustomer(req.query.search);

      return successResponse(res, customer, 200);
    } catch (error) {
      errorResponse(res, { error });
    }
  },

  async getTruckByParams(req, res) {
    try {
      let whereStatement = {};
      if (req.query.id) whereStatement.id = req.query.id;
      if (req.query.depot) whereStatement.depot = req.query.depot;
      if (req.query.shipSize) whereStatement.shipSize = req.query.shipSize;

      const data = await Truck.findAll({
        where: whereStatement,
        limit: 10,
      });

      return successResponse(res, data, 200);
    } catch (error) {
      errorResponse(res, { error });
    }
  },
};

export default addDataController;
