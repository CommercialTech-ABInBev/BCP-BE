'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CustomerAddresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customerId: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      contact: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      shipToAddr1: {
        type: Sequelize.STRING,
      },
      shipToAddr2: {
        type: Sequelize.STRING,
      },
      shipToAddr3: {
        type: Sequelize.STRING,
      },
      shipToAddr4: {
        type: Sequelize.STRING,
      },
      shipToAddr5: {
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
    return queryInterface.dropTable('CustomerAddresses');
  },
};
