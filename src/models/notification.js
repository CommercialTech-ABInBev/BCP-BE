'use strict';
export default (sequelize, DataTypes) => {
    const Notification = sequelize.define(
        'Notifications', {
            fromId: DataTypes.INTEGER,
            stockId: DataTypes.INTEGER,
            fromName: DataTypes.STRING,
            subject: DataTypes.STRING,
            message: DataTypes.TEXT
        }, {
            timestamps: true,
        }
    );
    Notification.associate = function(models) {
        // associations can be defined here
    };
    return Notification;
};