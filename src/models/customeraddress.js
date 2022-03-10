module.exports = (sequelize, DataTypes) => {
  const CustomerAddress = sequelize.define('CustomerAddress', {
    customerId: DataTypes.STRING,
    name: DataTypes.STRING,
    contact: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    shipToAddr1: DataTypes.STRING,
    shipToAddr2: DataTypes.STRING,
    shipToAddr3: DataTypes.STRING,
    shipToAddr4: DataTypes.STRING,
    shipToAddr5: DataTypes.STRING
  }, {});
  CustomerAddress.associate = function (models) {
    CustomerAddress.belongsTo(models.Customer, {
      as: 'address',
      foreignKey: 'customerId',
    })
  }
  return CustomerAddress;
};
