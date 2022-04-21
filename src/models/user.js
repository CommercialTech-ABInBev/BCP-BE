'use strict';
export default (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User', {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            role: DataTypes.STRING,
            password: DataTypes.STRING,
            location: DataTypes.STRING,
            inviteStatus: DataTypes.STRING,
            emailVerified: DataTypes.BOOLEAN,
        },
        {}
    );
    User.associate = function(models) {
        // associations can be defined here
    };

    User.prototype.toJSON = function() {
        let values = Object.assign({}, this.get());

        delete values.password;
        return values;
    };
    
    return User;
};