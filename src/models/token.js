'use strict';
export default (sequelize, DataTypes) => {
    const Token = sequelize.define('Tokens', {
        type: sequelize.STRING,
        token: sequelize.STRING,
        email: sequelize.STRING,
    }, {
        timestamps: true,
    });
    Token.associate = function(models) {
        // associations can be defined here
    };
    return Token;
};