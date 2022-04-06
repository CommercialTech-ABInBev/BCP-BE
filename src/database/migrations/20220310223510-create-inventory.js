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
    onHandCs: Sequelize.STRING,
    onHandHls: Sequelize.STRING,
    inventoryCostLC: Sequelize.STRING,
    allocatedCs: Sequelize.STRING,
    allocatedHls: Sequelize.STRING,
    inTransitCs: Sequelize.STRING,
    inTransitHls: Sequelize.STRING,
    freeStockCs: Sequelize.STRING,
    freeStockHls: Sequelize.STRING,
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
