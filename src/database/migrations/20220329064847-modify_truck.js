'use strict';

export function up(queryInterface, Sequelize) {
  return Promise.all([
    queryInterface.addColumn('Trucks', 'isAvailable', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }),
  ]);
}
export function down(queryInterface) {
  return queryInterface.dropTable('Trucks');
}
