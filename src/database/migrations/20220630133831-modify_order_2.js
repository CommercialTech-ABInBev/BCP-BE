'use strict';

export function up(queryInterface, Sequelize) {
  return Promise.all([
    queryInterface.addColumn('Orders', 'customerRegion', {
      type: Sequelize.STRING,
      allowNull: true,
    })
  ]);
}
export function down(queryInterface) {
  return Promise.all([
    queryInterface.removeColumn('Orders', 'customerRegion'),
  ]);
}