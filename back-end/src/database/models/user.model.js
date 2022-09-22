module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
          },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.STRING
    }, {
        timestamps: false,
    });

    user.associate = (models) => {
        user.hasMany(models.sale,
            { foreignKey: 'userId', as: 'userSales' },
            { foreignKey: 'sellerId', as: 'sellerSales' });
    };

    return user;
};