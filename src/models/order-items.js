'use strict';

import { string } from 'joi';

export default (sequelize, DataTypes) => {
  const Order_items = sequelize.define(
    'Order_items',
    {
      productCode: DataTypes.STRING,
      productName: DataTypes.STRING,
      orderId: DataTypes.INTEGER,
      cases: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      pallets: DataTypes.INTEGER,
    },
    {}
  );
  Order_items.associate = function (models) {
    // associations can be defined here
    Order_items.belongsTo(models.Order, {
      foreignKey: 'orderId',
      as: 'order',
    });
  };
  return Order_items;
};
