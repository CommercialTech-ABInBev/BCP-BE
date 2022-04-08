'use strict';
export default (sequelize, DataTypes) => {
  const Reconcillation = sequelize.define(
    'Reconcillation',
    {
      account: DataTypes.STRING,
      stock: DataTypes.STRING,
      warehouse: DataTypes.STRING,
      customerId: DataTypes.STRING,
      productCode: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {}
  );
  Reconcillation.associate = function (models) {
    // associations can be defined here
  };
  return Reconcillation;
};
