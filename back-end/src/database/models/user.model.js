const UserModel = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.STRING
    });

    User.associate = (models) => {
        User.hasMany(models.sales,
            { foreignKey: 'userId', as: 'userSales' },
            { foreignKey: 'sellerId', as: 'sellerSales' });
    };

    return User;
};

module.exports = UserModel;