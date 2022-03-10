module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
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
  }, {});
  Customer.associate = function (models) {
    Customer.hasOne(models.CustomerAddress, {
      as: 'customer',
      foreignKey: 'customerId'
    })
  };
  return Customer;
};
