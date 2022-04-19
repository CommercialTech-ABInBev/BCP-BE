'use strict';

export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    fullName: Sequelize.STRING,
    brand: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    location: Sequelize.STRING,
    inviteStatus: Sequelize.STRING,
    emailVerified: Sequelize.BOOLEAN,
    role: Sequelize.STRING,
    deletedAt: Sequelize.DATE,
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
  return queryInterface.dropTable('Users');
}
