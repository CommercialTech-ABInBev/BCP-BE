'use strict';
export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('StockPrices', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    stockCode: Sequelize.STRING,
    brand: Sequelize.STRING,
    description: Sequelize.STRING,
    A: Sequelize.STRING,
    B: Sequelize.STRING,
    C: Sequelize.STRING,
    D: Sequelize.STRING,
    I: Sequelize.STRING,
    K: Sequelize.STRING,
    F: Sequelize.STRING,
    F1: Sequelize.STRING,
    F2: Sequelize.STRING,
    FA: Sequelize.STRING,
    FC: Sequelize.STRING,
    FL: Sequelize.STRING,
    F0: Sequelize.STRING,
    FA0: Sequelize.STRING,
    FA1: Sequelize.STRING,
    FA2: Sequelize.STRING,
    FC0: Sequelize.STRING,
    FC1: Sequelize.STRING,
    FC2: Sequelize.STRING,
    FL0: Sequelize.STRING,
    FL1: Sequelize.STRING,
    FL2: Sequelize.STRING,
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
  return queryInterface.dropTable('StockPrices');
}
