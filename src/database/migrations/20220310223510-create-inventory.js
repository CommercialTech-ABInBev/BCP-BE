'use strict';
export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('Inventories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    warehouse: Sequelize.STRING,
    site: Sequelize.STRING,
    brand: Sequelize.STRING,
    class: Sequelize.STRING,
    packageType: Sequelize.STRING,
    size: Sequelize.STRING,
    stockCode: Sequelize.STRING,
    description: Sequelize.STRING,
    onHandCs: Sequelize.DOUBLE,
    onHandHls: Sequelize.DOUBLE,
    inventoryCostLC: Sequelize.DOUBLE,
    allocatedCs: Sequelize.DOUBLE,
    allocatedHls: Sequelize.DOUBLE,
    inTransitCs: Sequelize.DOUBLE,
    inTransitHls: Sequelize.DOUBLE,
    freeStockCs: Sequelize.DOUBLE,
    freeStockHls: Sequelize.DOUBLE,
    dateLastStockMove: Sequelize.STRING,
    isEmpty: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    drinkStockCode: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    drinkDesc: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    emptyStockCode: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    emptyDesc: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    emptyPrices: {
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
  return queryInterface.dropTable('Inventories');
}
