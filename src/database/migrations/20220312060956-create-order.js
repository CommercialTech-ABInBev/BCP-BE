'use strict';
export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('Orders', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    warehouseId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    salesOrderId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    customerId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    comment: {
      type: Sequelize.STRING,
    },
    deliveryDate: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    account: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    totalAmount: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdBy: {
      type: Sequelize.STRING,
    },
    loadId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    truckId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    invoiceId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    picked: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    invoiceId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    shipTo: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    truckOwner: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    vatAmount: {
      type: Sequelize.STRING,
    },
    subTotalAmount: {
      type: Sequelize.STRING,
    },
    truckSupplierName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    truckStatus: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    truckDepot: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    truckShipSize: {
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
  return queryInterface.dropTable('Orders');
}
