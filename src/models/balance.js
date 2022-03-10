module.exports = (sequelize, DataTypes) => {
  const Balance = sequelize.define('Balance', {
    customerId: DataTypes.STRING,
    creditLimit: DataTypes.STRING,
    area: DataTypes.STRING,
    customerName: DataTypes.STRING,
    currentBalance: DataTypes.STRING,
    valCurrentInv: DataTypes.STRING,
    val30daysInv: DataTypes.STRING,
    val60daysInv: DataTypes.STRING,
    val90daysInv: DataTypes.STRING,
    val120daysInv: DataTypes.STRING,
    termsCode: DataTypes.STRING,
    customerClass: DataTypes.STRING,
  }, {});
  Balance.associate = function (models) {
    Balance.belongsTo(models.Customer, {
      as: 'customer',
      foreignKey: 'customerId'
    })
  };
  return Balance;
};
