'use strict';
export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      role: DataTypes.STRING,
      password: DataTypes.STRING,
      location: DataTypes.STRING,
      inviteStatus: DataTypes.STRING,
      emailVerified: DataTypes.BOOLEAN,
    },
    {
      timestamps: true,
    }
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
