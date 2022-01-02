'use strict';
export default (sequelize, DataTypes) => {
    const User = sequelize.define('Users', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        inviteStatus: DataTypes.STRING,
        role: DataTypes.STRING,
    }, {
        timestamps: true,
        paranoid: true
    });
    User.associate = function(models) {
        // associations can be defined here
    };
    return User;
};