'use strict';
export default (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      comment: DataTypes.STRING,
      account: DataTypes.INTEGER,
      status: DataTypes.STRING,
      loadId: DataTypes.STRING,
      shipTo: DataTypes.STRING,
      truckId: DataTypes.STRING,
      picked: DataTypes.BOOLEAN,
      createdBy: DataTypes.STRING,
      invoiceId: DataTypes.STRING,
      customerId: DataTypes.STRING,
      truckOwner: DataTypes.STRING,
      truckDepot: DataTypes.STRING,
      vatAmount: DataTypes.INTEGER,
      totalAmount: DataTypes.STRING,
      warehouseId: DataTypes.STRING,
      truckStatus: DataTypes.STRING,
      deliveryDate: DataTypes.STRING,
      salesOrderId: DataTypes.STRING,
      truckShipSize: DataTypes.STRING,
      customerRegion: DataTypes.STRING,
      subTotalAmount: DataTypes.INTEGER,
      truckSupplierName: DataTypes.STRING,
      customerPhoneNumber: DataTypes.STRING,
      customerMasterCodeId: DataTypes.STRING,
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
