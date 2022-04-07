'use strict';
export function up(queryInterface, Sequelize) {
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
      type: Sequelize.DOUBLE,
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
    creditLimit: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    area: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    valCurrentInv: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    val30daysInv: {
      type: Sequelize.STRING,
    },
    val60daysInv: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    val90daysInv: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    val120daysInv: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    termsCode: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    customerClass: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    contact: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    shipToAddr1: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    shipToAddr2: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    shipToAddr3: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    shipToAddr4: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    shipToAddr5: {
      type: Sequelize.STRING,
      allowNull: true,
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
}
export function down(queryInterface, Sequelize) {
  return queryInterface.dropTable('Customers');
}
