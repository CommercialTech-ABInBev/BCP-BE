'use strict';
export default (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      salesOrderId: DataTypes.STRING,
      warehouseId: DataTypes.STRING,
      customerId: DataTypes.STRING,
      comment: DataTypes.STRING,
      deliveryDate: DataTypes.STRING,
      account: DataTypes.INTEGER,
      totalAmount: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      status: DataTypes.STRING,
      vatAmount: DataTypes.INTEGER,
      subTotalAmount: DataTypes.INTEGER,
      truckId: DataTypes.STRING,
      loadId: DataTypes.STRING,
      invoiceId: DataTypes.STRING,
      picked: DataTypes.BOOLEAN,
      shipTo: DataTypes.STRING,
      truckOwner: DataTypes.STRING,
      truckSupplierName: DataTypes.STRING,
      truckStatus: DataTypes.STRING,
      truckDepot: DataTypes.STRING,
      truckShipSize: DataTypes.STRING,
    },
    {}
  );
  Order.associate = function (models) {
    // associations can be defined here
    Order.hasMany(models.Order_items, {
      as: 'orderItems',
    });
    Order.belongsTo(models.Customer, {
      as: 'customer',
      foreignKey: 'customerId',
    });
  };
  return Order;
};
