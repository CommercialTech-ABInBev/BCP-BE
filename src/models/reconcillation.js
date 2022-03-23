'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reconcillation = sequelize.define('Reconcillation', {
    account: DataTypes.STRING,
    stock: DataTypes.STRING,
    warehouse: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  Reconcillation.associate = function(models) {
    // associations can be defined here
  };
  return Reconcillation;
};