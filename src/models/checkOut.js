'use strict';
export default (sequelize, DataTypes) => {
    const check_out = sequelize.define('CheckOuts', {
        title: sequelize.STRING,
        location: sequelize.STRING,
        stockType: sequelize.STRING,
        status: sequelize.STRING,
        brand: sequelize.STRING,
        quantity: sequelize.INTEGER,
        requestDate: sequelize.DATE,
    }, {
        timestamps: true,
        paranoid: true
    });
    check_out.associate = function(models) {
        // associations can be defined here
    };
    return check_out;
};