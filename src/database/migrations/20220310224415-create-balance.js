'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Balances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customerId: Sequelize.STRING,
      creditLimit: Sequelize.STRING,
      area: Sequelize.STRING,
      customerName: Sequelize.STRING,
      currentBalance: Sequelize.STRING,
      valCurrentInv: Sequelize.STRING,
      val30daysInv: Sequelize.STRING,
      val60daysInv: Sequelize.STRING,
      val90daysInv: Sequelize.STRING,
      val120daysInv: Sequelize.STRING,
      termsCode: Sequelize.STRING,
      customerClass: Sequelize.STRING,
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
    return queryInterface.dropTable('Balances');
  },
};
