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
