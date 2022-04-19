'use strict';

export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('Stocks', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: Sequelize.STRING,
    location: Sequelize.STRING,
    status: Sequelize.STRING,
    prevQty: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    currQty: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    deletedAt: Sequelize.DATE,
    brand: Sequelize.STRING,
    stockType: Sequelize.STRING,
    supportDocFile: Sequelize.STRING,
    stockAdjustTo: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    stockAdjustFrom: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    stockAdjustStatus: Sequelize.STRING,
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
  return queryInterface.dropTable('Stocks');
}
