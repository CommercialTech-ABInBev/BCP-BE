'use strict';

export function up(queryInterface, Sequelize) {
    return queryInterface.createTable('CheckOuts', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        title: Sequelize.STRING,
        brand: Sequelize.STRING,
        status: Sequelize.STRING,
        comment: Sequelize.STRING,
        location: Sequelize.STRING,
        stockId: Sequelize.INTEGER,
        stockType: Sequelize.STRING,
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        requestDate: Sequelize.DATE,
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
    return queryInterface.dropTable('CheckOuts');
}