'use strict';

export function up(queryInterface, Sequelize) {
  return Promise.all([
    queryInterface.addColumn('Reconcillations', 'customerId', {
      type: Sequelize.STRING,
      allowNull: true,
    }),
    queryInterface.addColumn('Reconcillations', 'productCode', {
      type: Sequelize.STRING,
      allowNull: true,
    }),
  ]);
}
export function down(queryInterface) {
  return Promise.all([
    queryInterface.removeColumn('Reconcillations', 'customerId'),
    queryInterface.removeColumn('Reconcillations', 'productCode'),
  ]);
}
