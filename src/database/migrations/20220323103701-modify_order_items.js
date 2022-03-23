'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn(
                'Order_items', // table name
                'pallets', // new field name
                {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                }
            )
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('Order_items', 'pallets'),

        ]);
    },
};