'use strict';

export function up(queryInterface, Sequelize) {
  return Promise.all([
    queryInterface.addColumn('Orders', 'truckSupplierName', {
      type: Sequelize.STRING,
      allowNull: true,
    }),
    queryInterface.addColumn('Orders', 'truckStatus', {
      type: Sequelize.STRING,
      allowNull: true,
    }),
    queryInterface.addColumn('Orders', 'truckDepot', {
      type: Sequelize.STRING,
      allowNull: true,
    }),
    queryInterface.addColumn('Orders', 'truckShipSize', {
      type: Sequelize.STRING,
      allowNull: true,
    }),
  ]);
}
export function down(queryInterface) {
  return queryInterface.dropTable('Orders');
}
