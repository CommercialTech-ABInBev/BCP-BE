'use strict';
export default (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        salesOrderId: DataTypes.STRING,
        warehouseId: DataTypes.STRING,
        comment: DataTypes.STRING,
        deliveryDate: DataTypes.STRING,
        account: DataTypes.INTEGER,
        totalAmount: DataTypes.STRING,
        createdBy: DataTypes.STRING,
        status: DataTypes.STRING,
        vatAmount: DataTypes.INTEGER,
        subTotalAmount: DataTypes.INTEGER
    }, {});
    Order.associate = function(models) {
        // associations can be defined here
        Order.hasMany(models.Order_items, {
            as: 'orderItems'
        })
    };
    return Order;
};