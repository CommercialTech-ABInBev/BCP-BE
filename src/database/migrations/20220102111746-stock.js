'use strict';

export function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Stocks', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        title: Sequelize.STRING,
        location: Sequelize.STRING,
        stockType: Sequelize.STRING,
        supportDocFile: Sequelize.STRING,
        status: Sequelize.STRING,
        brand: Sequelize.STRING,
        prevQty: Sequelize.INTEGER,
        currQty: Sequelize.INTEGER,
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
    return queryInterface.dropTable('Stocks');
}