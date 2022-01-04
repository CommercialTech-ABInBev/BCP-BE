'use strict';
export default (sequelize, DataTypes) => {
  const check_out = sequelize.define(
    'CheckOuts',
    {
      title: DataTypes.STRING,
      location: DataTypes.STRING,
      stockType: DataTypes.STRING,
      status: DataTypes.STRING,
      brand: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      requestDate: DataTypes.DATE,
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  check_out.associate = function (models) {
    // associations can be defined here
  };
  return check_out;
};
