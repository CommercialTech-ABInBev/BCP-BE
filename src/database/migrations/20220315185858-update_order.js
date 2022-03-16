'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Orders', // table name
        'truckId', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
      queryInterface.addColumn('Orders', 'loadId', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('Orders', 'invoiceId', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('Orders', 'picked', {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      }),
      queryInterface.addColumn('Orders', 'shipTo', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('Orders', 'truckOwner', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Orders', 'truckId'),
      queryInterface.removeColumn('Orders', 'loadId'),
      queryInterface.removeColumn('Orders', 'invoiceId'),
      queryInterface.removeColumn('Orders', 'picked'),
      queryInterface.removeColumn('Orders', 'invoiceStatus'),
      queryInterface.removeColumn('Orders', 'truckOwner'),
    ]);
  },
};
