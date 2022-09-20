const UserModel = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING
    });
  
    return User;
  };
  
  module.exports = UserModel;