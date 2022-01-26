'use strict';
export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'Users',
    {
      fullName: DataTypes.STRING,
      role: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      location: DataTypes.STRING,
      inviteStatus: DataTypes.STRING,
      emailVerified: DataTypes.BOOLEAN,
      brand: DataTypes.STRING,
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
