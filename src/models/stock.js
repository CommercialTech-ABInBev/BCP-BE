'use strict';
export default (sequelize, DataTypes) => {
    const Stock = sequelize.define('Stocks', {
        title: sequelize.STRING,
        location: sequelize.STRING,
        stockType: sequelize.STRING,
        supportDocFile: sequelize.STRING,
        brand: sequelize.STRING,
        prevQty: sequelize.INTEGER,
        currQty: sequelize.INTEGER,
    }, {
        timestamps: true,
        paranoid: true
    });
    Stock.associate = function(models) {
        // associations can be defined here
    };
    return Stock;
};