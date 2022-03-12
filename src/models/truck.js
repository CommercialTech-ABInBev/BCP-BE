export default (sequelize, DataTypes) => {
  const Truck = sequelize.define(
    'Truck',
    {
      shipRegister: DataTypes.STRING,
      shipSize: DataTypes.STRING,
      shipOwner: DataTypes.STRING,
      supplierName: DataTypes.STRING,
      truckStatus: DataTypes.STRING,
      depot: DataTypes.STRING,
    },
    {}
  );
  Truck.associate = function (models) {};
  return Truck;
};
