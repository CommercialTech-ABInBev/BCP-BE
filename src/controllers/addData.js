const fs = require("fs");
const csv = require("fast-csv");
const database = require('../models');
const { ToolBox } = require('../utils');
const { GeneralService } = require('../services');
const { Customer, CustomerAddress } = database;
const { allEntities } = GeneralService;
const { successResponse, errorResponse } = ToolBox;

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
        return res.status(400).send("Please upload a CSV file!");
      }

      let customers = [];
      console.log(customers);
      let path = req.file.path
      fs.createReadStream(path)
        .pipe(csv.parse({ headers: true }))
        .on("error", (error) => {
          throw error.message;
        })
        .on("data", (row) => {
          customers.push(row);
        })
        .on("end", () => {
          Customer.bulkCreate(customers)
            .then(() => {
              res.status(200).send({
                message: "Uploaded the file successfully: " + req.file.originalname,
              });
            }).then(
              fs.unlink(path, (err) => {
                if (err) throw err
              })
            )
            .catch((error) => {
              res.status(500).send({
                message: "Fail to import data into database!",
                error: error.message,
              });
            });
        });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
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
      return successResponse(res, { customers }, 200)
    } catch (error) {
      errorResponse(res, { error })
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
      await Customer.destroy({ truncate: true })
      return successResponse(res, { message: 'Customers Deleted Successfully' }, 200)
    } catch (error) {
      errorResponse(res, { error })
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
        return res.status(400).send("Please upload a CSV file!");
      }

      let address = [];
      console.log(address);
      let path = req.file.path
      fs.createReadStream(path)
        .pipe(csv.parse({ headers: true }))
        .on("error", (error) => {
          throw error.message;
        })
        .on("data", (row) => {
          address.push(row);
        })
        .on("end", () => {
          CustomerAddress.bulkCreate(address)
            .then(() => {
              res.status(200).send({
                message: "Uploaded the file successfully: " + req.file.originalname,
              });
            }).then(
              fs.unlink(path, (err) => {
                if (err) throw err
              })
            )
            .catch((error) => {
              res.status(500).send({
                message: "Fail to import data into database!",
                error: error.message,
              });
            });
        });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
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
      return successResponse(res, { address }, 200)
    } catch (error) {
      errorResponse(res, { error })
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
      await CustomerAddress.destroy({ truncate: true })
      return successResponse(res, { message: 'address Deleted Successfully' }, 200)
    } catch (error) {
      errorResponse(res, { error })
    }
  },

}

module.exports = addDataController;
