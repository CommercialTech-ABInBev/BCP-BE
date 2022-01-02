'use strict';

export function up(queryInterface, Sequelize) {
    return queryInterface.createTable('CheckOuts', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        title: Sequelize.STRING,
        location: Sequelize.STRING,
        stockType: Sequelize.STRING,
        status: Sequelize.STRING,
        brand: Sequelize.STRING,
        quantity: Sequelize.INTEGER,
        requestDate: Sequelize.DATE,
        deletedAt: Sequelize.DATE,
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    });
}
export function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('CheckOuts');
}