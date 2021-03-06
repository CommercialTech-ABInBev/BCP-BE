'use strict';
export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('Order_items', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    productCode: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    productName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cases: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    orderId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    total: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    pallets: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    volume: {
      type: Sequelize.DOUBLE,
      allowNull: true,
      defaultValue: 0,
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
  return queryInterface.dropTable('Order_items');
}
