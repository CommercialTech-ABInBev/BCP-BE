'use strict';

export function up(queryInterface, Sequelize) {
    return Promise.all([
        queryInterface.addColumn('Orders', 'truckSupplierName', {
            type: Sequelize.STRING,
            allowNull: true,
        }),
        queryInterface.addColumn('Orders', 'truckStatus', {
            type: Sequelize.STRING,
            allowNull: true,
        }),
        queryInterface.addColumn('Orders', 'truckDepot', {
            type: Sequelize.STRING,
            allowNull: true,
        }),
        queryInterface.addColumn('Orders', 'truckShipSize', {
            type: Sequelize.STRING,
            allowNull: true,
        }),
        queryInterface.addColumn('Order_items', 'volume', {
            type: Sequelize.DOUBLE,
            allowNull: true,
            defaultValue: 0
        }),
    ]);
}
export function down(queryInterface) {
    return Promise.all([
        queryInterface.removeColumn('Orders', 'truckSupplierName'),
        queryInterface.removeColumn('Orders', 'truckStatus'),
        queryInterface.removeColumn('Orders', 'truckDepot'),
        queryInterface.removeColumn('Orders', 'truckShipSize'),
        queryInterface.removeColumn('Order_items', 'volume'),
    ])

}