'use strict';
export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('Trucks', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    shipRegister: {
      type: Sequelize.STRING,
    },
    shipSize: {
      type: Sequelize.STRING,
    },
    shipOwner: {
      type: Sequelize.STRING,
    },
    truckStatus: {
      type: Sequelize.STRING,
    },
    supplierName: {
      type: Sequelize.STRING,
    },
    depot: {
      type: Sequelize.STRING,
    },
    site: {
      type: Sequelize.STRING,
    },
    isAvailable: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
  return queryInterface.dropTable('Trucks');
}
