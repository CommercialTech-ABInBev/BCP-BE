module.exports = (sequelize, DataTypes) => {
  const StockPrice = sequelize.define('StockPrice', {
    stockCode: DataTypes.STRING,
    brand: DataTypes.STRING,
    description: DataTypes.STRING,
    A: DataTypes.STRING,
    B: DataTypes.STRING,
    C: DataTypes.STRING,
    D: DataTypes.STRING,
    I: DataTypes.STRING,
    K: DataTypes.STRING,
    F: DataTypes.STRING,
    F1: DataTypes.STRING,
    F2: DataTypes.STRING,
    FA: DataTypes.STRING,
    FC: DataTypes.STRING,
    FL: DataTypes.STRING,
    F0: DataTypes.STRING,
    FA0: DataTypes.STRING,
    FA1: DataTypes.STRING,
    FA2: DataTypes.STRING,
    FC0: DataTypes.STRING,
    FC1: DataTypes.STRING,
    FC2: DataTypes.STRING,
    FL0: DataTypes.STRING,
    FL1: DataTypes.STRING,
    FL2: DataTypes.STRING,
  }, {});
  StockPrice.associate = function (models) {
    
  };
  return StockPrice;
};
