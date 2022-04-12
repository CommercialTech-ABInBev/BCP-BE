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
                  (address) =>
                    address.customerId === customer.dataValues.customerId
                );

                let result;
                if (addressInfo !== undefined) {
                  result = {
                    id: customer.dataValues.id,
                    customerId: customer.dataValues.customerId,
                    masterCodeId: customer.dataValues.masterCodeId,
                    accountType: customer.dataValues.accountType,
                    customerName: customer.dataValues.customerName,
                    lat: customer.dataValues.lat,
                    long: customer.dataValues.long,
                    lga: customer.dataValues.lga,
                    state: customer.dataValues.state,
                    district: customer.dataValues.district,
                    region: customer.dataValues.region,
                    hos: customer.dataValues.hos,
                    dm: customer.dataValues.dm,
                    dd: customer.dataValues.dd,
                    cicAgent: customer.dataValues.cicAgent,
                    stages: customer.dataValues.stages,
                    priceCode: customer.dataValues.priceCode,
                    creditBucket: customer.dataValues.creditBucket,
                    currentValueInvoice:
                      customer.dataValues.currentValueInvoice,
                    noPurchaseReason: customer.dataValues.noPurchaseReason,
                    buyerSegment: customer.dataValues.buyerSegment,
                    contact: addressInfo.contact,
                    phoneNumber: addressInfo.phoneNumber,
                    shipToAddr1: addressInfo.shipToAddr1,
                    shipToAddr2: addressInfo.shipToAddr2,
                    shipToAddr3: addressInfo.shipToAddr3,
                    shipToAddr4: addressInfo.shipToAddr4,
                    shipToAddr5: addressInfo.shipToAddr5,
                    creditLimit: customer.dataValues.creditLimit,
                    currentBalance: customer.dataValues.currentBalance,
                    area: customer.dataValues.area,
                    valCurrentInv: customer.dataValues.valCurrentInv,
                    val30daysInv: customer.dataValues.val30daysInv,
                    val60daysInv: customer.dataValues.val60daysInv,
                    val90daysInv: customer.dataValues.val90daysInv,
                    val120daysInv: customer.dataValues.val120daysInv,
                    termsCode: customer.dataValues.termsCode,
                    customerClass: customer.dataValues.customerClass,
                  };
                }

                return result;
              });

              Customer.bulkCreate(updatedCustomers, {
                updateOnDuplicate: [
                  'contact',
                  'phoneNumber',
                  'shipToAddr1',
                  'shipToAddr2',
                  'shipToAddr3',
                  'shipToAddr4',
                  'shipToAddr5',
                ],
              }).then((data) => {
                res.status(200).json({
                  message:
                    'Uploaded the file successfully: ' + req.file.originalname,
                  data,
                });
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
   * Admin bulk create eligible address
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with address details
   * @memberof const AddDataController
   */
  async createBulkEmpties(req, res) {
    try {
      if (req.file == undefined) {
        return res.status(400).send('Please upload a CSV file!');
      }

      let empties = [];

      let path = req.file.path;
      createReadStream(path)
        .pipe(parse({ headers: true }))
        .on('error', (error) => {
          throw error.message;
        })
        .on('data', (row) => {
          empties.push(row);
        })
        .on('end', () => {
          allEntities(Inventory)
            .then((inventories) => {
              const updatedInventory = inventories.map((inventory) => {
                const inventoryInfo = empties.find(
                  (empty) =>
                    empty.drinkStockCode === inventory.dataValues.stockCode
                );

                let result;
                if (inventoryInfo !== undefined) {
                  result = {
                    id: inventory.dataValues.id,
                    warehouse: inventory.dataValues.warehouse,
                    site: inventory.dataValues.site,
                    brand: inventory.dataValues.brand,
                    class: inventory.dataValues.class,
                    packageType: inventory.dataValues.packageType,
                    size: inventory.dataValues.size,
                    stockCode: inventory.dataValues.stockCode,
                    description: inventory.dataValues.description,
                    onHandCs: inventory.dataValues.onHandCs,
                    onHandHls: inventory.dataValues.onHandHls,
                    inventoryCostLC: inventory.dataValues.inventoryCostLC,
                    allocatedCs: inventory.dataValues.allocatedCs,
                    allocatedHls: inventory.dataValues.allocatedHls,
                    inTransitCs: inventory.dataValues.inTransitCs,
                    inTransitHls: inventory.dataValues.inTransitHls,
                    freeStockCs: inventory.dataValues.freeStockCs,
                    freeStockHls: inventory.dataValues.freeStockHls,
                    dateLastStockMove: inventory.dataValues.dateLastStockMove,
                    isEmpty: true,
                    drinkStockCode: inventoryInfo.drinkStockCode,
                    drinkDesc: inventoryInfo.drinkDesc,
                    type: inventoryInfo.type,
                    emptyStockCode: inventoryInfo.emptyStockCode,
                    emptyDesc: inventoryInfo.emptyDesc,
                    emptyPrices: inventoryInfo.emptyPrices,
                  };
                } else
                  result = {
                    ...inventory.dataValues,
                  };

                return result;
              });

              Inventory.bulkCreate(updatedInventory, {
                updateOnDuplicate: [
                  'drinkStockCode',
                  'drinkDesc',
                  'type',
                  'emptyStockCode',
                  'emptyDesc',
                  'emptyPrices',
                ],
              }).then((data) => {
                res.status(200).json({
                  message:
                    'Uploaded the file successfully: ' + req.file.originalname,
                  data,
                });
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
      console.error(error);
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
              balances = balances.filter(x => x != null);
              let result = [];
              customers.forEach((customer) => {
                const balanceInfo = balances.find(
                  (balance) =>
                    balance.customer === customer.dataValues.customerId
                );

                if (balanceInfo !== undefined && balanceInfo !== null) {
                  result.push({
                    id: customer.dataValues.id,
                    customerId: customer.dataValues.customerId,
                    masterCodeId: customer.dataValues.masterCodeId,
                    accountType: customer.dataValues.accountType,
                    customerName: customer.dataValues.customerName,
                    lat: customer.dataValues.lat,
                    long: customer.dataValues.long,
                    lga: customer.dataValues.lga,
                    state: customer.dataValues.state,
                    district: customer.dataValues.district,
                    region: customer.dataValues.region,
                    hos: customer.dataValues.hos,
                    dm: customer.dataValues.dm,
                    dd: customer.dataValues.dd,
                    cicAgent: customer.dataValues.cicAgent,
                    stages: customer.dataValues.stages,
                    priceCode: customer.dataValues.priceCode,
                    creditBucket: customer.dataValues.creditBucket,
                    currentValueInvoice:
                      customer.dataValues.currentValueInvoice,
                    noPurchaseReason: customer.dataValues.noPurchaseReason,
                    buyerSegment: customer.dataValues.buyerSegment,
                    creditLimit: balanceInfo.creditLimit,
                    currentBalance: balanceInfo.currentBalance,
                    area: balanceInfo.area,
                    valCurrentInv: balanceInfo.valCurrentInv,
                    val30daysInv: balanceInfo.val30daysInv,
                    val60daysInv: balanceInfo.val60daysInv,
                    val90daysInv: balanceInfo.val90daysInv,
                    val120daysInv: balanceInfo.val120daysInv,
                    termsCode: balanceInfo.termsCode,
                    customerClass: balanceInfo.customerClass,
                    contact: customer.dataValues.contact,
                    phoneNumber: customer.dataValues.phoneNumber,
                    shipToAddr1: customer.dataValues.shipToAddr1,
                    shipToAddr2: customer.dataValues.shipToAddr2,
                    shipToAddr3: customer.dataValues.shipToAddr3,
                    shipToAddr4: customer.dataValues.shipToAddr4,
                    shipToAddr5: customer.dataValues.shipToAddr5,
                  });
                } 
                return result;
              });

              Customer.bulkCreate(result, {
                updateOnDuplicate: [
                  'currentBalance',
                  'creditLimit',
                  'area',
                  'valCurrentInv',
                  'val30daysInv',
                  'val60daysInv',
                  'val90daysInv',
                  'val120daysInv',
                  'termsCode',
                  'customerClass',
                ],
              }).then((data) => {
                res.status(200).json({
                  message:
                    'Uploaded the file successfully: ' + req.file.originalname,
                    data: { 
                      data,
                      count: data.length,
                    },
                });
              });
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
      const { limit, offset } = paginate(req.query);
      const { id, depot, shipSize, isAvailable } = req.query;

      let whereStatement = {};
      if (id) whereStatement.id = id;
      if (depot) whereStatement.depot = depot;
      if (shipSize) whereStatement.shipSize = shipSize;
      if (isAvailable) whereStatement.isAvailable = isAvailable === 'true';

      const { count, rows } = await Truck.findAndCountAll({
        where: whereStatement,
        limit,
        offset,
        distinct: true,
      });

      return successResponse(res, { TotalCount: count, Trucks: rows }, 200);
    } catch (error) {
      errorResponse(res, { error });
    }
  },
};

export default addDataController;
