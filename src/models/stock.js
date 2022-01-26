'use strict';
export default (sequelize, DataTypes) => {
    const Stock = sequelize.define(
        'Stocks', {
            brand: DataTypes.STRING,
            title: DataTypes.STRING,
            status: DataTypes.STRING,
            currQty: DataTypes.INTEGER,
            location: DataTypes.STRING,
            prevQty: DataTypes.INTEGER,
            stockType: DataTypes.STRING,
            supportDocFile: DataTypes.STRING,
            stockAdjustTo: DataTypes.INTEGER,
            stockAdjustFrom: DataTypes.INTEGER,
            stockAdjustStatus: DataTypes.STRING,
        }, {
            timestamps: true,
            paranoid: true,
        }
    );
    Stock.associate = function(models) {
        // associations can be defined here
    };
    return Stock;
};