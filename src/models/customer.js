export default (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    'Customer',
    {
      customerId: DataTypes.STRING,
      masterCodeId: DataTypes.STRING,
      accountType: DataTypes.STRING,
      customerName: DataTypes.STRING,
      lat: DataTypes.STRING,
      long: DataTypes.STRING,
      lga: DataTypes.STRING,
      state: DataTypes.STRING,
      district: DataTypes.STRING,
      region: DataTypes.STRING,
      hos: DataTypes.STRING,
      dm: DataTypes.STRING,
      dd: DataTypes.STRING,
      cicAgent: DataTypes.STRING,
      stages: DataTypes.STRING,
      priceCode: DataTypes.STRING,
      creditBucket: DataTypes.STRING,
      currentBalance: DataTypes.STRING,
      currentValueInvoice: DataTypes.STRING,
      noPurchaseReason: DataTypes.STRING,
      buyerSegment: DataTypes.STRING,
      contact: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      shipToAddr1: DataTypes.STRING,
      shipToAddr2: DataTypes.STRING,
      shipToAddr3: DataTypes.STRING,
      shipToAddr4: DataTypes.STRING,
      shipToAddr5: DataTypes.STRING,
      creditLimit: DataTypes.STRING,
      area: DataTypes.STRING,
      valCurrentInv: DataTypes.STRING,
      val30daysInv: DataTypes.STRING,
      val60daysInv: DataTypes.STRING,
      val90daysInv: DataTypes.STRING,
      val120daysInv: DataTypes.STRING,
      termsCode: DataTypes.STRING,
      customerClass: DataTypes.STRING,
    },
    {}
  );
  Customer.associate = function (models) {
    Customer.hasOne(models.CustomerAddress, {
      as: 'address',
      foreignKey: 'customerId',
    });
    Customer.hasOne(models.Balance, {
      as: 'creditDetails',
      foreignKey: 'customerId',
    });
    Customer.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'customerId',
    });
  };
  return Customer;
};
