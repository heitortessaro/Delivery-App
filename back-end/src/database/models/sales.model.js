module.exports = (sequelize, DataTypes) => {
    const sale = sequelize.define('sale', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
          },
        userId: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        },
        sellerId: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        },
        totalPrice: DataTypes.DECIMAL(9, 2),
        deliveryAddress: DataTypes.STRING,
        deliveryNumber: DataTypes.STRING,
        saleDate: DataTypes.DATE,
        status: DataTypes.STRING,
    }, {
        timestamps: false,
        tableName: 'sales',
        underscored: true,
      })

    sale.associate = (models) => {
        sale.belongsTo(models.user,
          { foreignKey: 'userId', as: 'users' },
          { foreignKey: 'sellerId', as: 'sellers' });
      };

    return sale;
};