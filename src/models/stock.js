'use strict';
export default (sequelize, DataTypes) => {
    const Stock = sequelize.define(
        'Stocks', {
            title: DataTypes.STRING,
            location: DataTypes.STRING,
            stockType: DataTypes.STRING,
            supportDocFile: DataTypes.STRING,
            status: DataTypes.STRING,
            brand: DataTypes.STRING,
            prevQty: DataTypes.INTEGER,
            currQty: DataTypes.INTEGER,
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