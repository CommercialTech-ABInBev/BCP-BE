'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customerId: {
        type: Sequelize.STRING,
      },
      masterCodeId: {
        type: Sequelize.STRING,
      },
      accountType: {
        type: Sequelize.STRING,
      },
      district: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      lga: {
        type: Sequelize.STRING,
      },
      long: {
        type: Sequelize.STRING,
      },
      lat: {
        type: Sequelize.STRING,
      },
      customerName: {
        type: Sequelize.STRING,
      },
      region: {
        type: Sequelize.STRING,
      },
      hos: {
        type: Sequelize.STRING,
      },
      dm: {
        type: Sequelize.STRING,
      },
      dd: {
        type: Sequelize.STRING,
      },
      cicAgent: {
        type: Sequelize.STRING,
      },
      stages: {
        type: Sequelize.STRING,
      },
      priceCode: {
        type: Sequelize.STRING,
      },
      creditBucket: {
        type: Sequelize.STRING,
      },
      currentBalance: {
        type: Sequelize.STRING,
      },
      currentValueInvoice: {
        type: Sequelize.STRING,
      },
      noPurchaseReason: {
        type: Sequelize.STRING,
      },
      buyerSegment: {
        type: Sequelize.STRING,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Customers');
  },
};
