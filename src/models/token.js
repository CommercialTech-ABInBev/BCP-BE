'use strict';
export default (sequelize, DataTypes) => {
    const Token = sequelize.define('Tokens', {
        type: DataTypes.STRING,
        token: DataTypes.STRING,
        email: DataTypes.STRING,
    }, {
        timestamps: true,
    });
    Token.associate = function(models) {
        // associations can be defined here
    };
    return Token;
};