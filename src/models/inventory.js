module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define(
    'Inventory',
    {
      warehouse: DataTypes.STRING,
      site: DataTypes.STRING,
      brand: DataTypes.STRING,
      class: DataTypes.STRING,
      packageType: DataTypes.STRING,
      size: DataTypes.STRING,
      stockCode: DataTypes.STRING,
      description: DataTypes.STRING,
      onHandCs: DataTypes.STRING,
      onHandHls: DataTypes.STRING,
      inventoryCostLC: DataTypes.STRING,
      allocatedCs: DataTypes.STRING,
      allocatedHls: DataTypes.STRING,
      inTransitCs: DataTypes.STRING,
      inTransitHls: DataTypes.STRING,
      freeStockCs: DataTypes.STRING,
      freeStockHls: DataTypes.STRING,
      dateLastStockMove: DataTypes.STRING,
      isEmpty: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      drinkStockCode:
      {
        type: DataTypes.STRING,
        allowNull: true,
      },
      drinkDesc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      emptyStockCode:
      {
        type: DataTypes.STRING,
        allowNull: true,
      },
      emptyDesc:
      {
        type: DataTypes.STRING,
        allowNull: true,
      },
      emptyPrices:
      {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {}
  );
  Inventory.associate = function (models) { };
  return Inventory;
};
