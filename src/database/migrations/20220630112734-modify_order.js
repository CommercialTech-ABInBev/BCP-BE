'use strict';

export function up(queryInterface, Sequelize) {
  return Promise.all([
    queryInterface.addColumn('Orders', 'customerPhoneNumber', {
      type: Sequelize.STRING,
      allowNull: true,
    }),
    queryInterface.addColumn('Orders', 'customerMasterCodeId', {
      type: Sequelize.STRING,
      allowNull: true,
    }),
  ]);
}
export function down(queryInterface) {
  return Promise.all([
    queryInterface.removeColumn('Orders', 'customerPhoneNumber'),
    queryInterface.removeColumn('Orders', 'customerMasterCodeId'),
  ]);
}